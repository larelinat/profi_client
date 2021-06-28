import React from 'react';
import {Button, Form} from "semantic-ui-react";
import {useForm} from "../../../util/hooks";
import gql from "graphql-tag";
import {useMutation} from "@apollo/client";

import {FETCH_CLIENTS_QUERY} from "../../../util/graphql";

const AddClient = (props) => {

    const {values, onChange, onSubmit} = useForm(createClientCallback, {
        name: '',
        birth: '',
        address: '',
        phone: '',
        email: '',
        series: '',
        number: '',
        issued_by: '',
        date: '',
        code: '',
        snils: '',
        where_know: '',
        description: '',
    })

    const [createClient, {error, loading}] = useMutation(CREATE_CLIENT_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_CLIENTS_QUERY
            });
            let newData = [...data.getClients];
            newData = [result.data.createClient, ...newData];
            proxy.writeQuery({
                query: FETCH_CLIENTS_QUERY, data: {
                    ...data,
                    getClients: {
                        newData,
                    }
                }
            })
            console.log(result);
            props.history.push('/clients');
        }
    })

    function createClientCallback() {
        createClient();
    }

//TODO: Сделать обработку ошибок
//TODO: Добавить select для поля "Откуда узнали"
    return (
        <>
            <Form onSubmit={onSubmit} className={"form-container"}>

                <h2>Создать клиента:</h2>
                <Form.Input
                    type={"text"}
                    label={"ФИО"}
                    placeholder={"Введите ФИО"}
                    name={"name"}
                    onChange={onChange}
                    value={values.name}
                />
                <Form.Input
                    type={"date"}
                    label={'Дата рождения'}
                    name={"birth"}
                    onChange={onChange}
                    value={values.birth}
                />
                <Form.Input
                    type={"text"}
                    label={"Адрес"}
                    placeholder={"Введите адрес"}
                    name={"address"}
                    onChange={onChange}
                    value={values.address}
                />
                <Form.Input
                    type={"tel"}
                    label={"Номер телефона"}
                    placeholder={"Введите номер телефона"}
                    name={"phone"}
                    onChange={onChange}
                    value={values.phone}
                />
                <Form.Input
                    type={"email"}
                    label={"Email-адрес"}
                    placeholder={"Введите email"}
                    name={"email"}
                    onChange={onChange}
                    value={values.email}
                />
                <h4>Паспорт</h4>
                <Form.Group width={2}>

                    <Form.Input
                        type={"text"}
                        label={"Серия"}
                        placeholder={"Введите серию паспорта"}
                        name={"series"}
                        onChange={onChange}
                        value={values.series}
                    />
                    <Form.Input
                        type={"text"}
                        label={"Номер"}
                        placeholder={"Введите номер паспорта"}
                        name={"number"}
                        onChange={onChange}
                        value={values.number}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Input
                        type={"text"}
                        label={"Кем выдан"}
                        placeholder={"Введите подразделение"}
                        name={"issued_by"}
                        onChange={onChange}
                        value={values.issued_by}
                    />
                    <Form.Input
                        type={"text"}
                        label={"Код подразделения"}
                        placeholder={"Введите код подразделения"}
                        name={"code"}
                        onChange={onChange}
                        value={values.code}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Input
                        type={"date"}
                        label={"Дата выдачи"}
                        name={"date"}
                        onChange={onChange}
                        value={values.date}
                    />
                    <Form.Input
                        type={"text"}
                        label={"СНИЛС"}
                        name={"snils"}
                        onChange={onChange}
                        value={values.snils}
                        placeholder={'СНИЛС'}
                    />
                </Form.Group>


                <Form.Input
                    type={"text"}
                    label={"Откуда узнали"}
                    placeholder={""}
                    name={"where_know"}
                    onChange={onChange}
                    value={values.where_know}
                />
                <Form.TextArea
                    label={"Описание"}
                    placeholder={"Введите описание"}
                    name={"description"}
                    onChange={onChange}
                    value={values.description}
                />
                <Button type={"submit"} primary>Создать</Button>
            </Form>
            {error && (
                <div className={"ui error message"} style={{marginBottom: 20}}>
                    <ui className="list">
                        <li>{error.graphQLErrors[0].message}</li>
                    </ui>
                </div>
            )}
        </>
    );
};

const CREATE_CLIENT_MUTATION = gql`
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
`

export default AddClient;
