import {ApiApi as Api, CreateTokenObtainPairRequest, CreateTokenRefreshRequest} from "../backend_api";
import {RequestOpts, Token} from "../backend_api";

const tokenPrefix = 'Token';
const localStorageAccessToken = 'token_access';
const localStorageRefreshToken = 'token_refresh';
const invalidTokenCode = 'token_not_valid';
const accessTokenType = 'access';

export class JwtApi extends Api {
    private updateAuthorization(token: Token) {
        localStorage.setItem(localStorageAccessToken, token.access);
        localStorage.setItem(localStorageRefreshToken, token.refresh);
    }

    async login(authentication: { username: string, password: string }) {
        return await this.createTokenObtainPair({tokenObtainPair: authentication});
    }

    logout() {
        localStorage.removeItem(localStorageAccessToken);
        localStorage.removeItem(localStorageRefreshToken);
    }

    async createTokenObtainPair(requestParameters: CreateTokenObtainPairRequest): Promise<Token> {
        const token = await super.createTokenObtainPair(requestParameters);
        this.updateAuthorization(token);
        return token;
    }

    async createTokenRefresh(requestParameters: CreateTokenRefreshRequest): Promise<Token> {
        const newToken = await super.createTokenRefresh(requestParameters);
        this.updateAuthorization(newToken);
        return newToken;
    }

    protected async request(context: RequestOpts): Promise<Response> {
        let usedStorageToken = false;
        const accessToken = localStorage.getItem(localStorageAccessToken);
        if (accessToken && !context.headers?.Authorization) {
            context.headers = {...context.headers, Authorization: `${tokenPrefix} ${accessToken}`}
            usedStorageToken = true;
        }
        try {
            return await super.request(context);
        } catch (e) {
            const refreshToken = localStorage.getItem(localStorageRefreshToken);
            if (usedStorageToken && refreshToken && e.status === 401) {
                try {
                    const responseData = await e.json();
                    if (responseData.code === invalidTokenCode
                    && responseData.messages ? responseData.messages[0].token_type === accessTokenType : false) {
                        const newToken = await this.createTokenRefresh({tokenRefresh: {refresh: refreshToken}});
                        context.headers.Authorization = `${tokenPrefix} ${newToken.access}`;
                        return await super.request(context);
                    }
                } catch {
                }
            }
            throw e;
        }
    }
}