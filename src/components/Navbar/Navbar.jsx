/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    let navigate = useNavigate()
    function handleLogout(){
        localStorage.clear()
        navigate('/')
    }
    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container d-flex justify-content-between">
                <h4 className="navbar-brand" href="#">Facebook </h4>
                {localStorage.getItem('user') ?  <button className="text-white btn btn-info" onClick={handleLogout}>logout</button>:''}
                </div>
            </nav>
        </>
    );
}

export default Navbar;
