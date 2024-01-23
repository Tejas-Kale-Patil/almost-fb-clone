/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../redux/store";
import {
    addCurrentUser,
    addUser,
    editUserData,
    sentRequest,
} from "../../redux/slice";

import { Button, ModalHeader, Modal } from "react-bootstrap";

function Feed() {
    let localData = localStorage.getItem("user");
    let dispatch = useDispatch();
    let selector = useSelector((state) => state.users);
    let currentUser = JSON.parse(localData);

    let [frndname, setfrndName] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [show, setShow] = useState(false);
    let [editData, setEditData] = useState(currentUser);

    function handleEditProfile() {
        setIsEdit(true);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleOnChange(e) {
        let { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    }
    function handleSubmit() {
        console.log(editData);
        console.log(currentUser);
        let changedData = selector.map((item, i) => {
            if (JSON.stringify(item) === JSON.stringify(currentUser)) {
                return editData;
            } else {
                return item;
            }
        });
        dispatch(editUserData(changedData));
        dispatch(addCurrentUser(editData));
        localStorage.setItem("user", JSON.stringify(editData));
        setIsEdit(false);
    }
    function acceptRequest(item, i) {
        let updateddata = store.getState().users.map((val, ind) => {
            if (JSON.stringify(val) === JSON.stringify(item)) {
                return {
                    ...val,
                    requests: val.requests.filter((ele, indx) => {
                        console.log(ele,indx);
                        return indx !== i;
                    }),
                };
            } else {
                return val;
            }
        });
        currentUser.requests.splice(i, 1);
        localStorage.setItem("user", JSON.stringify(currentUser));
        dispatch(sentRequest(updateddata));
        handleShow();
    }
    function reqSent(item, i) {
        let reqItem = store.getState().users;
        let updatedData = reqItem.map((val, i) => {
            if (JSON.stringify(val) === JSON.stringify(item)) {
                return { ...val, requests: [...val.requests, currentUser] };
            } else {
                return val;
            }
        });
        dispatch(sentRequest(updatedData));

        console.log(store.getState());
    }
    function deleteRequest(item, i) {
        let updateddata = store.getState().users.map((val, ind) => {
            if (JSON.stringify(val) === JSON.stringify(item)) {
                return { ...val, requests:val.requests.filter((ele,idx)=>i!==idx) };
            } else {
                return val;
            }
        });
        currentUser.requests.splice(i, 1);
        localStorage.setItem("user", JSON.stringify(currentUser));
        dispatch(sentRequest(updateddata));
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                  Request accepted successfully!!!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-12">
                        <h4>My Profile</h4>
                        <div className="card p-2 bg-body-tertiary">
                            <div className="d-flex justify-content-end">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleEditProfile}
                                >
                                    Edit Profile
                                </button>
                            </div>
                            <h3>
                                First Name :{" "}
                                <input
                                    type="text"
                                    name="fname"
                                    onChange={handleOnChange}
                                    className="p-2 form-control bg-transparent fw-medium"
                                    style={{ fontSize: "25px" }}
                                    disabled={isEdit === true ? false : true}
                                    value={editData.fname}
                                />
                            </h3>
                            <h3>
                                Last Name :{" "}
                                <input
                                    type="text"
                                    name="lname"
                                    onChange={handleOnChange}
                                    className="p-2 form-control bg-transparent fw-medium"
                                    style={{ fontSize: "25px" }}
                                    disabled={isEdit === true ? false : true}
                                    value={editData.lname}
                                />
                            </h3>
                            <h3>
                                Email :{" "}
                                <input
                                    type="text"
                                    name="email"
                                    onChange={handleOnChange}
                                    className="p-2 form-control bg-transparent fw-medium"
                                    style={{ fontSize: "25px" }}
                                    disabled={isEdit === true ? false : true}
                                    value={editData.email}
                                />
                            </h3>
                            <h3>
                                Phone Number :{" "}
                                <input
                                    type="text"
                                    name="phone"
                                    onChange={handleOnChange}
                                    className="p-2 form-control bg-transparent fw-medium"
                                    style={{ fontSize: "25px" }}
                                    disabled={isEdit === true ? false : true}
                                    value={editData.phone}
                                />
                            </h3>
                            <h3>
                                Requests :{" "}
                                {currentUser.requests &&
                                    currentUser.requests.map((item, i) => {
                                        return (
                                            <div
                                                className="alert alert-info"
                                                key={i}
                                            >
                                                <span>
                                                    {item.fname} {item.lname}
                                                </span>
                                                <button
                                                    className="btn btn-primary mx-2"
                                                    onClick={() =>
                                                        acceptRequest(item, i)
                                                    }
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        deleteRequest(item, i)
                                                    }
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        );
                                    })}
                            </h3>

                            {isEdit === true ? (
                                <button
                                    className="btn btn-success"
                                    style={{ width: "max-content" }}
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>

                    <div className="col-lg-4 col-12">
                        <h4>People You might Know</h4>

                        <div className="card p-1">
                            {selector.map((item, i) => {
                                if (item.email !== currentUser.email) {
                                    return (
                                        <div className="my-2" key={i}>
                                            <span>{item.fname} </span>
                                            <span> {item.lname}</span>
                                            <button
                                                className="btn btn-primary ms-2"
                                                onClick={() => reqSent(item, i)}
                                            >
                                                Add Friend
                                            </button>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Feed;
