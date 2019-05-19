import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
    return <div>Loading...</div>;
}

const Dashboard = Loadable({
    loader: () => import('./views/Dashboard'),
    loading: Loading,
});

const Vendas = Loadable({
    loader: () => import('./views/Order/Order'),
    loading: Loading,
});

const GestaoDemandante = Loadable({
    loader: () => import('./views/DemandManagement/DemandManagement'),
    loading: Loading,
});


const Login = Loadable({
    loader: () => import('./views/Pages/Login/Login'),
    loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    {path: '/', exact: true, name: 'Home', component: DefaultLayout},
    {path: '/dashboard', name: 'Dashboard', component: Dashboard},
    {path: '/vendas', name: 'Vendas', component: Vendas},
    {path: '/gestaodemandante', name: 'Gestão do Demandante', component: GestaoDemandante},
    {path: '/login', name: 'Login', component: Login},
];

export default routes;
