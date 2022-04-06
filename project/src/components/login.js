import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

export default function Login() {
  const schema = yup
    .object({
      user_name: yup
        .string()
        .required("User name is required"),
      password: yup
        .string()
        .required("Password is required"),
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

  const onSubmit = (data) => {
    axios.post(`http://localhost:8000/generate_token`,{
        username: data.user_name,
        password: data.password
      })
        .then(res => {
            console.log(res)
        //   if(res.data.error !== "none"){
        //     if(res.data.error.username){
        //       setError("user_name", { type: "focus", message: 'Username is already exist' }, { shouldFocus: true });
        //     }
        //     if(res.data.error.email){
        //       setError("email", { type: "focus", message: 'Email is already exist' }, { shouldFocus: true });
        //     }
        //   }else{          
        //     navigate('/login')
        //   }
        })
        .catch(err => {
          console.log(err)
          alert(err.response.data.detail)
        })
  }
  return (
    <>
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
                        Sign In
                      </p>
                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              User name
                            </label>
                            <input
                              type="text"
                              id="form3Example3c"
                              className="form-control"
                              {...register("user_name")}
                            />
                            <p style={{ color: "orangered" }}>
                              {errors.user_name?.message}
                            </p>
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
                            <p style={{ color: "orangered" }}>
                              {errors.password?.message}
                            </p>
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
                            Remember me{" "}
                          </label>
                          <a
                            href="#!"
                            className="text-body"
                            style={{ float: "right" }}
                          >
                            Forgot password?
                          </a>
                          <br />
                          <p style={{ color: "orangered" }}>
                            {errors.agree?.message}
                          </p>
                        </div>

                        <div className="d-flex mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        </div>
                        <p className="small fw-bold mt-2 pt-1 mb-0">
                          Don't have an account?{" "}
                          <a href="#!" className="link-danger">
                            Register
                          </a>
                        </p>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
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
    </>
  );
}
