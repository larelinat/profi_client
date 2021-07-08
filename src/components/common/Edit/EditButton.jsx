import React from 'react';
import {Button, Icon} from "semantic-ui-react";

const EditButton = (props) => {

    return (
        !props.editMode ? (
            <Button as={"div"} color={"yellow"} style={{float: "right"}} onClick={props.editModeOn}>
                <Icon name={"pencil"} style={{margin: 0}} />
            </Button>
        ) : (
            <Button color={"green"} style={{float: "right"}} type={"submit"}>
                <Icon name={"check"} style={{margin: 0}} />
            </Button>
        )


    );
};

export default EditButton;
