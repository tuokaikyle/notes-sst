import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { Auth } from 'aws-amplify';

type FieldType = {
  email: string;
  password: string;
  remember: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
  try {
    await Auth.signIn(values.email, values.password);
    alert('Logged in');
  } catch (error) {
    // Prints the full error
    console.error(error);
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert(String(error));
    }
  }
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = async (
  errorInfo
) => {
  alert(errorInfo);
};

const Login: React.FC = () => (
  <Form
    name='basic'
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete='off'
  >
    <Form.Item<FieldType>
      label='Email'
      name='email'
      rules={[
        {
          required: true,
          message: 'Please input your username!',
          type: 'email',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label='Password'
      name='password'
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item<FieldType>
      name='remember'
      valuePropName='checked'
      wrapperCol={{ offset: 8, span: 16 }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type='primary' htmlType='submit'>
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default Login;
