import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import "./index.css"
import authApi from '../../api/AuthApi';

function Register() {
    const initialValues = {
        username: "",
        passwd: "",
        full_name: "",
        active: 1,
        role: 2,
        companyName: "",
        phoneNumber: ""
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        passwd: Yup.string().min(4).max(20).required(),
        full_name: Yup.string().required(),
        companyName: Yup.string().required(),
        phoneNumber: Yup.string().min(9).max(12).required()

    });

    const navigate = useNavigate();

    const onSubmit = (data) => {
        authApi.registerApi(data).then((response) => {
            console.log(data);
            if (response.data.error) {
                alert(response.data.error);
            } else {
                alert("Register success");
                navigate("/login");
            }
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
                                    autoComplete="off"
                                    id="inputCreatePost"
                                    name="username" className="form-field"
                                    placeholder="Username"
                                />
                                <ErrorMessage name="username" component="span" className='errorMsg' />
                            </div>

                            <div className='form-group'>
                                <Field
                                    autoComplete="off"
                                    type="password"
                                    id="inputCreatePost"
                                    name="passwd" className="form-field"
                                    placeholder="Password"
                                />
                                <ErrorMessage name="passwd" component="span" className='errorMsg' />
                            </div>

                            <div className='form-group'>
                                <Field
                                    autoComplete="off"
                                    id="inputCreatePost"
                                    name="full_name" className="form-field"
                                    placeholder="Fullname"
                                />
                                <ErrorMessage name="full_name" component="span" className='errorMsg' />
                            </div>

                            <div className='form-group'>
                                <Field
                                    autoComplete="off"
                                    id="inputCreatePost"
                                    name="companyName" className="form-field"
                                    placeholder="Your Company Name"
                                />
                                <ErrorMessage name="companyName" component="span" className='errorMsg' />
                            </div>

                            <div className='form-group'>
                                <Field
                                    autoComplete="off"
                                    id="inputCreatePost"
                                    name="phoneNumber" className="form-field"
                                    placeholder="Your phone number"
                                />
                                <ErrorMessage name="phoneNumber" component="span" className='errorMsg' />
                            </div>

                            <button className="button" type="submit"> Register</button>
                            <div className='register'>
                                If you already have an account, {<Link to="/login">Login</Link>} here
                            </div>
                        </Form>
                    </Formik>
                </div>
                <div className="center"></div>
                <div className="center1"></div>
                <div className="center2"></div>
            </div>
        </div>
    )
}

export default Register