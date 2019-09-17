import { dynamicWrapper } from "react-router-guard";
const routes = [
  { path: "/forgot-password", component: dynamicWrapper(() => import("./pages/forgot-password/forgot-password")) },
  { path: "/reset-password/:code", component: dynamicWrapper(() => import("./pages/set-password/set-password")) },
  { path: "/verify-account/:code", component: dynamicWrapper(() => import("./pages/set-password/set-password")) },
  { path: "/dashboard", component: dynamicWrapper(() => import("./pages/ticket-bay/ticket-bay")) },
  { path: "/login", component: dynamicWrapper(() => import("./pages/login/login")) },
  {
    path: "/",
    component: dynamicWrapper(() => import("./pages/login/login")),
    routes: [{ path: "/tickets", exact: true, component: () => import("./pages/ticket-bay/ticket-bay") }]
  }
];

export default routes;
