import {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";


export const useForm = (callback, initialState = {}) => {

    /*const [errors, setErrors] = useState({});*/
    const [values, setValues] = useState(initialState);

    const onChange = (e) => {
        let name = e.target.name.split('.');
        if (name.length === 1) {
            setValues({...values, [e.target.name]: e.target.value});
        } else if (name.length === 2) {
            setValues({...values, [name[0]]: {...values[name[0]], [name[1]]: e.target.value}});
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        console.log(values);
        callback();
    };

    return {
        onChange,
        onSubmit,
        values,
    }

}


// Наш хук
export default function useDebounce(value, delay) {
    // Состояние и сеттер для отложенного значения
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            // Выставить debouncedValue равным value (переданное значение)
            // после заданной задержки
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            // Вернуть функцию очистки, которая будет вызываться каждый раз, когда ...
            // ... useEffect вызван снова. useEffect будет вызван снова, только если ...
            // ... value будет изменено (смотри ниже массив зависимостей).
            // Так мы избегаем изменений debouncedValue, если значение value ...
            // ... поменялось в рамках интервала задержки.
            // Таймаут очищается и стартует снова.
            // Что бы сложить это воедино: если пользователь печатает что-то внутри ...
            // ... нашего приложения в поле поиска, мы не хотим, чтобы debouncedValue...
            // ... не менялось до тех пор, пока он не прекратит печатать дольше, чем 500ms.
            return () => {
                clearTimeout(handler);
            };
        },
        // Вызывается снова, только если значение изменится
        // мы так же можем добавить переменную "delay" в массива зависимостей ...
        // ... если вы собираетесь менять ее динамически.
        [value, delay]
    );

    return debouncedValue;
}


export const useSearch = (query, limit) => {

    const [value, setValue] = useState('');

    const debouncedValue = useDebounce(value, 500);

    const {loading, data} = useQuery(query, {
        onCompleted(data) {

        },
        variables: {
            search: debouncedValue,
            page: 1,
            limit
        }
    });

    let result;
    if (data) {
        result = Object.values(data)[0];
        if (result) {
            result = Object.values(result)[1];
        }
    }

    return {
        value, setValue, loading, result
    }

}


export const useEditMode = (UPDATE_MUTATION, id, initialState = {}) => {
    /*
    * возвращать setValues чтобы обновлять значения
    * */

    const [editMode, setEditMode] = useState(false);
    const [values, setValues] = useState({});

    const onChange = (e) => {
        let name = e.target.name.split('.');
        if (name.length === 1) {
            setValues({...values, [e.target.name]: e.target.value});
        } else if (name.length === 2) {
            setValues({...values, [name[0]]: {...values[name[0]], [name[1]]: e.target.value}});
        }
    };


    const [update, {/*error,*/ loading}] = useMutation(UPDATE_MUTATION, {
        variables: {id, newData: values}
    })

    const editModeOn = (nowValues) => {
        setEditMode(true);
    }

    const fetchAndEditModeOff = (e) => {
        e.preventDefault();
        update().then((result) => {
                setEditMode(false);
            }
        )
    }

    return {
        editMode,
        loadingUpdate: loading,
        fetchAndEditModeOff,
        editModeOn,
        values,
        setValues,
        onChange
    }

}
