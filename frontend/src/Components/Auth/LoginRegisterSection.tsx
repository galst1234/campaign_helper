import {Button} from "antd";
import React from "react";
import {AuthModals} from "./Modals";

export default function LoginRegisterSection(props: { setVisibleModal: React.Dispatch<React.SetStateAction<AuthModals>> }) {
    return (
        <div className="right">
            <Button
                type="link"
                ghost
                className="no-padding"
                onClick={() => {
                    props.setVisibleModal(AuthModals.Login);
                }}
            >
                Log in
            </Button>
            &nbsp;/&nbsp;
            <Button
                type="link"
                ghost
                className="no-padding"
                onClick={() => {
                    props.setVisibleModal(AuthModals.Register);
                }}
            >
                Register
            </Button>
        </div>
    );
}