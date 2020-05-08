import React, {useEffect, useState} from 'react';
import {Layout} from 'antd';
import './App.css';
import {Router} from "react-router-dom";
import {createBrowserHistory} from "history";
import {SideMenu} from "./Components/Layout/Sider";
import {HeaderMenu} from "./Components/Layout/Header";
import {LoginModal} from "./Components/Auth/LoginModal";
import {User} from "./backend_api/models";
import {MainSwitch} from './Components/Layout/Navigation';
import {JwtApi, localStorageAccessToken, localStorageRefreshToken} from "./ApiClient/ApiClient";


const history = createBrowserHistory();

export const CampaignContext = React.createContext(undefined);
export const UserContext = React.createContext<User | undefined>(undefined);

function App() {
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [user, setUser] = useState<User | undefined>(undefined);
    const API = new JwtApi();

    /**
     * On load, check if there is a saved token and try to get the logged-in user using it.
     * On fail clear the saved data.
     */
    useEffect(() => {
        const accessToken = localStorage.getItem(localStorageAccessToken);
        if (accessToken) {
            API.myInfoUser().then(userData => {
                setUser(userData);
            }, () => {
                localStorage.removeItem(localStorageAccessToken);
                localStorage.removeItem(localStorageRefreshToken);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <UserContext.Provider value={user}>
            <Router history={history}>
                <Layout style={{minHeight: '100vh'}}>
                    <HeaderMenu
                        showLoginModal={() => {
                            setShowLoginModal(true)
                        }}
                        setUser={setUser}
                    />
                    <Layout>
                        <SideMenu/>
                        <Layout.Content style={{padding: "25px 50px"}}>
                            <MainSwitch/>
                        </Layout.Content>
                    </Layout>
                </Layout>
            </Router>
            <LoginModal
                visible={showLoginModal}
                onExit={() => {
                    setShowLoginModal(false)
                }}
                setUser={setUser}
            />
        </UserContext.Provider>
    );
}

export default App;
