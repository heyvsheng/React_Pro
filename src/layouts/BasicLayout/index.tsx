"use client";
import { useEffect } from "react";
import GlobalFooter from "@/components/GlobalFooter";
import "./index.css";
import { menus } from "../../../config/menu";
import {
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import type { ProSettings } from "@ant-design/pro-components";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, Input, theme } from "antd";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getFlatMenus } from "@umijs/route-utils";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";

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

//全局通用布局

export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();

  return (
    <div
      id="basicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        title="面试鸭"
        layout="top"
        logo={
          <Image
            src="/assets/logo.png"
            height={32}
            width={32}
            alt="面试鸭刷题网站"
          />
        }
        location={{
          pathname,
        }}
        avatarProps={
          {
            src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
            size: "small",
            name: "heyvsheng", // 1. 这里由 title 改为 name
            render: (props, dom) => {
              // 2. 补齐三个参数，哪怕第三个不用
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
                  }}
                >
                  {/* 3. 包裹一层 span，并确保 dom 被正确渲染 */}
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
          return menus;
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
