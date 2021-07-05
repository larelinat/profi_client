import React from 'react';
import {Grid} from "semantic-ui-react";
/*import {AuthContext} from "../../context/auth";*/

const Home = () => {
    /*const {user} = useContext(AuthContext);*/


    /*const {loading, data: {getClients: clients} = {}} = useQuery(FETCH_CLIENTS_QUERY);*/

    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Домашняя страница</h1>
                {/*<Link to={"/clients/add"}>Добавить клиента</Link>*/}
            </Grid.Row>
            {/*<Grid.Row>
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
            </Grid.Row>*/}

        </Grid>
    );
};

export default Home;
