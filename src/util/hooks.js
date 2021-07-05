import {useEffect, useState} from 'react';
import {useQuery} from "@apollo/client";


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
        onCompleted(data){

        },
        variables: {
            search: debouncedValue,
            page: 1,
            limit
        }
    });

    let result;
    if(data) {
        result = Object.values(data)[0];
        if(result) {
            result = Object.values(result)[1];
        }
    }

    return {
        value, setValue, loading, result
    }

}
