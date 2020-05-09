import {useForm} from "antd/lib/form/Form";
import {Button, Form, Input, Modal, notification} from "antd";
import React, {Dispatch, SetStateAction} from "react";
import {User} from "../../../backend_api"
import {JwtApi} from "../../../ApiClient/ApiClient";
import {AuthModals} from "./index";

const API = new JwtApi();

export function RegistrationModal(props: { visibleAuthModal: AuthModals, setVisibleAuthModal: Dispatch<SetStateAction<AuthModals>>, setUser: (user: User | undefined) => void }) {
    const [form] = useForm();

    return (
        <Modal
            title="Register"
            visible={props.visibleAuthModal === AuthModals.Register}
            onCancel={() => {
                props.setVisibleAuthModal(AuthModals.None);
            }}
            footer={
                <>
                    Already have an account?&nbsp;
                    <Button
                        type="link"
                        className="no-padding"
                        onClick={() => {
                            props.setVisibleAuthModal(AuthModals.Login);
                        }}
                    >
                        Log in
                    </Button>
                </>
            }
        >
            <Form
                form={form}
                labelCol={{span: 7}}
                onFinish={async function (values) {
                    try {
                        const userData = await API.createUser({user: values as User})
                        props.setUser(userData);
                        await API.login(values as { username: string, password: string });
                        notification.success({
                            message: 'User Created!',
                            description: `Successfully created user ${userData.username}`
                        });
                        props.setVisibleAuthModal(AuthModals.None);
                        form.resetFields();
                    } catch (e) {
                        console.error(e);
                        notification.error({message: 'Error', description: 'Failed to create user'});
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
                    hasFeedback
                    rules={[{required: true, message: 'Password is required'}]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {required: true, message: 'Password confirmation is required'},
                        ({getFieldValue}) => ({
                            validator(rule, value) {
                                if (getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject("Passwords don't match");
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    hasFeedback
                    rules={[
                        {required: true, message: 'Email is required'},
                        {type: 'email', message: 'Not a valid email address'},
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item className="no-margin">
                    <Button type="primary" htmlType="submit" className="right">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}