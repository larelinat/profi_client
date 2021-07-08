import React from 'react';
import {Form} from "semantic-ui-react";

const EditField = ({value, text, editMode, type, children, ...next}) => {
    return (
        <>
            {editMode ? (
                type === 'textarea' ? <Form.TextArea value={value} style={{width: "80%"}} {...next} />
                    : <Form.Input value={value} style={{width: "80%"}} type={type} {...next}/>
            ) : children
            }

        </>
    );
};

export default EditField;
