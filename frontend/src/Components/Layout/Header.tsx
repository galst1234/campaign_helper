import React, {useContext} from "react";
import {Button, Layout, Menu} from "antd";
import {Link} from "react-router-dom";
import {UserContext} from "../../App";

// TODO: Make menu from list of objects, prettify

export function HeaderMenu(props: { showLoginModal: () => void }) {
    const userContext = useContext(UserContext);

    return (
        <Layout.Header>
            <div style={{width: "150px", float: "left"}}>
                <Link to="/">
                    <span>Campaign Helper</span>
                </Link>
            </div>
            {userContext ? null :
                <div style={{float: "right"}}>
                    <Button type="link" ghost onClick={props.showLoginModal} key="login">Log in</Button>
                </div>}
            <div style={{overflow: "hidden"}}>
                <Menu mode="horizontal" theme="dark">
                    <Menu.Item key="a">
                        <Link to="/a">a</Link>
                    </Menu.Item>
                    <Menu.Item key="b">
                        <Link to="/b">b</Link>
                    </Menu.Item>
                    {userContext ?
                        <Menu.SubMenu key="account" title={userContext.username} style={{float: "right"}}>
                            <Menu.Item>yay</Menu.Item>
                        </Menu.SubMenu> : null}
                </Menu>
            </div>
        </Layout.Header>
    );
}