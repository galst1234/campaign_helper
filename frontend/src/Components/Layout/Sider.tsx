import React, {ReactNode, useState} from "react";
import {CompassOutlined, FileTextOutlined, HomeOutlined, ReadOutlined, TeamOutlined} from "@ant-design/icons/lib";
import {Layout, Menu} from "antd";

export function SideMenu() {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const menuItems: { title: string, icon: ReactNode }[] = [
        {
            title: "Front Page",
            icon: <HomeOutlined/>,
        },
        {
            title: "Adventure Log",
            icon: <FileTextOutlined/>,
        },
        {
            title: "Quest Log",
            icon: <CompassOutlined/>,
        },
        {
            title: "Characters",
            icon: <TeamOutlined/>,
        },
        {
            title: "Wiki",
            icon: <ReadOutlined/>,
        },
    ];

    return (
        <Layout.Sider
            collapsible={true}
            collapsed={collapsed}
            onCollapse={setCollapsed}
        >
            <div style={{textAlign: "center"}}>
                <img src="/campaign_logo"/>
                {collapsed ? null : <h3 style={{display: "inline", marginLeft: "10px"}}>Campaign Name</h3>}
            </div>
            <Menu theme="dark">
                {menuItems.map(item => <Menu.Item icon={item.icon}>{item.title}</Menu.Item>)}
            </Menu>
        </Layout.Sider>
    );
}