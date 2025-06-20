import React from "react";
import { DashboardOutlined, UserOutlined, BarChartOutlined } from "@ant-design/icons";

// Aquí va tu fakeMenuData, fuera del componente
const fakeMenuData = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: "DashboardOutlined",
        roles: ["665a1f2b40fd3a12b3e77611"]
    },
    {
        title: "Usuarios",
        path: "/users",
        icon: "UserOutlined",
        roles: ["665a1f2b40fd3a12b3e77612"]
    },
    {
        title: "Reportes",
        path: "/reports",
        icon: "BarChartOutlined",
        roles: ["665a1f2b40fd3a12b3e77611", "665a1f2b40fd3a12b3e77612"]
    }
];

const Icons = {
    DashboardOutlined,
    UserOutlined,
    BarChartOutlined,
};

function MenuDynamic() {
    const renderMenu = () => {
        return fakeMenuData.map((item) => {
            const IconComponent = Icons[item.icon as keyof typeof Icons];
            return (
                <li key={item.path}>
                    {IconComponent ? <IconComponent /> : null} {item.title}
                </li>
            );
        });
    };

    return (
        <div>
            <ul>
                {renderMenu()}
            </ul>
        </div>
    );
}

export default MenuDynamic;