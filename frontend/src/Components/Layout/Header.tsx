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
    const [visibleAuthModal, setVisibleAuthModal] = useState<AuthModals>(AuthModals.None);
    const userContext = useContext(UserContext);

    return (
        <>
            <Layout.Header>
                <div style={{width: "150px"}} className="left">
                    <Link to="/">
                        <span>Campaign Helper</span>
                    </Link>
                </div>
                {userContext ? null : <LoginRegisterSection setVisibleModal={setVisibleAuthModal}/>}
                <div style={{overflow: "hidden"}}>
                    <Menu mode="horizontal" theme="dark">
                        {generateMainMenu()}
                        {userContext ? generateAccountSubMenu(userContext, props.setUser) : null}
                    </Menu>
                </div>
            </Layout.Header>
            <LoginModal
                visibleAuthModal={visibleAuthModal}
                setVisibleAuthModal={setVisibleAuthModal}
                setUser={props.setUser}
            />
            <RegistrationModal
                visibleAuthModal={visibleAuthModal}
                setVisibleAuthModal={setVisibleAuthModal}
                setUser={props.setUser}
            />
        </>
    );
}