export const routes = {
  home: {
    path: '/',
  },
  product: {
    add: {
      path: '/product/add',
    },
    edit: {
      path: '/product/edit/:id',
      url: (id) => '/product/edit/:id'.replace(':id', id),
    },
  },
  inventory: {
    list: {
      path: '/list',
    },
    category: {
      path: '/category/:parameter',
      url: (param) => '/category/:parameter'.replace(':parameter', param),
    },
  },
  settings: {
    path: '/settings',
  },
  login: {
    path: '/login',
  },
  register: {
    path: '/register',
  },
};
