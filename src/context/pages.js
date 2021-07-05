import React, {createContext, useReducer} from 'react';

const initialState = {
    clientsPage: 1,
    clientsLimit: 10,
}

const PagesContext = createContext({
    clientsPage: 1,
    clientsLimit: 10,
    setPage: (pageNumber, component) => {
    },
    setLimit: (limit, component) => {
    },
});


function authReducer(state, action) {
    switch (action.type) {
        case 'SET_CLIENTS_PAGE':
            return {
                ...state,
                clientsPage: action.page
            }
        case 'SET_CLIENTS_LIMIT':
            return {
                ...state,
                clientsLimit: action.limit
            }
        default:
            return state;
    }
}


function PagesProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    function setPage(pageNumber, component) {
        switch (component) {
            case 'clients':
                dispatch({
                    type: 'SET_CLIENTS_PAGE',
                    page: pageNumber
                });
                break;
            default:
                break;
        }
    }

    function setLimit(limit, component) {
        switch (component) {
            case 'clients':
                dispatch({
                    type: 'SET_CLIENTS_LIMIT',
                    limit
                });
                break;
            default:
                break;
        }

    }

    return (
        <PagesContext.Provider
            value={{
                clientsPage: state.clientsPage,
                clientsLimit: state.clientsLimit,
                setPage, setLimit
            }}
            {...props}
        />
    )
}

export {PagesContext, PagesProvider};
