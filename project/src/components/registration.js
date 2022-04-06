import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { BrowserRouter as AppRouter, Route, Switch, useNavigate  } from 'react-router-dom'



export default function Registration() {
  const schema = yup
    .object({
      user_name: yup.string().required("User name is required")
      .min(2, 'Too Short!')
     .max(30, 'Too Long!'),
      email: yup.string().required("email is required").email()
      .min(5, 'Too Short!')
     .max(30, 'Too Long!'),
      password: yup.string().required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
      confirm_password: yup.string().required("Confirm password is required")
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
      agree: yup.bool().oneOf([true], 'Checkbox selection is required'),
    })
    .required();

  const {
    register,
    handleSubmit, 
    setError,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {

    axios.post(`http://localhost:8000/registration`,{
      username: data.user_name,
      password: data.password,
      confirm_password: data.confirm_password,
      email: data.email
    })
      .then(res => {
        if(res.data.error !== "none"){
          if(res.data.error.username){
            setError("user_name", { type: "focus", message: 'Username is already exist' }, { shouldFocus: true });
          }
          if(res.data.error.email){
            setError("email", { type: "focus", message: 'Email is already exist' }, { shouldFocus: true });
          }
        }else{          
          navigate('/login')
        }
      })
      .catch(err => {
        console.log(err)
      })
  };
  // console.log(yup.ref("password"))

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <br></br>
      <div className="container h-99">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>
                    <form
                      className="mx-1 mx-md-4"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            {...register("user_name")}
                          />

                          <p style={{ color: "orangered" }}>{errors.user_name?.message}</p>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Your Email
                          </label>
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            {...register("email")}
                          />
                          <p style={{ color: "orangered" }}>{errors.email?.message}</p>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example4c"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            {...register("password")}
                          />
                          <p style={{ color: "orangered" }}>{errors.password?.message}</p>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example4cd"
                          >
                            Repeat your password
                          </label>
                          <input
                            type="password"
                            id="form3Example4cd"
                            className="form-control"
                            {...register("confirm_password")}
                          />
                          <p style={{ color: "orangered" }}>{errors.confirm_password?.message}</p>
                        </div>
                      </div>
                      <div className="form-check  justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          defaultValue
                          id="form2Example3c"
                          {...register("agree")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3"
                        >
                          I agree all statements in{" "}
                          <a href="#!">Terms of service</a>
                        </label>
                        <br/>
                        <p style={{ color: "orangered" }}>{errors.agree?.message}</p>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </section>
  );
}
