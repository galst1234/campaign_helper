import React, {ReactNode} from "react";
import {Menu} from "antd";
import {Link, Route, Switch} from "react-router-dom";

interface Page {
    title: string,
    link: string,
    exact?: boolean,
    component?: React.ComponentType,
    content?: ReactNode
}

const mainPages: Page[] = [
    {title: 'A', link: '/a', content: 'a'},
    {title: 'B', link: '/b', content: 'b'},
];

export function generateMainMenu() {
    return mainPages.map(page => <Menu.Item key={page.title}><Link to={page.link}>{page.title}</Link></Menu.Item>);
}

export function MainSwitch() {
    return (
        <Switch>
            {mainPages.map(page =>
                <Route
                    key={page.title}
                    path={page.link}
                    exact={page.exact}
                    component={page.component}
                >
                    {page.content}
                </Route>
            )}
        </Switch>
    );
}