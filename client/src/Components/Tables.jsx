import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderForm from './InputForm';
import Pending_orderTable from './pending_orderTable';
import Completed_orderTables from './completed_orderTables';
import { completed_orders, pending_orders } from '../utils/APIRoutes';


const Tables = () => {

    const [dataChanged, setDataChanged] = useState(false);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    useEffect(() => {
        fetchData();
    }, [dataChanged]);

    useEffect(() => {
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const fetchData = async () => {
        try {
            const pendingRes = await axios.get(pending_orders);
            const completedRes = await axios.get(completed_orders);
            setPendingOrders(pendingRes.data);
            setCompletedOrders(completedRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDataChange = () => {
        setDataChanged(prevState => !prevState);
    };

    const handleStorageChange = () => {
        setDataChanged(prevState => !prevState); // Trigger data change to reload the page
    };



    return (
        <div>
            <OrderForm onDataChange={handleDataChange} />
            <div>
                <br />
                <br />
                <br />
            </div>
            <Pending_orderTable pendingOrders={pendingOrders} />
            <div>
                <br />
                <br />
                <br />
            </div>
            <Completed_orderTables completedOrders={completedOrders} />
        </div>
    )
}

export default Tables