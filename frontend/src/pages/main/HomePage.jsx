import React from 'react'
import { useOutletContext } from 'react-router-dom'
import Home from '../../Components/main/Home';

const HomePage = () => {
    const context = useOutletContext();
    return (
        <Home {...context} />
    )
}

export default HomePage