import {Menu} from "antd";
import React from "react";
import {User} from "../../backend_api";
import {JwtApi} from "../../ApiClient/ApiClient";

export default function generateAccountSubMenu(user: User, setUser: (user: User | undefined) => void) {
    const API = new JwtApi();

    return (
        <Menu.SubMenu key="account" title={user.username} style={{float: "right"}}>
            <Menu.Item
                onClick={() => {
                    API.logout();
                    setUser(undefined);
                }}
            >
                Log out
            </Menu.Item>
        </Menu.SubMenu>
    );
}