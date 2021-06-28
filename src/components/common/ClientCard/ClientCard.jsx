import React, {useContext} from 'react';
import {Card} from "semantic-ui-react";
import {Link} from "react-router-dom";

import {AuthContext} from "../../../context/auth";

const ClientCard = ({client: {id, name, phone, email, birth, address}}) => {
    const {user} = useContext(AuthContext);
    return (
        <Card fluid>
            <Card.Content as={Link} to={`clients/${id}`}>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>{phone}</Card.Meta>
                <Card.Content style={{color: 'teal'}}>{address}</Card.Content>

            </Card.Content>
            <Card.Content extra as={"a"} href={`mailto:${email}`}>
                {email}
            </Card.Content>
        </Card>
    );
};

export default ClientCard;
