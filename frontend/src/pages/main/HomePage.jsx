import React from 'react'
// import { useOutletContext } from 'react-router'
import Home from '../../Components/main/Home';
import { Outlet } from "react-router-dom";

const HomePage = () => {
    // const { response } = useOutletContext();
    return (
        <Home />
    )
}

export default HomePage