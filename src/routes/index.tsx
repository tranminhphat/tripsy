import NotFoundPage from "pages/404/404Page";
import AdminHomePage from "pages/admin/HomePage";
import AccountPage from "pages/client/account/AccountPage";
import InfoSettingPage from "pages/client/account/setting-options/information/InfoSettingPage";
import LoginAndSecuritySettingPage from "pages/client/account/setting-options/login-and-security/LoginAndSecuritySettingPage";
import ActivityListTab from "pages/client/activity/ActivityListTab";
import ForgotPasswordPage from "pages/client/auth/ForgotPasswordPage";
import LoginPage from "pages/client/auth/LoginPage";
import RegisterPage from "pages/client/auth/RegisterPage";
import ResetPasswordPage from "pages/client/auth/ResetPasswordPage";
import DashboardPage from "pages/client/dashboard/DashboardPage";
import BookingResponsePage from "pages/client/experience/Experience/BookingResponsePage";
import ConfirmBookingPage from "pages/client/experience/Experience/ConfirmBookingPage";
import ExperiencePage from "pages/client/experience/Experience/ExperiencePage";
import ActivityDetailPage from "pages/client/experience/ExperienceManagement/ExperienceActivationPage/ActivitiyDetailPage";
import ExperienceActivationPage from "pages/client/experience/ExperienceManagement/ExperienceActivationPage/ExperienceActivationPage";
import ExperienceCreationPage from "pages/client/experience/ExperienceManagement/ExperienceCreationPage/ExperienceCreationPage";
import ExperienceManagementPage from "pages/client/experience/ExperienceManagement/ExperienceManagementPage/ExperienceManagementPage";
import HistoryPage from "pages/client/history/HistoryPage";
import HomePage from "pages/client/home/HomePage";
import IntroductionPage from "pages/client/home/IntroductionPage";
import RecommendationPage from "pages/client/home/RecommendationPage";
import ProfilePage from "pages/client/profile/ProfilePage";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "./AuthRoute";

interface Entry {
  exact?: boolean;
  path: string;
  component?: React.FC<any>;
  authRoute?: boolean;
  adminRoute?: boolean;
}

const routes: Entry[] = [
  { exact: true, path: "/", component: IntroductionPage },
  { exact: true, path: "/recommendations", component: RecommendationPage },
  { exact: true, path: "/experiences", component: HomePage },
  { exact: true, path: "/login", component: LoginPage },
  { exact: true, path: "/register", component: RegisterPage },
  { exact: true, path: "/forgot-password", component: ForgotPasswordPage },
  { exact: true, path: "/reset-password/:token", component: ResetPasswordPage },
  {
    exact: true,
    path: "/user/profile/:id",
    component: ProfilePage,
    authRoute: true,
  },
  {
    exact: true,
    path: "/account-settings",
    component: AccountPage,
    authRoute: true,
  },
  {
    exact: true,
    path: "/account-settings/personal-info",
    component: InfoSettingPage,
    authRoute: true,
  },
  {
    exact: true,
    path: "/account-settings/login-and-security",
    component: LoginAndSecuritySettingPage,
    authRoute: true,
  },
  {
    exact: true,
    path: "/experience/:id",
    component: ExperiencePage,
    authRoute: true,
  },
  {
    exact: true,
    path: "/experience/:id/confirm-booking",
    component: ConfirmBookingPage,
    authRoute: true,
  },
  {
    exact: true,
    path: "/experience/:id/confirm-booking/response",
    component: BookingResponsePage,
    authRoute: true,
  },
  {
    exact: true,
    path: "/user/activities",
    component: ActivityListTab,
    authRoute: true,
  },
  {
    exact: true,
    path: "/user/experience-hosting",
    component: ExperienceManagementPage,
    authRoute: true,
  },
  {
    exact: true,
    path: "/user/experience-hosting/:id/activation",
    component: ExperienceActivationPage,
    authRoute: true,
  },
  {
    exact: true,
    path: "/user/experience-hosting/:id/activation/:activityId",
    component: ActivityDetailPage,
    authRoute: true,
  },
  {
    path: "/user/experience-hosting/:id",
    component: ExperienceCreationPage,
    authRoute: true,
  },
  {
    exact: true,
    path: "/user/dashboard",
    component: DashboardPage,
    authRoute: true,
  },
  {
    exact: true,
    path: "/user/history",
    component: HistoryPage,
    authRoute: true,
  },
  {
    exact: true,
    path: "/admin",
    component: AdminHomePage,
    authRoute: true,
    adminRoute: true,
  },
  {
    exact: true,
    path: "/admin/:subRoute",
    component: AdminHomePage,
    authRoute: true,
    adminRoute: true,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];

const AppRouter: React.FC = () => {
  return (
    <Switch>
      {routes.map((route) => {
        if (!route.authRoute) {
          return <Route key={route.path} exact={route.exact} {...route} />;
        } else {
          return (
            <AuthRoute
              component={route.component}
              adminRoute={route.adminRoute}
              key={route.path}
              exact={route.exact}
              {...route}
            />
          );
        }
      })}
    </Switch>
  );
};

export default AppRouter;
