import React from "react";
import {useState} from "react";
import { useForm } from "react-hook-form"

const RegisterForm = () => {
    const errorStatuses = [400, 401, 500]
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm();
        const onSubmit = async (data) => {           
            const response = await fetch('/api/users', {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"

                }
            })
            const json = response.json()
    
            if (response.ok) {
                json.then(result => {
                    setMessage(result.message)
                    setErrorMessage()
                }).catch(errors => {
                    console.log(errors)
                })
            } 
            if (errorStatuses.includes(response.status)) {
                json.then(result => {
                    setMessage()
                    setErrorMessage(result.message)
                })
            }
        }
    
    return (
        <form className="App" onSubmit={handleSubmit(onSubmit)}>
            <span className="alerts">
                <b>{message}</b>
            </span>
            <span className="errors">
                <i>{errorMessage}</i>
            </span>
            <div>
                <input placeholder="Email" type="text" {...register("email", { required: true, minLength: 6,  maxLength: 50 })} />
                {errors.email && <span style={{ color: "red" }}>
                *Email* is mandatory and not valid </span>}
            </div>
            <div>
                <select {...register("role", { required: true })}>
                    <option value="">Select role...</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
                {errors.role && <span style={{ color: "red" }}>
                *Role* is mandatory</span>}
            </div>
            <div>
                <input placeholder="Password" type="password" {...register("password", { required: true, minLength: 6, maxLength: 30})} />
                {errors.password && <span style={{ color: "red" }}>
                *Password* is mandatory and not valid</span>}
            </div>
            <input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
        </form>
    )
}

export default RegisterForm
