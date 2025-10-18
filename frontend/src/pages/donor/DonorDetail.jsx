import React from 'react'
import { useParams } from 'react-router-dom'
const DonorDetail = () => {
    const { donor_id } = useParams();
    return (
        <div><h1>Donor Id: {donor_id}</h1></div>
    )
}

export default DonorDetail