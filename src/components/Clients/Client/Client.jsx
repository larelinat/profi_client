import React, {useContext, useEffect} from 'react';
import gql from "graphql-tag";
import {useQuery} from "@apollo/client";
import {Card, Form, Grid} from "semantic-ui-react";
import moment from 'moment';
import 'moment/locale/ru'
import {AuthContext} from "../../../context/auth";
import DeleteButton from "./DeleteClientButton";
import CustomLoader from "../../common/CustomLoader/CustomLoader";
import {UPDATE_CLIENT_SUBSCRIPTION} from "../../../util/GraphQL/subscriptions";
import EditButton from "../../common/Edit/EditButton";
import {useEditMode} from "../../../util/hooks";
import EditField from "../../common/Edit/EditField";
import {UPDATE_CLIENT_MUTATION} from "../../../util/GraphQL/mutations";

moment.locale('ru')

const Client = (props) => {
    const clientId = props.match.params.clientId;
    const {user} = useContext(AuthContext);

    const {subscribeToMore, data: {getClient} = {}, loading} = useQuery(FETCH_CLIENT_QUERY, {
        variables: {
            clientId
        },
        fetchPolicy: "cache-and-network",
        onCompleted() {
            setValues({
                name: getClient.name,
                birth: getClient.birth,
                address: getClient.address,
                phone: getClient.phone,
                email: getClient.email,
                passport: {
                    series: getClient.passport.series,
                    number: getClient.passport.number,
                    issued_by: getClient.passport.issued_by,
                    date: getClient.passport.date,
                    code: getClient.passport.code,
                    snils: getClient.passport.snils
                },
                where_know: getClient.where_know,
                description: getClient.description
            });
        }
    })


    useEffect(() => {
        let unsubscribe = subscribeToMore({
            document: UPDATE_CLIENT_SUBSCRIPTION,
            variables: {id: clientId},
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData) return prev;
                const updatedClient = subscriptionData.data.updateClient;
                return Object.assign({}, prev, {
                    getClient: updatedClient
                })
            }
        })

        if (unsubscribe) return () => unsubscribe();

    }, [clientId, subscribeToMore]);

    const {
        editMode,
        fetchAndEditModeOff,
        editModeOn,
        values,
        setValues,
        onChange,
        loadingUpdate
    } = useEditMode(UPDATE_CLIENT_MUTATION, clientId);


    let clientMarkup;
    if (!getClient) {
        clientMarkup = <CustomLoader loading={loading}/>
    } else {
        const {
            name, birth, phone, email, passport, address, where_know, description,
            createdAt, createdBy
        } = getClient;


        clientMarkup = (
            <Form onSubmit={fetchAndEditModeOff} loading={loadingUpdate}>
                <Grid>

                    <Grid.Row>
                        <Grid.Column>
                            <Card fluid color={editMode ? 'yellow' : 'teal'}>

                                <Card.Content style={{margin: 10}}>
                                    <Card.Header textAlign={'center'}>
                                        <h1>
                                            <EditField
                                                type={"text"}
                                                placeholder={"Введите имя"}
                                                name={"name"}
                                                onChange={onChange}
                                                value={values.name}
                                                editMode={editMode}
                                            >{name}</EditField>
                                        </h1>
                                    </Card.Header>
                                    <Card.Meta textAlign={'center'}>Создан {moment(createdAt).fromNow()}</Card.Meta>
                                </Card.Content>
                                <Card.Content>
                                    <Card.Description>
                                        <Grid celled='internally' verticalAlign='middle'>
                                            <Grid.Row>
                                                <Grid.Column width={6} textAlign={'right'}>
                                                    Дата рождения:
                                                </Grid.Column>
                                                <Grid.Column width={10}>
                                                    <EditField
                                                        type={"date"}
                                                        placeholder={"Введите дату рождения"}
                                                        name={"birth"}
                                                        onChange={onChange}
                                                        value={values.birth}
                                                        editMode={editMode}
                                                    >{birth}</EditField>
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid.Column width={6} textAlign={'right'}>
                                                    Адрес регистрации:
                                                </Grid.Column>
                                                <Grid.Column width={10}>
                                                    <EditField
                                                        type={"text"}
                                                        placeholder={"Введите адрес"}
                                                        name={"address"}
                                                        onChange={onChange}
                                                        value={values.address}
                                                        editMode={editMode}
                                                    >{address}</EditField>
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid.Column width={6} textAlign={'right'}>
                                                    Email:
                                                </Grid.Column>
                                                <Grid.Column width={10}>
                                                    <EditField
                                                        type={"email"}
                                                        placeholder={"Введите email"}
                                                        name={"email"}
                                                        onChange={onChange}
                                                        value={values.email}
                                                        editMode={editMode}
                                                    >{email}</EditField>
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid.Column width={6} textAlign={'right'}>
                                                    Номер телефона:
                                                </Grid.Column>
                                                <Grid.Column width={10}>
                                                    <EditField
                                                        type={"tel"}
                                                        placeholder={"Введите номер телефона"}
                                                        name={"phone"}
                                                        onChange={onChange}
                                                        value={values.phone}
                                                        editMode={editMode}
                                                    >{phone}</EditField>
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid.Column width={16} textAlign={'center'}>
                                                    <h3>Паспорт</h3>
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid.Column width={6} textAlign={'right'}>
                                                    Серия и номер паспорта:
                                                </Grid.Column>
                                                <Grid.Column width={10}>
                                                    <EditField
                                                        type={"text"}
                                                        placeholder={"Введите серию паспорта"}
                                                        name={"passport.series"}
                                                        onChange={onChange}
                                                        value={values.passport?.series}
                                                        editMode={editMode}
                                                    >{passport.series}</EditField>{" "}
                                                    <EditField
                                                        type={"text"}
                                                        placeholder={"Введите номер паспорта"}
                                                        name={"passport.number"}
                                                        onChange={onChange}
                                                        value={values.passport?.number}
                                                        editMode={editMode}
                                                    >{passport.number}</EditField>
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid.Column width={6} textAlign={'right'}>
                                                    Кем и когда выдан:
                                                </Grid.Column>
                                                <Grid.Column width={10}>
                                                    <EditField
                                                        type={"text"}
                                                        placeholder={"Введите подразделение"}
                                                        name={"passport.issued_by"}
                                                        onChange={onChange}
                                                        value={values.passport?.issued_by}
                                                        editMode={editMode}
                                                    >{passport.issued_by}</EditField>{" "}
                                                    <EditField
                                                        type={"date"}
                                                        placeholder={"Введите дату выдачи"}
                                                        name={"passport.date"}
                                                        onChange={onChange}
                                                        value={values.passport?.date}
                                                        editMode={editMode}
                                                    >{passport.date}</EditField>
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid.Column width={6} textAlign={'right'}>
                                                    Код подразделения:
                                                </Grid.Column>
                                                <Grid.Column width={10}>
                                                    <EditField
                                                        type={"text"}
                                                        placeholder={"Введите код подразделения"}
                                                        name={"passport.code"}
                                                        onChange={onChange}
                                                        value={values.passport?.code}
                                                        editMode={editMode}
                                                    >{passport.code}</EditField>
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid.Column width={6} textAlign={'right'}>
                                                    СНИЛС:
                                                </Grid.Column>
                                                <Grid.Column width={10}>
                                                    <EditField
                                                        type={"text"}
                                                        placeholder={"Введите СНИЛС"}
                                                        name={"passport.snils"}
                                                        onChange={onChange}
                                                        value={values.passport?.snils}
                                                        editMode={editMode}
                                                    >{passport.snils}</EditField>
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid.Column width={16} textAlign={'center'}>
                                                    <h3>Дополнительно</h3>
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid.Column width={6} textAlign={'right'}>
                                                    Откуда:
                                                </Grid.Column>
                                                <Grid.Column width={10}>
                                                    <EditField
                                                        type={"text"}
                                                        placeholder={""}
                                                        name={"where_know"}
                                                        onChange={onChange}
                                                        value={values.where_know}
                                                        editMode={editMode}
                                                    >{where_know}</EditField>
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid.Column width={6} textAlign={'right'}>
                                                    Описание:
                                                </Grid.Column>
                                                <Grid.Column width={10}>
                                                    <EditField
                                                        type={"textarea"}
                                                        placeholder={"Введите описание"}
                                                        name={"description"}
                                                        onChange={onChange}
                                                        value={values.description}
                                                        editMode={editMode}
                                                    >{description}</EditField>
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid.Column width={6} textAlign={'right'}>
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
                                    {user && <DeleteButton client_id={clientId} name={values.name}/>}
                                    {user && <EditButton
                                        editModeOn={editModeOn}
                                        editMode={editMode}/>}
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
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

