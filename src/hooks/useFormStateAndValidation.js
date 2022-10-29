
// import {useState, useCallback} from 'react';

// function useFormStateAndValidation() {
//   const [ values, setValues ] = useState({});
//   const [ errors, setErrors ] = useState({});
//   const [ isValid, setIsValid ] = useState(true);

//   const handleChange = (e) => {
//     const {name, value} = e.target
//     setValues({...values, [name]: value });
//     setErrors({...errors, [name]: e.target.validationMessage});
//     setIsValid(e.target.closest('form').checkValidity());
//   };



//   const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
//     setValues(newValues);
//     setErrors(newErrors);
//     setIsValid(newIsValid);
//   }, [setValues, setErrors, setIsValid]);

//   return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
// }


// export default useFormStateAndValidation;

import { useCallback, useState } from "react";

function useFormStateAndValidation() {
    const [values, setValues] = useState({});
    const [errorMessages, setErrorMessages] = useState({});
    const [formIsValid, setFormValidity] = useState(false);

    function onChange(evt) {
        const { name, value } = evt.target;
        const isValid = evt.target.closest('form').checkValidity();

        setValues({
            ...values,
            [name]: value,
        })
        setErrorMessages({
            ...errorMessages,
            [name]: evt.target.validationMessage
        })
        setFormValidity(isValid);
    }

    const resetFormValues = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrorMessages(newErrors);
        setFormValidity(newIsValid);
    }, [setValues, setErrorMessages, setFormValidity]);

    return { values, errorMessages, formIsValid, onChange, resetFormValues }
}

export default useFormStateAndValidation;
