import React, {useContext, useState} from 'react'
import {Grid, Menu} from 'semantic-ui-react'
import {Link, withRouter} from "react-router-dom";

import {AuthContext} from "../../../context/auth";

const MenuBar = (props) => {

    const {user, logout} = useContext(AuthContext);

    const pathname = window.location.pathname;
    let path = pathname === '/' ? 'home' : pathname.substr(1);

    const onLogout = () => {
        logout();
        console.log(props.history);
        props.history.push('/');
    }

    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, {name}) => setActiveItem(name);

    return (
        <Grid>

            <Grid.Column width={16}>
            {user ? (

        <Menu pointing secondary size={'massive'} color={'teal'} fluid>
            <Menu.Item
                name={user.name}
                active
                as={Link}
                to={'/'}
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='logout'
                    onClick={onLogout}
                >Выйти</Menu.Item>
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu pointing secondary size={'massive'} color={'teal'} fluid>
            {/*<Menu.Item
                name={'home'}
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={Link}
                to={'/'}
                >Домашняя страница</Menu.Item>*/}
            <Menu.Menu position='right'>
                <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                    as={Link}
                    to={'/login'}
                >Войти</Menu.Item>
                <Menu.Item
                    name='register'
                    active={activeItem === 'register'}
                    onClick={handleItemClick}
                    as={Link}
                    to={'/register'}
                >Зарегистрироваться</Menu.Item>
            </Menu.Menu>
        </Menu>
    )}
            </Grid.Column>

        </Grid>
    )


}

export default withRouter(MenuBar);
