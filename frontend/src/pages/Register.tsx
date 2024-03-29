import React from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND}/register`, values, {
        withCredentials: true,
      })
      .then((result) => {
        message.success("Registration Completed. Please Login");
        navigate("/login");
      })
      .catch((error: any) => {
        console.log(error);
        message.error(error.response.data.message);
      });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex justify-center items-center h-screen  mx-2 md:mx-2">
      <div className="flex flex-col justify-center items-center">
        <div className="w-full p-4 bg-white rounded-lg shadow-md border border-blue-200">
          <p className="text-center text-slate-700 mx-auto text-4xl font-bold drop-shadow-sm mt-8">
            Register
          </p>

          <Form
            name="form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className=" mt-16 px-6 md:px-20"
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                maxLength={50}
                className="rounded-full py-2 text-lg drop-shadow-sm"
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input
                maxLength={50}
                className="rounded-full py-2 text-lg drop-shadow-sm"
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              // label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                maxLength={50}
                className="rounded-full py-2 text-lg drop-shadow-sm"
                placeholder="Password here"
              />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-center">
                <Button
                  className=" bg-indigo-600 rounded-full drop-shadow-md my-2 hover:bg-slate-100"
                  type="primary"
                  htmlType="submit"
                  size="large"
                  shape="round"
                  block={true}
                  // style={{ height: "5vh", width: "50%" }}
                >
                  Register
                </Button>
              </div>
            </Form.Item>
          </Form>
          <Link to="/login">
            <p className=" text-right text-sm text-slate-700 cursor-pointer">
              Already Registered ? Login Here!
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
