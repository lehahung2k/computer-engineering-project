import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

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
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="formContainer">
                    <label>Username: </label>
                    <ErrorMessage name="username" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreatePost"
                        name="username"
                        placeholder="(Ex. Admin123...)"
                    />

                    <label>Password: </label>
                    <ErrorMessage name="passwd" component="span" />
                    <Field
                        autocomplete="off"
                        type="password"
                        id="inputCreatePost"
                        name="passwd"
                        placeholder="Your Password..."
                    />

                    <label>Full name: </label>
                    <ErrorMessage name="full_name" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreatePost"
                        name="full_name"
                        placeholder="Your Fullname..."
                    />

                    <button type="submit"> Register</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Register