// write your custom hook here to control your checkout form
import {useState} from 'react';

export const useForm = (initialValues, submitCallback) => {
    const [values, setItemValues] = useState(initialValues);


    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    
    const setValues = (newValue) => {
        setItemValues(newValue)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submitCallback(true);
    };

    return [values, setValues, handleChanges, handleSubmit];
} 