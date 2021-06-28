import React, {useContext} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {AuthContext} from "../context/auth";

function AccessRoute({component: Component, ...rest}) {
    const {user} = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                user && user.accessLevel === 1 ? <Component {...props} /> : <Redirect to={"/"}/>
            }
        />
    )
}

export default AccessRoute;
