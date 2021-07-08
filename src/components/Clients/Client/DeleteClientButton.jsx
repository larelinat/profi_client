import React, {useContext, useState} from 'react';
import {useMutation} from "@apollo/client";
import {Button, Confirm, Icon} from "semantic-ui-react";
import {withRouter} from "react-router-dom";
import gql from "graphql-tag";

import {FETCH_CLIENTS_QUERY} from "../../../util/GraphQL/graphql";
import CustomPopup from "../../common/CustomPopup/CustomPopup";
import {PagesContext} from "../../../context/pages";

//TODO: починить удаление, обновить изменение кэша

const DeleteClientButton = (props) => {

    const {clientsPage, clientsLimit} = useContext(PagesContext);
    const [confirmOpen, setConfirmOpen] = useState(false);


    const [deleteClient] = useMutation(DELETE_CLIENT_MUTATION, {
        update(proxy) {
            setConfirmOpen(false);
            const data = proxy.readQuery({
                query: FETCH_CLIENTS_QUERY,
                variables: {
                    page: clientsPage,
                    limit: clientsLimit
                }
            });
            console.log(data);
            let newData = {
                ...data,
                getClients:{
                    ...data.getClients,
                    clients: data.getClients.clients.filter(c => c.id !== props.client_id)
                }
            }
            proxy.writeQuery({
                query: FETCH_CLIENTS_QUERY,
                data: newData,
                variables: {
                    page: clientsPage,
                    limit: clientsLimit
                }
            });
            props.history.goBack();

        },
        variables: {
            clientId: props.client_id
        }
    })


    /*const [deleteClient] = useMutation(DELETE_CLIENT_MUTATION, {
        update() {
            setConfirmOpen(false);
            //TODO: remove client from cache
        },
        variables: {
            clientId: props.client_id
        }
    })*/


    return (
        <>
            <CustomPopup content={"Удалить клиента"}>
                <Button as={"div"} color={"red"} style={{float: "right"}}
                        onClick={() => setConfirmOpen(true)}>
                    <Icon name={"trash"} style={{margin: 0}}/>
                </Button>
            </CustomPopup>


            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deleteClient}
                header={`Удалить ${props.name}?`}
                content={'Вы действительно хотите удалить этого клиента?'}
                cancelButton={'Нет'}
                confirmButton={'Да'}
            />
        </>
    );
};

const DELETE_CLIENT_MUTATION = gql`
    mutation deleteClient($clientId: ID!){
        deleteClient(clientId: $clientId)
    }
`


export default withRouter(DeleteClientButton);
