import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 检查权限
 * @param loginUser  登陆用户
 * @param needAccess  需要具有的权限
 * @return boolean 有无权限
 */
const checkAccess = (
  loginUser: API.LoginUserVO,
  needAccess = ACCESS_ENUM.NOT_LOGIN,
) => {
  //获取当前用户具有的权限（如果没有登陆，默认没有权限）
  //加一个问号，为空也不会报错，只不过返回的权限是空
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;

  //如果当前不需要任何权限
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }

  //如果需要登录才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    //如果用户未登录，表示无权限
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }

  //如果需要管理员权限才能访问
  if (loginUserAccess === ACCESS_ENUM.ADMIN) {
    //必须要有有管理员权限，如果没有，表示无权限
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }

  return true;
};

export default checkAccess;
