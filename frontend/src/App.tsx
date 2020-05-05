import React, {useState} from 'react';
import {Layout} from 'antd';
import './App.css';
import {Router} from "react-router-dom";
import {createBrowserHistory} from "history";
import {SideMenu} from "./Components/Layout/Sider";
import {HeaderMenu} from "./Components/Layout/Header";
import {LoginModal} from "./Components/Auth/LoginModal";
import {User} from "./backend_api/models";
import {MainSwitch} from './Components/Layout/Navigation';

const history = createBrowserHistory();

export const CampaignContext = React.createContext(undefined);
export const UserContext = React.createContext<User | undefined>(undefined);

function App() {
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [user, setUser] = useState<User | undefined>(undefined);

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
