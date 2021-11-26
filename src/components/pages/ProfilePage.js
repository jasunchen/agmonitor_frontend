// ProfilePage.js
// Engineer: Alex Mei

import React from 'react';
import {withAuth0} from "@auth0/auth0-react";
import {Form, Input, Button} from "antd";

class ProfilePage extends React.Component {
  render() {
    const {user} = this.props.auth0;
    console.log(user)
    return (
      <div>
        <div className="container">
          <h1 className="text"> {user.nickname} </h1>
          <div className="form">
            <Form
              name="basic"
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              initialValues={{remember: true}}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                initialValue={user.nickname}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                initialValue={user.email}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
};

export default withAuth0(ProfilePage);