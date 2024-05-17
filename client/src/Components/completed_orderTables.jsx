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
                <h4 class='main-container '>COMPLETED ORDER TABLES</h4>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        { data.slice(0, 5).map((d, index) => (
                            <tr key={index}>
                                <td>{d.price}</td>
                                <td>{d.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Completed_orderTables;
