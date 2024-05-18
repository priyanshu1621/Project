import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { completed_orders } from '../utils/APIRoutes';

const Completed_orderTables = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get(completed_orders);
            setData(res.data.reverse()); // Reverse the array to display the last entry first
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h4 className='flex items-center justify-center text-x font-bold'>COMPLETED ORDER TABLES</h4>


            <div className="flex justify-center">
                <div className="overflow-x-auto rounded-lg border border-gray-200" style={{ minWidth: '600px' }}>
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-8 py-2 font-medium text-gray-900">Price</th>
                                <th className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">Quantity</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.slice(0, 5).map((d, index) => (
                                <tr key={index}>
                                    <td className="px-12 py-2">{d.price}</td>
                                    <td className="px-4 py-2">{d.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            <br></br>
            <br></br>
            <br></br>


        </div>
    );
};

export default Completed_orderTables;
