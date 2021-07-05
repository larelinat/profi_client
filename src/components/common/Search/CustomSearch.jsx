import React from 'react';
import {Grid, Item, Search} from "semantic-ui-react";
import {useSearch} from "../../../util/hooks";
import {SEARCH_CLIENTS_QUERY} from "../../../util/graphql";
import {withRouter} from "react-router-dom";

const CustomSearch = (props) => {

    const {value, setValue, loading, result} = useSearch(SEARCH_CLIENTS_QUERY, 10);


    const resultRenderer = (props) => {
        const {name, phone, email} = props;
        return (
            <Item>
                <Grid columns={3}>
                    <Grid.Column>
                        <Item.Header>{name}</Item.Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Item.Description>{phone}</Item.Description>
                    </Grid.Column>
                    <Grid.Column>
                        <Item.Content>{email}</Item.Content>
                    </Grid.Column>
                </Grid>
            </Item>

            )
    }

    const handleResultSelect = (e, { result }) => {
        props.history.push(`/client/${result.id}`);
    }

    const handleSearchChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <Grid >

            <Grid.Column width={16}>
                <Search
                    input={{ fluid: true }}
                    fluid
                    width={"100%"}
                    loading={loading}
                    onResultSelect={handleResultSelect}
                    onSearchChange={handleSearchChange}
                    resultRenderer={resultRenderer}
                    results={result}
                    value={value}
                    showNoResults={false}

                />
            </Grid.Column>
        </Grid>
    );
};

export default withRouter(CustomSearch);
