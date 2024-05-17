import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Home from './Components/Home';
import Pending_orderTable from './Components/pending_orderTable';
import Completed_orderTables from './Components/completed_orderTables';
import OrderForm from './Components/InputForm';
import { pending_orders } from './utils/APIRoutes';
import {completed_orders} from './utils/APIRoutes';

function App() {
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
        <BrowserRouter>
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
        </BrowserRouter>
    );
}

export default App;
