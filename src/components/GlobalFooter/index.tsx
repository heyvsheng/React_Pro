import React from "react";
import {usePathname} from "next/navigation";
import './index.css'

//全局底部栏组件
export default function GlobalFooter() {
    const currentYear=new Date().getFullYear();
    return (
        <div
            className="global_footer"

        >
            <div>© {currentYear} 面试刷题平台</div>
            <div>heyvsheng</div>
        </div>
    );
}