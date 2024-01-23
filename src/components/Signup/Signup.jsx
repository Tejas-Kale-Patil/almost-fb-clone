import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../../redux/slice'

function Signup() {
    let initialData={fname:'',
    lname:'',
    email:'',
    phone:'',
    pass:''
    }
    let [data,setData] = useState(initialData)
    let [errMsg,setErrmsg] = useState('')
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let selector = useSelector(state=>console.log(state))

    function handleOnChange(e){
        let {name,value} = e.target
        setErrmsg('')
        setData({
            ...data,[name]:value
        })
        console.log(value);
    }

    function handleSignup(){
        if(data.fname === '' ){
            setErrmsg('Enter valid first name')
        }
        else if(data.lname === '' ){
            setErrmsg('Enter valid last name')
        }
        else  if(data.phone === '' ){
            setErrmsg('Enter valid phone number')
        }
        else  if(data.email === '' ){
            setErrmsg('Enter valid email')
        }
        else  if(data.pass === '' ){
            setErrmsg('Enter valid password')
        }
        else{
            dispatch(addUser(data))
            setData(initialData)
            navigate('/')
        }
    }

  return (
    <div>
         <div className="container my-5">
                <div className="row">
                    <div className="card p-3 bg-secondary-subtle">
                       {errMsg === ''? '':  <div className=" fw-bold text-danger alert-danger alert te">{errMsg}</div>}
                        <div className="col-8 align-self-center">
                        <div className="py-4">
                                <div
                                    htmlFor="firstName"
                                    className=" text-start"
                                >
                                   First Name
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name='fname'
                                    value={data.fname}
                                    aria-describedby="firstName"
                                    placeholder="Enter First name"
                                    onChange={handleOnChange}
                                />

                            </div>
                            <div className="py-4">
                                <div
                                    htmlFor="lastName"
                                    className=" text-start"
                                >
                                   Last Name
                                </div>
                                <input
                                    type="text"
                                    name='lname'
                                    value={data.lname}
                                    className="form-control"
                                    id="lastName"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter Last Name"
                                    onChange={handleOnChange}

                                />

                            </div>
                            <div className="py-4">
                                <div
                                    htmlFor="mobilenumber"
                                    className=" text-start"
                                >
                                    Mobile Number
                                </div>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={data.phone}
                                    id="mobilenumber"
                                    name='phone'
                                    aria-describedby="emailHelp"
                                    placeholder="Enter mobile number"
                                    onChange={handleOnChange}

                                />

                            </div>
                            <div className="py-4">
                                <div
                                    htmlFor="exampleInputEmail1"
                                    className=" text-start"
                                >
                                    Email address
                                </div>
                                <input
                                    type="email"
                                    value={data.email}
                                    name='email'
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    onChange={handleOnChange}

                                />

                            </div>
                            <div className='py-4'>
                                <div htmlFor="exampleInputPassword1" className="text-start">
                                    Password
                                </div>
                                <input
                                    type="password"
                                    value={data.pass}
                                    name='pass'
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                    onChange={handleOnChange}

                                />
                            </div>
                            <button type="submit" onClick={handleSignup} className="btn btn-success my-2">
                                Signup
                            </button>
                            <p>I already have an account <span className="text-primary" onClick={()=>navigate('/')}>Login</span> </p>

                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Signup