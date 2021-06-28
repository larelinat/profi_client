import React, {useContext} from 'react';
import gql from "graphql-tag";
import {useQuery} from "@apollo/client";
import {Card, Grid} from "semantic-ui-react";
import moment from 'moment';
import 'moment/locale/ru'
import {AuthContext} from "../../../context/auth";
import DeleteButton from "./DeleteClientButton";

moment.locale('ru')

const Client = (props) => {
    const clientId = props.match.params.clientId;
    const {user} = useContext(AuthContext);

    const {data: {getClient} = {}} = useQuery(FETCH_CLIENT_QUERY, {
        variables: {
            clientId
        }
    })

    let clientMarkup;
    if (!getClient) {
        clientMarkup = <p>Loading...</p>
    } else {
        const {
            id, name, birth, passport, address,
            phone, email, where_know, description,
            createdAt, createdBy
        } = getClient;
        clientMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Card fluid color={'teal'}>

                            <Card.Content style={{margin: 10}}>
                                <Card.Header textAlign={'center'}><h1>{name}</h1></Card.Header>
                                <Card.Meta textAlign={'center'}>Создан {moment(createdAt).fromNow()}</Card.Meta>
                            </Card.Content>
                            <Card.Content>
                                <Card.Description>
                                    <Grid celled='internally'>
                                        <Grid.Row>
                                            <Grid.Column width={5} textAlign={'right'}>
                                                Дата рождения:
                                            </Grid.Column>
                                            <Grid.Column width={10}>
                                                {birth}
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={5} textAlign={'right'}>
                                                Адрес регистрации:
                                            </Grid.Column>
                                            <Grid.Column width={10}>
                                                {address}
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={5} textAlign={'right'}>
                                                Email:
                                            </Grid.Column>
                                            <Grid.Column width={10}>
                                                {email}
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={5} textAlign={'right'}>
                                                Номер телефона:
                                            </Grid.Column>
                                            <Grid.Column width={10}>
                                                {phone}
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={15} textAlign={'center'}>
                                                <h3>Паспорт</h3>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={5} textAlign={'right'}>
                                                Серия и номер паспорта:
                                            </Grid.Column>
                                            <Grid.Column width={10}>
                                                {passport.series} {passport.number}
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={5} textAlign={'right'}>
                                                Кем и когда выдан:
                                            </Grid.Column>
                                            <Grid.Column width={10}>
                                                {passport.issued_by} {passport.date}
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={5} textAlign={'right'}>
                                                Код подразделения:
                                            </Grid.Column>
                                            <Grid.Column width={10}>
                                                {passport.code}
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={5} textAlign={'right'}>
                                                СНИЛС:
                                            </Grid.Column>
                                            <Grid.Column width={10}>
                                                {passport.snils}
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={15} textAlign={'center'}>
                                                <h3>Дополнительно</h3>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={5} textAlign={'right'}>
                                                Откуда:
                                            </Grid.Column>
                                            <Grid.Column width={10}>
                                                {where_know}
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={5} textAlign={'right'}>
                                                Описание:
                                            </Grid.Column>
                                            <Grid.Column width={10}>
                                                {description}
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={5} textAlign={'right'}>
                                                Менеджер:
                                            </Grid.Column>
                                            <Grid.Column width={10}>
                                                {createdBy}
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content>
                                {user && <DeleteButton client_id={id} name={name}/>}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return clientMarkup;
};

const FETCH_CLIENT_QUERY = gql`
    query($clientId: ID!) {
        getClient(clientId: $clientId){
            id
            name
            birth
            passport{
                series
                number
                issued_by
                date
                code
                snils
            }
            address
            phone
            email
            where_know
            description
            createdAt
            createdBy
        }
    }
`


export default Client;

