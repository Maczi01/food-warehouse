import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Navigate, Routes } from 'react-router';
import { Route } from 'react-router-dom';

import MainView from './features/Inventory/containers/flter-view.component.js';
import FilterView from './features/Inventory/containers/main-view.component';
import AddViewComponent from './features/Product/containers/add-view.component';
import EditViewComponent from './features/Product/containers/edit-view.component';
import SettingsViewComponent from './features/Settings/containers/settings-view.component';
import ShoppingListViewComponent from './features/ShoppingList/containers/shopping-list-view.component';
import LoginComponent from './features/auth/containers/login.component';
import RegisterComponent from './features/auth/containers/register.component';
import { DefaultLayout } from './layouts/default-layout';
import UnauthorizedLayout from './layouts/unauthorized-layout.component';
import { UserContext } from './shared/utils/auth';
import { routes } from './shared/utils/routes';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Navigate to={routes.login.path} />;
  }

  return <DefaultLayout>{children}</DefaultLayout>;
};

PrivateRoute.propTypes = {
  children: PropTypes.element,
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={routes.login.path}
        element={
          <UnauthorizedLayout>
            <LoginComponent />
          </UnauthorizedLayout>
        }
      />
      <Route
        path={routes.register.path}
        element={
          <UnauthorizedLayout>
            <RegisterComponent />
          </UnauthorizedLayout>
        }
      />
      <Route path={routes.home.path}>
        <Route
          exact
          path={routes.home.path}
          element={
            <PrivateRoute>
              <MainView />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.inventory.category.path}
          element={
            <PrivateRoute>
              <FilterView />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.inventory.list.path}
          element={
            <PrivateRoute>
              <ShoppingListViewComponent />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.product.add.path}
          element={
            <PrivateRoute>
              <AddViewComponent />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.product.edit.path}
          element={
            <PrivateRoute>
              <EditViewComponent />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.settings.path}
          element={
            <PrivateRoute>
              <SettingsViewComponent />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
