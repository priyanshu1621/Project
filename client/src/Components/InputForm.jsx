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




            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Order Input</h1>
                </div>

                <form class='form' onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    <div>
                        <label htmlFor="Buyer Quantity" className="sr-only">Buyer Quantity</label>

                        <div className="relative w-18">
                            <input
                                type="text"
                                id="buyerQuantity"
                                value={buyerQuantity}
                                placeholder="Buyer Quantity"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                onChange={(e) => setBuyerQuantity(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="Buyer Price" className="sr-only">Buyer Price</label>

                        <div className="relative">
                            <input
                                type="text"
                                id="buyerPrice"
                                value={buyerPrice}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Buyer Price"

                                onChange={(e) => setBuyerPrice(e.target.value)}
                            />


                        </div>
                    </div>

                    <div className="flex items-center justify-between ">

                        <button
                            type="submit"
                            className="inline-block rounded-lg bg-blue-500 px-5 py-3
                             text-sm font-medium text-white"
                        >
                            Order
                        </button>
                    </div>
                </form>
            </div>




        </div>
    );
};

export default OrderForm;
