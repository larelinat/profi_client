import React, /*{useContext}*/ from 'react';
import {useQuery} from "@apollo/client";
import {Grid, Transition} from "semantic-ui-react";
import ClientCard from "../common/ClientCard/ClientCard";

import {FETCH_CLIENTS_QUERY} from "../../util/graphql";
/*import {AuthContext} from "../../context/auth";*/

const Home = () => {
    /*const {user} = useContext(AuthContext);*/


    const {loading, data: {getClients: clients} = {}} = useQuery(FETCH_CLIENTS_QUERY);

    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Новые клиенты</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h3>Loading clients...</h3>
                ) : (
                    <Transition.Group>
                        {clients && clients.map(c => (
                            // TODO: Показ клиентов только текущего пользователя
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

export default Home;
