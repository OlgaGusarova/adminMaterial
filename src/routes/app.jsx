import DashboardPage from "../views/Dashboard/Dashboard.jsx";
import Content from "../views/Content/ContentTable";

import {
  Dashboard,
  ChromeReaderMode
} from "material-ui-icons";

const appRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/content/admin",
    sidebarName: "Контент",
    navbarName: "Контент",
    icon: ChromeReaderMode,
    component: Content
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default appRoutes;
