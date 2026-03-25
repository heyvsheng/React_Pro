"use client";
import React, { useState } from "react";
import GlobalFooter from "@/components/GlobalFooter";
import "./index.css";
import { menus } from "../../../config/menu";
import {
  GithubFilled,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, Input, message, theme } from "antd";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import getAccessibleMenus from "@/access/menuAccess";
import { userLoginUsingPost, userLogoutUsingPost } from "@/api/userController";
import { setLoginUser } from "@/stores/LoginUser";
import { router } from "next/client";
import { DEFAULT_USER } from "@/constants/user";

/**
 * 导航栏
 * @constructor
 */
// 搜索条单独抽出来了
const SearchInput = () => {
  const { token } = theme.useToken();
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
        }}
        prefix={<SearchOutlined />}
        placeholder="搜索题目"
        variant="borderless"
      />
    </div>
  );
};

interface Props {
  children: React.ReactNode;
}

/**
 * 全局通用布局  导航栏下面的页面都在这里
 * @param children
 * @constructor
 */

export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();

  const loginUser = useSelector((state: RootState) => state.loginUser);

  const dispatch = useDispatch<AppDispatch>();

  const [text, setText] = useState<string>(); //默认空字符串
  const router = useRouter();

  /**
   * 退出登录  把登录态取消掉就好了
   */
  const userLogout = async () => {
    try {
      await userLogoutUsingPost();
      message.success("已退出登录");
      dispatch(setLoginUser(DEFAULT_USER));
      router.push("/user/login");
    } catch (e) {
      message.error("操作失败" + e.message);
    }
  };

  return (
    <div
      id="basicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        title="面试鼠"
        layout="top"
        logo={
          <Image
            src="/assets/logo.png"
            height={32}
            width={32}
            alt="面试鼠刷题网站"
          />
        }
        location={{
          pathname,
        }}
        avatarProps={
          {
            src: loginUser.userAvatar || "/assets/logo.png",
            size: "small",
            title: loginUser.userName || "heyvsheng",
            render: (props, dom) => {
              if (!loginUser.id) {
                return;
                <div
                  onClick={() => {
                    router.push("/user/login");
                  }}
                >
                  {dom}
                </div>;
              }
              return (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "logout",
                        icon: <LogoutOutlined />,
                        label: "退出登录",
                      },
                    ],
                    onClick: async (event: { key: React.Key }) => {
                      const { key } = event;
                      if (key === "logout") {
                        userLogout();
                      }
                    },
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    {dom}
                  </span>
                </Dropdown>
              );
            },
          } as any //强制断言为any绕过检查
        }
        actionsRender={(props) => {
          if (props.isMobile) return [];

          return [
            <SearchInput key="search" />,
            <a href="https://githubcom/heyvsheng" target="_blank" key="github">
              <GithubFilled key="GithubFilled" />
            </a>,
          ];
        }}
        headerTitleRender={(logo, title, _) => {
          return (
            <a>
              {logo}
              {title}
            </a>
          );
        }}
        //底部栏布局
        footerRender={() => {
          return <GlobalFooter />;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        // 定义有哪些菜单
        menuDataRender={() => {
          return getAccessibleMenus(loginUser, menus);
        }}
        //定义了菜单项如何渲染
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
      >
        {children}
      </ProLayout>
    </div>
  );
}
