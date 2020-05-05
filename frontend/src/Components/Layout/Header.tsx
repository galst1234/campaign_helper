import React, {useContext} from "react";
import {Button, Layout, Menu} from "antd";
import {Link} from "react-router-dom";
import {UserContext} from "../../App";
import {JwtApi} from "../../ApiClient/ApiClient";
import {User} from "../../backend_api";
import {generateMainMenu} from "./Navigation";

const API = new JwtApi();

export function HeaderMenu(props: { showLoginModal: () => void, setUser: (user: User | undefined) => void }) {
    const userContext = useContext(UserContext);

    return (
        <Layout.Header>
            <div style={{width: "150px", float: "left"}}>
                <Link to="/">
                    <span>Campaign Helper</span>
                </Link>
            </div>
            {
                userContext ? null :
                    <div style={{float: "right"}}>
                        <Button type="link" ghost onClick={props.showLoginModal} key="login">Log in</Button>
                    </div>
            }
            <div style={{overflow: "hidden"}}>
                <Menu mode="horizontal" theme="dark">
                    {generateMainMenu()}
                    {
                        userContext ?
                            <Menu.SubMenu key="account" title={userContext.username} style={{float: "right"}}>
                                <Menu.Item
                                    onClick={() => {
                                        API.logout();
                                        props.setUser(undefined);
                                    }}
                                >
                                    Log out
                                </Menu.Item>
                            </Menu.SubMenu>
                            : null
                    }
                </Menu>
            </div>
        </Layout.Header>
    );
}