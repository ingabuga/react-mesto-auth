// import { useEffect, useRef, useState} from 'react';
// import PopupWithForm from './PopupWithForm.js';
// import {useFormAndValidation} from './useFormAndValidation.js'

// function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
//     const inputRef = useRef();


//   const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation()


//     function handleSubmit(evt) {
//         evt.preventDefault();
        
//         onUpdateAvatar({
//             // avatar: inputRef.current.value
//             avatar: (isValid && values["avatar"])
//         });
//     }

//     // const [isValid, setValidity] = useState({valid: false, message: ''});

//     // function handleValidation() {
//     //     if (inputRef.current.validity.valid) {
//     //         setValidity({
//     //             valid: true, 
//     //             message: ''
//     //         })
//     //     } else {
//     //         setValidity({
//     //             valid: false, 
//     //             message: inputRef.current.validationMessage
//     //         })
//     //     }
//     //   }

//     // useEffect(() =>{
//     //     inputRef.current.value = '';
//     // }, [isOpen])

//     useEffect(() =>{
//         // inputRef.current.value = '';
//         // setValidity({valid: false, message: ''});
//         resetForm({avatar: ""})
//       }, [isOpen, resetForm])


//     return (

//     <PopupWithForm 
//         name="avatar" 
//         title="Обновить аватар"
//         buttonText="Сохранить"
//         isOpen={isOpen} 
//         onClose={onClose} 
//         onSubmit={handleSubmit}
//         // isValid={isValid.valid}
//         disabled={!isValid}
//     >
//             <div className="popup__field">
//                 <input type="url" id="avatar-input" placeholder="Ссылка на аватар" name="link" className="popup__text popup__text_input_job" required ref={inputRef} onChange={handleChange}
//                 value={values["avatar"] ? values["avatark"] : ""}
//                 />
//                 <span id="avatar-input-error" 
//                 // className="error"
//                 // className={`error ${(!isValid.valid && isOpen) ? "error_active" : ""}`}
//                 className={`error ${(!isValid && isOpen) ? "error_active" : ""}`}

//                 >
//                     {errors["avatar"]}
//                 </span>
//             </div>
//     </PopupWithForm>

//     )

// }

// export default EditAvatarPopup;



import { useEffect, useRef, useState} from 'react'; 
import PopupWithForm from './PopupWithForm.js'; 

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) { 
    const inputRef = useRef(); 

    function handleSubmit(evt) { 
        evt.preventDefault(); 
        onUpdateAvatar({ 
            avatar: inputRef.current.value 
        }); 
    } 
 
    const [isValid, setValidity] = useState({valid: false, message: ''}); 
 
    function handleValidation() { 
        if (inputRef.current.validity.valid) { 
            setValidity({ 
                valid: true,  
                message: '' 
            }) 

        } else { 
            setValidity({ 
                valid: false,  
                message: inputRef.current.validationMessage 
            }) 
        } 
    } 


    useEffect(() =>{ 
        inputRef.current.value = ''; 
        setValidity({valid: false, message: ''}); 
    }, [isOpen]) 


    return ( 
        <PopupWithForm  
            name="avatar"  
            title="Обновить аватар" 
            buttonText="Сохранить" 
            isOpen={isOpen}  
            onClose={onClose}  
            onSubmit={handleSubmit} 
            isValid={isValid.valid} 
        > 

            <div className="popup__field"> 
                <input type="url" id="avatar-input" placeholder="Ссылка на аватар" name="link" className="popup__text popup__text_input_job" required ref={inputRef} onChange={handleValidation}/> 
                <span id="avatar-input-error"  
                // className="error" 
                className={`error ${(!isValid.valid && isOpen) ? "error_active" : ""}`} 
                > 
                    {isValid.message} 
                </span> 
            </div> 
        </PopupWithForm> 
    ) 

} 

 

export default EditAvatarPopup; 