import {useState} from 'react';


export const useForm = (callback, initialState = {}) => {

    /*const [errors, setErrors] = useState({});*/
    const [values, setValues] = useState(initialState);

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    const onSubmit = e => {
        e.preventDefault();
        callback();
    };

    return {
        onChange,
        onSubmit,
        values,
    }


}


