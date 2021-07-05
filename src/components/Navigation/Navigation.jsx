import React, {useContext, useEffect, useState} from 'react';
import {Menu} from "semantic-ui-react";
import {Link, Redirect, withRouter} from "react-router-dom";
import {AuthContext} from "../../context/auth";

const Navigation = (props) => {
    const {user} = useContext(AuthContext);


    const pathname = window.location.pathname;
    let path = pathname === '/' ? 'home' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);

    useEffect(()=>{
        setActiveItem(path)
    }, [path]);

    const handleItemClick = (e, {name}) => setActiveItem(name);

    return user ? (
        <Menu vertical stackable>
            <Menu.Item
                name={'home'}
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={Link}
                to={'/'}
            >Домашняя страница</Menu.Item>
            <Menu.Item>
                <Menu.Header>Клиенты</Menu.Header>
                <Menu.Menu>
                    <Menu.Item
                        name={'clients'}
                        active={activeItem === 'clients'}
                        onClick={handleItemClick}
                        as={Link}
                        to={'/clients'}>Все</Menu.Item>
                    <Menu.Item
                        name={'clients/add'}
                        active={activeItem === 'clients/add'}
                        onClick={handleItemClick}
                        as={Link}
                        to={'/clients/add'}
                    >
                        Добавить
                    </Menu.Item>
                </Menu.Menu>
            </Menu.Item>
        </Menu>
    ) : ( <Redirect to={'/login'}/>);
};

export default withRouter(Navigation);
