import {Button} from "antd";
import React from "react";
import {AuthModals} from "./AuthModals";

export default function LoginRegisterSection(props: { setVisibleModal: React.Dispatch<React.SetStateAction<AuthModals>> }) {
    return (
        <div style={{float: "right"}}>
            <Button
                type="link"
                ghost
                onClick={() => {
                    props.setVisibleModal(AuthModals.Login);
                }}
                key="login"
            >
                Log in
            </Button>
        </div>
    );
}