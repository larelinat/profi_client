import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import {Container} from 'semantic-ui-react'

import {AuthProvider} from "./context/auth";
import AuthRoute from "./util/AuthRoute";

import MenuBar from "./components/common/MenuBar/MenuBar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AccessRoute from "./util/AccessRoute";
import Clients from "./components/Clients/Clients";
import Client from "./components/Clients/Client/Client";
import AddClient from "./components/Clients/AddClient/AddClient";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Container>
                    <MenuBar/>
                    <Route exact path={'/'} component={Home}/>
                    <AuthRoute exact path={'/login'} component={Login}/>
                    <AuthRoute exact path={'/register'} component={Register}/>
                    <AccessRoute exact path={'/clients'} component={Clients}/>
                    <AccessRoute exact path={'/clients/:clientId'} component={Client}/>
                    <AccessRoute exact path={'/clients/add'} component={AddClient}/>
                </Container>
            </Router>
        </AuthProvider>
    );
}

export default App;
