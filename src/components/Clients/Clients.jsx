import React, /*{useContext}*/ from 'react';
import {useQuery} from "@apollo/client";
import {Grid, Transition} from "semantic-ui-react";
import ClientCard from "../common/ClientCard/ClientCard";

import {FETCH_CLIENTS_QUERY} from "../../util/graphql";
/*import {AuthContext} from "../../context/auth";*/
import {Link} from "react-router-dom";

const Clients = () => {
    /*const {user} = useContext(AuthContext);*/


    const {loading, data: {getClients: clients} = {}} = useQuery(FETCH_CLIENTS_QUERY);

    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Клиенты</h1>
                <Link to={"/clients/add"}>Добавить клиента</Link>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h3>Loading clients...</h3>
                ) : (
                    <Transition.Group duration={200}>
                        {clients && clients.map(c => (
                            <Grid.Column key={c.id} style={{marginBottom: 20}}>
                                <ClientCard client={c}/>
                            </Grid.Column>
                        ))}
                    </Transition.Group>
                )}
            </Grid.Row>

        </Grid>
    );
};


export default Clients;
