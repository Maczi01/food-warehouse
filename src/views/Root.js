import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import FilterView from "./MainView";
import ShoppingListView from "./ShoppingListView";
import AddView from "./AddView";
import SettingsView from "./SettingsView";
import { routes } from "../routes/routes";
import LoginView from "./LoginView";
import { AuthProvider } from "../providers/Auth";
import PrivateRoute from "../routes/PrivateRoute";
import RegisterView from "./RegisterView";
import EditView from "./EditView";
import MainView from "./FilterView";
import { Switch } from "react-router";
import AppProvider from "../context/context";

const Root = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path={routes.home} component={MainView} />
            <PrivateRoute
              path={`${routes.filter}${routes.parameter}`}
              component={FilterView}
            />
            <PrivateRoute path={routes.list} component={ShoppingListView} />
            <PrivateRoute path={routes.add} component={AddView} />
            <PrivateRoute path={routes.edit} component={EditView} />
            <PrivateRoute path={routes.settings} component={SettingsView} />
            <Route path={routes.login} component={LoginView} />
            <Route path={routes.register} component={RegisterView} />
          </Switch>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
};

export default Root;
