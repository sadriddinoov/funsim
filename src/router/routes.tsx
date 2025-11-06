import { lazy } from "react";
import { APP_ROUTES } from "./path";

const Home = lazy(() => import("../pages/Home/Home"));
const CountryPage = lazy(() => import("../pages/Country/Country"));
const Confirm = lazy(() => import("../pages/OrderConfirm/Confirm"))
const MyEsim = lazy(() => import("../pages/Sim/MyEsim"))
const Profile = lazy(() => import('../pages/Profile/Profile'))
const SimReady = lazy(() => import("../pages/Sim/SimReady"))
const Confidential = lazy(() => import("../app/[locale]/confidential/page"))
const Offerta = lazy(() => import("../app/[locale]/offerta/page"))

export const appRoutes = [
  { path: APP_ROUTES.HOME, element: <Home /> },
  { path: APP_ROUTES.COUNTRY, element: <CountryPage /> },
  { path: APP_ROUTES.CONFIRM_ORDER, element: <Confirm/> },
  { path: APP_ROUTES.MY_SIMS, element:  <MyEsim/>},
  { path: APP_ROUTES.PROFILE, element: <Profile/>},
  { path: APP_ROUTES.SIM_IS_READY, element:  <SimReady/>},
  { path: APP_ROUTES.CONFIDENTIAL, element: <Confidential/>},
  { path: APP_ROUTES.OFFER, element: <Offerta/>}
];
