import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import {Container, Grid} from 'semantic-ui-react'

import {AuthProvider} from "./context/auth";
import {PagesProvider} from "./context/pages";
import AuthRoute from "./util/AuthRoute";

import MenuBar from "./components/common/MenuBar/MenuBar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AccessRoute from "./util/AccessRoute";
import Clients from "./components/Clients/Clients";
import Client from "./components/Clients/Client/Client";
import AddClient from "./components/Clients/AddClient/AddClient";
import Navigation from "./components/Navigation/Navigation";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Container>
                    <MenuBar/>
                    <AuthRoute exact path={'/login'} component={Login}/>
                    <AuthRoute exact path={'/register'} component={Register}/>
                    <Grid columns={2}>
                        <Grid.Column width={4}>
                            <Navigation/>

                        </Grid.Column>
                        <Grid.Column width={12}>
                            <PagesProvider>
                                <Route exact path={'/'} component={Home}/>

                                <AccessRoute exact path={'/clients'} component={Clients}/>
                                <AccessRoute exact path={'/client/:clientId'} component={Client}/>
                                <AccessRoute exact path={'/clients/add'} component={AddClient}/>
                            </PagesProvider>
                        </Grid.Column>
                    </Grid>
                </Container>
            </Router>
        </AuthProvider>
    );
}

export default App;
