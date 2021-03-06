import React, {useContext} from 'react';
import {Button, Form} from "semantic-ui-react";
import {useForm} from "../../../util/hooks";
import gql from "graphql-tag";
import {useMutation} from "@apollo/client";

import {FETCH_CLIENTS_QUERY} from "../../../util/GraphQL/graphql";
import {PagesContext} from "../../../context/pages";

const AddClient = (props) => {
    const {clientsPage, clientsLimit, setPage} = useContext(PagesContext);
    const {values, onChange, onSubmit} = useForm(createClientCallback, {
        name: '',
        birth: '',
        address: '',
        phone: '',
        email: '',
        passport: {
            series: '',
            number: '',
            issued_by: '',
            date: '',
            code: '',
            snils: '',
        },
        where_know: '',
        description: '',
    })

    const [createClient, {error, /*loading*/}] = useMutation(CREATE_CLIENT_MUTATION, {
        variables: {newClient: values},
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_CLIENTS_QUERY,
                variables: {
                    page: clientsPage,
                    limit: clientsLimit
                }
            });
            console.log(result.data.createClient);
            if(data) {
                let newData = {
                    ...data,
                    getClients: {
                        ...data.getClients,
                        clients: [
                            result.data.createClient,
                            ...data.getClients.clients
                        ]
                    }
                }

                proxy.writeQuery({
                    query: FETCH_CLIENTS_QUERY,
                    data: newData,
                    variables: {
                        page: clientsPage,
                        limit: clientsLimit
                    }

                })
            }


            props.history.push('/clients');
        }
    })

    async function createClientCallback() {
        await setPage(1, 'clients');
        await createClient();
    }

//TODO: ?????????????? ?????????????????? ????????????
//TODO: ???????????????? select ?????? ???????? "???????????? ????????????"
    return (
        <>
            <Form onSubmit={onSubmit} className={"form-container"}>

                <Form.Input
                    type={"text"}
                    label={"??????"}
                    placeholder={"?????????????? ??????"}
                    name={"name"}
                    onChange={onChange}
                    value={values.name}
                />
                <Form.Input
                    type={"date"}
                    label={'???????? ????????????????'}
                    name={"birth"}
                    onChange={onChange}
                    value={values.birth}
                />
                <Form.Input
                    type={"text"}
                    label={"??????????"}
                    placeholder={"?????????????? ??????????"}
                    name={"address"}
                    onChange={onChange}
                    value={values.address}
                />
                <Form.Input
                    type={"tel"}
                    label={"?????????? ????????????????"}
                    placeholder={"?????????????? ?????????? ????????????????"}
                    name={"phone"}
                    onChange={onChange}
                    value={values.phone}
                />
                <Form.Input
                    type={"email"}
                    label={"Email-??????????"}
                    placeholder={"?????????????? email"}
                    name={"email"}
                    onChange={onChange}
                    value={values.email}
                />
                <h4>??????????????</h4>
                <Form.Group width={2}>

                    <Form.Input
                        type={"text"}
                        label={"??????????"}
                        placeholder={"?????????????? ?????????? ????????????????"}
                        name={"passport.series"}
                        onChange={onChange}
                        value={values.passport.series}
                    />
                    <Form.Input
                        type={"text"}
                        label={"??????????"}
                        placeholder={"?????????????? ?????????? ????????????????"}
                        name={"passport.number"}
                        onChange={onChange}
                        value={values.passport.number}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Input
                        type={"text"}
                        label={"?????? ??????????"}
                        placeholder={"?????????????? ??????????????????????????"}
                        name={"passport.issued_by"}
                        onChange={onChange}
                        value={values.passport.issued_by}
                    />
                    <Form.Input
                        type={"text"}
                        label={"?????? ??????????????????????????"}
                        placeholder={"?????????????? ?????? ??????????????????????????"}
                        name={"passport.code"}
                        onChange={onChange}
                        value={values.passport.code}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Input
                        type={"date"}
                        label={"???????? ????????????"}
                        name={"passport.date"}
                        onChange={onChange}
                        value={values.passport.date}
                    />
                    <Form.Input
                        type={"text"}
                        label={"??????????"}
                        name={"passport.snils"}
                        onChange={onChange}
                        value={values.passport.snils}
                        placeholder={'??????????'}
                    />
                </Form.Group>


                <Form.Input
                    type={"text"}
                    label={"???????????? ????????????"}
                    placeholder={""}
                    name={"where_know"}
                    onChange={onChange}
                    value={values.where_know}
                />
                <Form.TextArea
                    label={"????????????????"}
                    placeholder={"?????????????? ????????????????"}
                    name={"description"}
                    onChange={onChange}
                    value={values.description}
                />
                <Button type={"submit"} primary>??????????????</Button>
            </Form>
            {error && (
                <div className={"ui error message"} style={{marginBottom: 20}}>
                    <ui className="list">
                        <li>{error.graphQLErrors}</li>
                    </ui>
                </div>
            )}
        </>
    );
};

const CREATE_CLIENT_MUTATION = gql`
    mutation createClient($newClient: ClientInput!){
        createClient(clientInput:$newClient) {
            name
            birth
            address
            phone
            email
            passport{
                series
                number
                issued_by
                date
                code
                snils
            }
            id
            createdBy
            createdAt
        }
    }
`

/*const CREATE_CLIENT_MUTATION = gql`
    mutation createClient(
        $name: String!
        $birth: String
        $address: String
        $phone: String!
        $email: String
        $where_know: String
        $description: String
        $series: String!
        $number: String!
        $issued_by: String!
        $date: String!
        $code: String!
        $snils: String
    ){
        createClient(clientInput:{
            name: $name
            birth: $birth
            address: $address
            phone: $phone
            email: $email
            where_know: $where_know
            description: $description
            passport: {
                series: $series
                number: $number
                issued_by: $issued_by
                date: $date
                code: $code
                snils: $snils
            }

        }) {
            name
            birth
            address
            phone
            email
            passport{
                series
                number
                issued_by
                date
                code
                snils
            }
            id
            createdBy
            createdAt
        }
    }
`*/

export default AddClient;
