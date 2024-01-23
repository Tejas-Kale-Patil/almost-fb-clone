/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCurrentUser } from "../../redux/slice";
import { store } from "../../redux/store";

function Login() {
    let initialData = {
        email: "",
        pass: "",
    };
    let selector = store.getState().users;
    let [data, setData] = useState(initialData);
    let [errMsg, setErrMsg] = useState("");
    let navigate = useNavigate();
    let dispatch = useDispatch();
    async function handleLogin() {
        if(!data.email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )){
            setErrMsg('Enter valid email')
          }
          else{
            let reqData = await store.getState().users;
            let reqItem = reqData.filter(
                (item, index) => item.email === data.email
            );
    
            if (reqItem.length <= 0) {
                setErrMsg("Your Username and Password combination did not match");
            } else {
                if (
                    reqItem[0].email === data.email &&
                    reqItem[0].pass === data.pass
                ) {
                    await dispatch(addCurrentUser(reqItem[0]));
                    let strobj = JSON.stringify(reqItem[0]);
                    localStorage.setItem("user", strobj);
                    navigate("/feed");
                } else {
                    setErrMsg(
                        "Your Username and Password combination did not match"
                    );
                }
            }
          }
        
    }
    function handleOnChange(e) {
        let { name, value } = e.target;
        setErrMsg("");
        setData({ ...data, [name]: value });
    }
    return (
        <>
            <div className="container my-5">
                <div className="row">
                    <div className="card p-3 bg-secondary-subtle">
                        {errMsg === "" ? (
                            ""
                        ) : (
                            <div className=" fw-bold text-danger text-center alert-danger alert te">
                                {errMsg}
                            </div>
                        )}
                        <div className="col-8 align-self-center">
                            <div className="py-4">
                                <div
                                    htmlFor="exampleInputEmail1"
                                    className=" text-start"
                                >
                                    Email address
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleOnChange}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div>
                                <div
                                    htmlFor="exampleInputPassword1"
                                    className="text-start"
                                >
                                    Password
                                </div>
                                <input
                                    type="password"
                                    name="pass"
                                    onChange={handleOnChange}
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                />
                            </div>
                            <button
                                type="submit"
                                onClick={handleLogin}
                                className="btn btn-success my-2"
                            >
                                Login
                            </button>

                            <p>
                                I dont have account{" "}
                                <span
                                    className="text-primary"
                                    onClick={() => navigate("/signup")}
                                >
                                    Sign Up
                                </span>{" "}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
