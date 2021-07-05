import React, {useContext, useState} from 'react';
import {useQuery} from "@apollo/client";
import {Grid, Pagination, Transition} from "semantic-ui-react";
import ClientCard from "../common/ClientCard/ClientCard";

import {FETCH_CLIENTS_QUERY} from "../../util/graphql";
/*import {AuthContext} from "../../context/auth";*/
import CustomSearch from "../common/Search/CustomSearch";
import {PagesContext} from "../../context/pages";
import CustomLoader from "../common/CustomLoader/CustomLoader";

const Clients = () => {
    /*const {user} = useContext(AuthContext);*/
    const {clientsPage, clientsLimit, setPage} = useContext(PagesContext);

    /*const [activePage, setActivePage] = useState(1);*/
    const [totalPagesCount, setTotalPagesCount] = useState(5);

    const handlePaginationChange = (e, {activePage}) => {
        setPage(activePage, 'clients');
    };

    const {loading, data: {getClients: {clients, /*currentPage,*/ totalPages} = {}} = {}} = useQuery(FETCH_CLIENTS_QUERY, {
        onCompleted(data) {
            setTotalPagesCount(totalPages);
        },
        variables: {
            page: clientsPage,
            limit: clientsLimit
        }
    });


    return (

        <PagesContext.Consumer>
            {({clientsPage, clientsLimit}) =>
                <>
                    <CustomSearch/>
                    <Grid>
                        {console.log('render')}
                        <CustomLoader loading={loading}/>


                        {/* {loading ? (
                    <h3>Loading clients...</h3>
                ) : (*/}

                        <Transition.Group duration={200}>
                            {clients && clients.map(c => (
                                /*<Grid.Column key={c.id} style={{marginBottom: 20}}>
                                    <ClientItem client={c}/>
                                </Grid.Column>*/
                                <Grid.Row style={{padding: 1, paddingLeft: "1rem", paddingRight: "1rem"}} key={c.id}>
                                    <ClientCard client={c}/>
                                </Grid.Row>
                            ))}
                        </Transition.Group>
                        {/*)}*/}
                        <Grid.Row centered>
                            <Pagination
                                activePage={clientsPage}
                                totalPages={totalPagesCount}
                                onPageChange={handlePaginationChange}
                            />
                        </Grid.Row>
                    </Grid>
                </>}
        </PagesContext.Consumer>
    );
};


export default Clients;
