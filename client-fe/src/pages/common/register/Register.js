import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./index.css";
import authApi from "../../../api/AuthApi";

function Register() {
  const initialValues = {
    username: "",
    password: "",
    fullName: "",
    active: 1,
    role: "poc",
    companyName: "",
    phoneNumber: "",
    email: "",
    tenantCode: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
    // full_name: Yup.string().required(),
    // companyName: Yup.string().required(),
    // phoneNumber: Yup.string().min(9).max(12).required()
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    // authApi.registerApi(data).then((response) => {
    //   console.log(data);
    //   if (response.data.error) {
    //     alert(response.data.error);
    //   } else {
    //     alert("Register success");
    //     navigate("/login");
    //   }
    // });
  };

  return (
    <div className="body">
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
                  name="username"
                  className="form-field"
                  placeholder="Tên đăng nhập"
                />
                <ErrorMessage
                  name="username"
                  component="span"
                  className="errorMsg"
                  render={(msg) => (
                    <span className="errorMsg">
                      Tên đăng nhập không được để trống
                    </span>
                  )}
                />
              </div>

              <div className="form-group">
                <Field
                  autoComplete="off"
                  type="password"
                  id="inputCreatePost"
                  name="password"
                  className="form-field"
                  placeholder="Mật khẩu"
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="errorMsg"
                  render={(msg) => (
                    <span className="errorMsg">
                      Mật khẩu không được để trống
                    </span>
                  )}
                ></ErrorMessage>
              </div>

              <div className="form-group">
                <Field
                  autoComplete="off"
                  id="inputCreatePost"
                  name="fullName"
                  className="form-field"
                  placeholder="Họ và tên"
                />
                <ErrorMessage
                  name="fullName"
                  component="span"
                  className="errorMsg"
                />
              </div>

              <div className="form-group">
                <Field
                  autoComplete="off"
                  id="inputCreatePost"
                  name="phoneNumber"
                  className="form-field"
                  placeholder="Số điện thoại"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="span"
                  className="errorMsg"
                />
              </div>

              <div className="form-group">
                <Field
                  autoComplete="off"
                  id="inputCreatePost"
                  name="email"
                  className="form-field"
                  placeholder="Mail"
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className="errorMsg"
                />
              </div>

              <div className="form-group">
                <Field
                  autoComplete="off"
                  id="inputCreatePost"
                  name="companyName"
                  className="form-field"
                  placeholder="Tên công ty"
                />
                <ErrorMessage
                  name="companyName"
                  component="span"
                  className="errorMsg"
                />
              </div>

              <div className="form-group">
                <Field
                  autoComplete="off"
                  id="inputCreatePost"
                  name="tenantCode"
                  className="form-field"
                  placeholder="Mã ban tổ chức"
                />
                <ErrorMessage
                  name="tenantCode"
                  component="span"
                  className="errorMsg"
                />
              </div>

              <button className="button" type="submit">
                Đăng ký
              </button>
              <div className="register">
                Nếu đã có tài khoản, hãy {<Link to="/login">Đăng nhập</Link>}{" "}
                tại đây
              </div>
            </Form>
          </Formik>
        </div>
        <div className="center"></div>
        <div className="center1"></div>
        <div className="center2"></div>
      </div>
    </div>
  );
}

export default Register;
