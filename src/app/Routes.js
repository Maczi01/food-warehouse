import React, {useContext} from "react";
import { Redirect, Route} from "react-router-dom";
import { Switch } from "react-router";

import FilterView from "./features/Inventory/containers/main-view.component";
import ShoppingListViewComponent from "./features/ShoppingList/containers/shopping-list-view.component";
import AddViewComponent from "./features/Product/containers/add-view.component";
import SettingsViewComponent from "./features/Settings/containers/settings-view.component";
import LoginComponent from "./features/auth/containers/login.component";
import {UserContext} from "./shared/utills/Auth";
import RegisterComponent from "./features/auth/containers/register.component";
import EditViewComponent from "./features/Product/containers/edit-view.component";
import MainView from "./features/Inventory/containers/flter-view.component.js";
import UnauthorizedLayout from './layouts/UnauthorizedLayout';
import {DefaultLayout} from './layouts/default-layout';

export const routes = {
    home: "/",
    list: "/list",
    add: "/add",
    edit: "/edit/:id",
    settings: "/settings",
    login: "/login",
    register: "/register",
    filter: "/filter/",
    parameter: ":parameter",
};

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useContext(UserContext);
    return (
        <Route
            {...rest}
            render={(routeProps) =>
                currentUser ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to={"/login"} />
                )
            }
        />
    );
};

const AuthorisedRoutes = () => {
  return (
      <DefaultLayout>
        <Switch>
          <PrivateRoute exact path={routes.home} component={MainView} />
          <PrivateRoute
              path={`${routes.filter}${routes.parameter}`}
              component={FilterView}
          />
          <PrivateRoute path={routes.list} component={ShoppingListViewComponent} />
          <PrivateRoute path={routes.add} component={AddViewComponent} />
          <PrivateRoute path={routes.edit} component={EditViewComponent} />
          <PrivateRoute path={routes.settings} component={SettingsViewComponent} />
        </Switch>
      </DefaultLayout>

  )
}

const UnauthorizedRoutes = () => {
  return (
      <UnauthorizedLayout>
        <Switch>
          <Route path={routes.login} component={LoginComponent} />
          <Route path={routes.register} component={RegisterComponent} />
        </Switch>
      </UnauthorizedLayout>
  )
}

const Routes = () => {
  return (
          <Switch>
            <Route path={[routes.register, routes.login]} component={UnauthorizedRoutes} />
            <Route path={"*"} component={AuthorisedRoutes} />
          </Switch>
  );
};


export default Routes;