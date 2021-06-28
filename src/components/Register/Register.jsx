import React, {useContext, useState} from 'react';
import {Button, Form} from 'semantic-ui-react';
import {useMutation} from "@apollo/client";
import gql from "graphql-tag";

import {AuthContext} from "../../context/auth";
import {useForm} from "../../util/hooks";


const Register = (props) => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const {onChange, onSubmit, values} = useForm(registerUser, {
        username: '',
        password: '',
        email: '',
        confirmPassword: '',
        name: '',
        phone: '',
    });

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(_, {data: {register: userDara}}) {
            context.login(userDara);
            props.history.push('/');
        },
        onError(e) {
            setErrors(e.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function registerUser() {
        addUser();
    }

    return (
        <div className={"form-container"}>
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Регистрация</h1>
                <Form.Input
                    label={"Имя пользователя"}
                    placeholder={"Введите имя пользователя..."}
                    name={"username"}
                    type={"text"}
                    value={values.username}
                    error={!!errors.username}
                    onChange={onChange}/>
                <Form.Input
                    label={"Пароль"}
                    type={"password"}
                    placeholder={"Введите пароль..."}
                    name={"password"}
                    value={values.password}
                    error={!!errors.password}
                    onChange={onChange}/>
                <Form.Input
                    label={"Повторите пароль"}
                    type={"password"}
                    placeholder={"Введите пароль повторно..."}
                    name={"confirmPassword"}
                    value={values.confirmPassword}
                    error={!!errors.confirmPassword}
                    onChange={onChange}/>
                <Form.Input
                    label={"ФИО"}
                    placeholder={"Введите ФИО пользователя..."}
                    name={"name"}
                    value={values.name}
                    error={!!errors.name}
                    onChange={onChange}/>
                <Form.Input
                    label={"Номер телефона"}
                    placeholder={"Введите номер телефона..."}
                    name={"phone"}
                    type={"tel"}
                    value={values.phone}
                    error={!!errors.phone}
                    onChange={onChange}/>
                <Form.Input
                    label={"Email адрес"}
                    placeholder={"Введите email пользователя..."}
                    name={"email"}
                    type={"email"}
                    value={values.email}
                    error={!!errors.email}
                    onChange={onChange}/>
                <Button type={"submit"} primary>Зарегистрироваться</Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className={"list"}>
                        {Object.values(errors).map(v => (
                            <li key={v}>{v}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
        $name: String!
        $phone: String!
    ){
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
                name: $name
                phone: $phone
            }
        ){
            id
            email
            username
            name
            phone
            createdAt
            token
        }
    }
`


export default Register;
