import React, {useContext, useState} from 'react'
import {Menu} from 'semantic-ui-react'
import {Link, withRouter} from "react-router-dom";

import {AuthContext} from "../../../context/auth";

const MenuBar = (props) => {

    const {user, logout} = useContext(AuthContext);

    const pathname = window.location.pathname;
    let path = pathname === '/' ? 'Домашняя страница' : pathname.substr(1);

    switch (path) {
        case 'login':
            path = 'Войти';
            break;
        case 'register':
            path = 'Зарегистрироваться';
            break;
        default:
            break;
    }

    const onLogout = () => {
        logout();
        console.log(props.history);
        props.history.push('/');
    }

    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, {name}) => setActiveItem(name);

    return user ? (
        <Menu pointing secondary size={'massive'} color={'teal'}>
            <Menu.Item
                name={user.name}
                active
                as={Link}
                to={'/'}
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='Выйти'
                    onClick={onLogout}
                />
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu pointing secondary size={'massive'} color={'teal'}>
            <Menu.Item
                name='Домашняя страница'
                active={activeItem === 'Домашняя страница'}
                onClick={handleItemClick}
                as={Link}
                to={'/'}
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='Войти'
                    active={activeItem === 'Войти'}
                    onClick={handleItemClick}
                    as={Link}
                    to={'/login'}
                />
                <Menu.Item
                    name='Зарегистрироваться'
                    active={activeItem === 'Зарегистрироваться'}
                    onClick={handleItemClick}
                    as={Link}
                    to={'/register'}
                />
            </Menu.Menu>
        </Menu>
    );


}

export default withRouter(MenuBar);
