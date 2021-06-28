import React, {useContext, useState} from 'react';
import {Button, Form} from 'semantic-ui-react';
import {useMutation} from "@apollo/client";
import gql from "graphql-tag";
import {useForm} from "../../util/hooks";

import {AuthContext} from "../../context/auth";

const Login = (props) => {
    const context = useContext(AuthContext);

    const [errors, setErrors] = useState({});

    const {onChange, onSubmit, values} = useForm(loginUser, {
        username: '',
        password: '',
    });

    const [login, {loading}] = useMutation(LOGIN_USER, {
        update(_, {data: {login: userData}}) {
            context.login(userData);
            props.history.push('/');
        },
        onError(e) {
            setErrors(e.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUser() {
        login();
    }


    return (
        <div className={"form-container"}>
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Вход в систему</h1>
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
                <Button type={"submit"} primary>Войти</Button>
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


const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(username: $username, password: $password){
            id
            email
            username
            phone
            name
            createdAt
            token
        }
    }
`


export default Login;
