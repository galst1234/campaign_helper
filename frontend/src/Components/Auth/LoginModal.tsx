import {useForm} from "antd/lib/form/Form";
import {Button, Form, Input, Modal, notification} from "antd";
import React from "react";
import {User} from "../../backend_api"
import {JwtApi} from "../../ApiClient/ApiClient";

const API = new JwtApi();

export function LoginModal(props: { visible: boolean, onExit: () => void, setUser: (user: User | undefined) => void }) {
    const [form] = useForm();

    return (
        <Modal
            title="Log in"
            visible={props.visible}
            onCancel={props.onExit}
            footer={null}
        >
            <Form
                form={form}
                labelCol={{span: 5}}
                onFinish={async function (values) {
                    try {
                        await API.login(values as {username: string, password: string})
                        const userData = await API.myInfoUser();
                        props.setUser(userData);
                        props.onExit();
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
                    rules={[{required: true}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true}]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item style={{margin: 0}}>
                    <Button type="primary" htmlType="submit" style={{float: "right"}}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}