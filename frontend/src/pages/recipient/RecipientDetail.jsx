import React from 'react'
import { useParams } from 'react-router-dom';
const RecipientDetail = () => {
    const { recipient_id } = useParams();
    return (
        <h1>Recipient Id: {recipient_id}</h1>
    )
}

export default RecipientDetail