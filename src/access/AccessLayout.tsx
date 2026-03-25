"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@/app/globals.css";
import BasicLayout from "@/layouts/BasicLayout";
import React, { useCallback, useEffect } from "react";
import store, { AppDispatch, RootState } from "@/stores";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getLoginUserUsingGet } from "@/api/userController";
import { usePathname } from "next/navigation";
import { findAllMenuByPath } from "../../config/menu";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import Forbidden from "@/app/forbidden";

//统一权限校验拦截器
const AccessLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const pathname = usePathname();
  //当前登录用户
  const loginUser = useSelector((state: RootState) => state.loginUser);
  //获取当前路径需要的权限
  const menu = findAllMenuByPath(pathname);
  const needAccess = menu?.access ?? ACCESS_ENUM.NOT_LOGIN;

  const canAccess = checkAccess(loginUser, needAccess);
  if (!canAccess) {
    return <Forbidden />;
  }
  return children;
};

export default AccessLayout;
