import React, {useContext, useState} from "react";
import {Layout, Menu} from "antd";
import {Link} from "react-router-dom";
import {UserContext} from "../../App";
import {User} from "../../backend_api";
import {generateMainMenu} from "./Navigation";
import {LoginModal, RegistrationModal, AuthModals} from "../Auth/Modals";
import generateAccountSubMenu from "../Auth/AccountSubMenu";
import LoginRegisterSection from "../Auth/LoginRegisterSection";

export function HeaderMenu(props: { setUser: (user: User | undefined) => void }) {
    const [visibleModal, setVisibleModal] = useState<AuthModals>(AuthModals.None);
    const userContext = useContext(UserContext);

    return (
        <>
            <Layout.Header>
                <div style={{width: "150px", float: "left"}}>
                    <Link to="/">
                        <span>Campaign Helper</span>
                    </Link>
                </div>
                {userContext ? null : <LoginRegisterSection setVisibleModal={setVisibleModal}/>}
                <div style={{overflow: "hidden"}}>
                    <Menu mode="horizontal" theme="dark">
                        {generateMainMenu()}
                        {userContext ? generateAccountSubMenu(userContext, props.setUser) : null}
                    </Menu>
                </div>
            </Layout.Header>
            <LoginModal
                visible={visibleModal === AuthModals.Login}
                onExit={() => {
                    setVisibleModal(AuthModals.None)
                }}
                setUser={props.setUser}
            />
            <RegistrationModal
                visible={visibleModal === AuthModals.Register}
                onExit={() => {
                    setVisibleModal(AuthModals.None)
                }}
                setUser={props.setUser}
            />
        </>
    );
}