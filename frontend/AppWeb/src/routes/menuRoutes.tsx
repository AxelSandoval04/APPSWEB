/// <reference types="react" />
import Dashboard from "../modules/dashboard/dashboard";
import OrderData from "../modules/order/OrderData";
import ProductData from "../modules/product/ProductData";
import UserForm from "../modules/user/userform";

export interface AppRoute {
  path: string;
  element: JSX.Element;
  label: string;
  icon: string;
  roleIds?: string[];
  hidden?: boolean;
}

// Centraliza tus rutas aquí
const routes: AppRoute[] = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    label: "Dashboard",
    icon: "HomeOutlined",
  },
  {
    path: "/users",
    element: <UserForm />,
    label: "Usuarios",
    icon: "UserOutlined",
  },
  {
    path: "/products",
    element: <ProductData />,
    label: "Productos",
    icon: "AppstoreOutlined",
  },
  {
    path: "/orders",
    element: <OrderData />,
    label: "Órdenes",
    icon: "ShoppingCartOutlined",
  },
  {
    path: "/report",
    element: <div>Reportes</div>,
    label: "Reportes",
    icon: "BarChartOutlined",
  },
];

export default routes;