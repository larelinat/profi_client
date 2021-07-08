import React from 'react';
import App from "./App";
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, split} from '@apollo/client';
import {WebSocketLink} from '@apollo/client/link/ws';
import {setContext} from "apollo-link-context";
import {getMainDefinition} from "@apollo/client/utilities";


const httpLink = new createHttpLink({
    uri: 'https://floating-meadow-14878.herokuapp.com/'
})

const wsLink = new WebSocketLink({
    uri: 'ws://floating-meadow-14878.herokuapp.com/subscriptions',
    options: {
        lazy: true,
        reconnect: true,
        connectionParams: () => {
            const token = localStorage.getItem('jwtToken');
            return {
                Authorization: token ? `Bearer ${token}` : "",
            }

        },
    }
});


/*const httpLink = new createHttpLink({
    uri: 'http://127.0.0.1:5000/'
});


const wsLink = new WebSocketLink({
    uri: 'ws://127.0.0.1:5000/subscriptions',
    options: {
        lazy: true,
        reconnect: true,
        connectionParams: () => {
            const token = localStorage.getItem('jwtToken');
            return {
                Authorization: token ? `Bearer ${token}` : "",
            }

        },
    }
});*/

const splitLink = split(
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);


const authLink = setContext(async () => {
    let token = localStorage.getItem('jwtToken');
    /* const { exp } = jwtDecode(token);
     const expirationTime = (exp * 1000) - 60000;
     if (Date.now() >= expirationTime) {
         token = await refreshToken()
         // set LocalStorage here based on response;
     }*/
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})


/*const logoutLink = onError(({ graphQLErrors, networkError }) => {

    if(graphQLErrors) {
        if(graphQLErrors[0].extensions.code === "UNAUTHENTICATED") {
            localStorage.removeItem("jwtToken");
        }
    }
    /!*if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);*!/
});*/


const client = new ApolloClient({
    link: authLink.concat(splitLink),
    cache: new InMemoryCache()
});


export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)
