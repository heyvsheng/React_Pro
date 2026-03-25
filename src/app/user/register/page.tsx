"use client"; // 必须放在最顶部

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { userRegisterUsingPost } from "@/api/userController";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";

import { ProForm } from "@ant-design/pro-form/lib";
import { useRouter } from "next/navigation";

type RegisterType = "phone" | "account";

/**
 * 用户注册页面
 * @constructor
 */
const UserRegisterPage: React.FC = () => {
  const [form] = ProForm.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const doSubmit = async (values: API.UserRegisterRequest) => {
    try {
      const res = await userRegisterUsingPost(values);
      if (res.data) {
        message.success("注册成功，请登录");

        router.replace("/user/login");

        form.resetFields();
      }
    } catch (e) {
      message.error("注册失败" + e.message);
    }
  };
  return (
    <div id="userRegisterPage">
      <LoginForm
        form={form}
        logo={
          <Image src="/assets/logo.png" alt="面试鼠" height={44} width={44} />
        }
        title="面试鼠——用户注册"
        subTitle="程序员面试刷题网站"
        submitter={{
          searchConfig: {
            submitText: "注册",
          },
        }}
        onFinish={doSubmit}
      >
        <ProFormText
          name="userAccount"
          fieldProps={{
            size: "large",
            prefix: <UserOutlined />,
          }}
          placeholder={"请输入用户账号"}
          rules={[
            {
              required: true,
              message: "请输入用户账号!",
            },
          ]}
        />
        <ProFormText.Password
          name="userPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder={"请输入密码"}
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
        />
        <ProFormText.Password
          name="checkPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder={"请再次输入相同的密码"}
          rules={[
            {
              required: true,
              message: "请再次输入相同的密码！",
            },
          ]}
        />

        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <a
            style={{
              float: "right",
            }}
          >
            已有账号？
            <Link href={"/user/loginr"}>去登录</Link>
          </a>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserRegisterPage;
