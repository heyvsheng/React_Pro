import { menus } from "../../config/menu";
import checkAccess from "@/access/checkAccess";
import { MenuDataItem } from "@ant-design/pro-layout";

/**
 * 获取有权限，可访问的菜单
 * @param loginUser
 * @param menuItems
 */
const getAccessibleMenus = (loginUser: API.LoginUserVO, menuItems = menus) => {
  return menuItems.filter((item: MenuDataItem) => {
    if (!checkAccess(loginUser, item.access)) {
      return false;
    }
    if (item.children) {
      item.children = getAccessibleMenus(loginUser, item.children);
    }
    return true;
  });
};

export default getAccessibleMenus;
