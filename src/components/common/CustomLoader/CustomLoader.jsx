import React from 'react';
import {Dimmer, Loader} from "semantic-ui-react";

const CustomLoader = ({loading}) => {
    return (
        <Dimmer active={loading} inverted>
            <Loader>Загрузка</Loader>
        </Dimmer>
    );
};

export default CustomLoader;
