import React from 'react';
import {Card, Grid} from "semantic-ui-react";
import {Link} from "react-router-dom";

/*import {AuthContext} from "../../../context/auth";*/

const ClientCard = ({client: {id, name, phone, email}}) => {
    /*const {user} = useContext(AuthContext);*/
    return (
        <Card fluid link>
            <Card.Content as={Link} to={`client/${id}`} style={{color: 'black'}} >
                <Grid columns={3}>
                    <Grid.Column>
                        <Card.Header>{name}</Card.Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Card.Meta>{phone}</Card.Meta>
                    </Grid.Column>
                    <Grid.Column>
                        <Card.Content extra>
                            {email}
                        </Card.Content>
                    </Grid.Column>
                </Grid>
            </Card.Content>

        </Card>
    );
};

export default ClientCard;
