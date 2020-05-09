import {useForm} from "antd/lib/form/Form";
import {Button, Form, Input, Modal, notification} from "antd";
import React, {Dispatch, SetStateAction} from "react";
import {User} from "../../../backend_api"
import {JwtApi} from "../../../ApiClient/ApiClient";
import {AuthModals} from "./index";

const API = new JwtApi();

export function LoginModal(props: { visibleAuthModal: AuthModals, setVisibleAuthModal: Dispatch<SetStateAction<AuthModals>>, setUser: (user: User | undefined) => void }) {
    const [form] = useForm();

    return (
        <Modal
            title="Log in"
            visible={props.visibleAuthModal === AuthModals.Login}
            onCancel={() => {
                props.setVisibleAuthModal(AuthModals.None);
            }}
            footer={
                <>
                    New here?&nbsp;
                    <Button
                        type="link"
                        className="no-padding"
                        onClick={() => {
                            props.setVisibleAuthModal(AuthModals.Register);
                        }}
                    >
                        Register
                    </Button>
                </>
            }
        >
            <Form
                form={form}
                labelCol={{span: 5}}
                onFinish={async function (values) {
                    try {
                        await API.login(values as { username: string, password: string })
                        const userData = await API.myInfoUser();
                        props.setUser(userData);
                        props.setVisibleAuthModal(AuthModals.None);
                        form.resetFields();
                    } catch (e) {
                        console.error(e);
                        notification.error({message: "Error", description: "Login failed"});
                    }
                }}
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{required: true, message: 'Username is required'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Password is required'}]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item className="no-margin">
                    <Button type="primary" htmlType="submit" className="right">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}