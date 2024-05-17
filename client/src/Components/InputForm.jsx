import React, { useState } from 'react';
import axios from 'axios';
import { search_seller_data } from '../utils/APIRoutes'; // Import the search_seller_data endpoint
import { useLocation } from 'react-router-dom';


const OrderForm = () => {
    const [buyerQuantity, setBuyerQuantity] = useState('');
    const [buyerPrice, setBuyerPrice] = useState('');
    const location = useLocation()

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {


            const formData = new FormData();
            formData.append('buyerQuantity', buyerQuantity);
            formData.append('buyerPrice', buyerPrice);


            // Send the form data to the backend for search using the imported endpoint
            const response = await axios.post(search_seller_data, {
                buyerQuantity,
                buyerPrice
            }
            );
            console.log(response.data); // Log the response from the backend
            // Reset the form fields
            setBuyerQuantity(''); 
            
            setBuyerPrice('');

            window.location.reload();

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (

        <div>
            <br></br>
            <br></br>
            

            <h4 class='main-container'>Order Form</h4>

            <br></br>
        
            <form class='form' onSubmit={handleSubmit}>

                <label htmlFor="buyerQuantity">Buyer Quantity:</label>
                <input
                    type="text"
                    id="buyerQuantity"
                    value={buyerQuantity}
                    onChange={(e) => setBuyerQuantity(e.target.value)}
                />
                <label htmlFor="buyerPrice">Buyer Price:</label>
                <input
                    type="text"
                    id="buyerPrice"
                    value={buyerPrice}
                    onChange={(e) => setBuyerPrice(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>


        </div>
    );
};

export default OrderForm;
