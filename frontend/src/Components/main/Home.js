import React from 'react'
import { Link, useOutletContext } from 'react-router-dom';
const Home = () => {
    const { publicAxiosInstance } = useOutletContext();
    return (
        <div>
            <h1>Home page </h1>
        </div>
    )
}

export default Home
 