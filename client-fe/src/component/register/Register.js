import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import axios from "axios";
import "./index.css"

function Register() {
    const initialValues = {
        username: "",
        passwd: "",
        full_name: "",
        active: 1,
        role: 1
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        passwd: Yup.string().min(4).max(20).required(),
        full_name: Yup.string().required()
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:8080/auth", data).then(() => {
            console.log(data);
        });
    };

    return (
        <div className='body'>
            <div className="right-login">
                <div className="card-login">
                    <h1>REGISTER</h1>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        <Form className="login-form">
                            <div className="form-group">
                                <Field
                                    autocomplete="off"
                                    id="inputCreatePost"
                                    name="username" className="form-field"
                                    placeholder="Username"
                                />
                                <ErrorMessage name="username" component="span" className='errorMsg' />
                            </div>

                            <div className='form-group'>
                                <Field
                                    autocomplete="off"
                                    type="password"
                                    id="inputCreatePost"
                                    name="passwd" className="form-field"
                                    placeholder="Password"
                                />
                                <ErrorMessage name="passwd" component="span" className='errorMsg' />
                            </div>

                            <div className='form-group'>
                                <Field
                                    autocomplete="off"
                                    id="inputCreatePost"
                                    name="full_name" className="form-field"
                                    placeholder="Fullname"
                                />
                                <ErrorMessage name="full_name" component="span" className='errorMsg' />
                            </div>

                            <button className="button" type="submit"> Register</button>
                            <div className='register'>
                                If you already have an account, {<Link to="/login">Login</Link>} here
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Register