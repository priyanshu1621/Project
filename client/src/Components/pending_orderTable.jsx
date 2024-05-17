import React from 'react'
import { useEffect, useState } from 'react'
import { pending_orders } from '../utils/APIRoutes'
import axios from 'axios'
// Make sure to import your CSS file



const Pending_orderTable = () => {

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            // console.log("Before")
            // console.log("Printing the clg", pending_orders)

            const res = await axios.get(pending_orders);
            // console.log("result", res.data);


            setData(res.data);

        } catch (error) {
            console.error("Error fetching data:", error.message);
        }


    }

    useEffect(() => {
        fetchData();
    }, [])



    return (
        <div>

            <h4 className='flex items-center justify-center text-x font-bold'>PENDING ORDER TABLES</h4>



            <div className="flex justify-center">
                <div className="overflow-x-auto rounded-lg border border-gray-200 mx-4 sm:mx-6 lg:mx-8" style={{ minWidth: '600px' }}>
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Buyer_Qty</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Buyer_Price</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Seller_Price</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Seller_Qty</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.slice(0, 5).map((d, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2">{d.Buyer_Qty}</td>
                                    <td className="px-4 py-2">{d.Buyer_Price}</td>
                                    <td className="px-4 py-2">{d.Seller_Price}</td>
                                    <td className="px-4 py-2">{d.Seller_Qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>




            {/* <div class=''>


                <table class="table">
                    <thead>
                        
                        <tr>
                            <th scope="col">Buyer_Qty</th>
                            <th scope="col">Buyer_Price</th>
                            <th scope="col">Seller_Price</th>
                            <th scope="col">Seller_Qty</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data.slice(0, 5).map((d, index) => (
                                <tr key={index}>
                                    <td>{d.Buyer_Qty}</td>
                                    <td>{d.Buyer_Price}</td>
                                    <td>{d.Seller_Price}</td>
                                    <td>{d.Seller_Qty}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div> */}

        </div>
    )
}

export default Pending_orderTable





























// import React from 'react'
// import { useEffect, useState } from 'react'
// import { pending_orders } from '../utils/APIRoutes'
// import axios from 'axios'

// const Pending_orderTable = () => {

//     const [data, setData] = useState([]);

//     const fetchData = async () => {
//         try {
//             // console.log("Before")
//             // console.log("Printing the clg", pending_orders)

//             const res = await axios.get(pending_orders);
//             // console.log("result", res.data);

//             setData(res.data)

//         } catch (error) {
//             console.error("Error fetching data:", error.message);
//         }


//     }

//     useEffect(() => {
//         fetchData();
//     }, [])



//     return (
//         <div>

//             <div>

//                 <table class="table">
//                     <thead>
//                         <tr>
//                             <th scope="col">Buyer_Qty</th>
//                             <th scope="col">Buyer_Price</th>
//                             <th scope="col">Seller_Price</th>
//                             <th scope="col">Seller_Qty</th>
//                         </tr>
//                     </thead>
//                     <tbody>

//                         {
//                             data.map((d, index) => (
//                                 <tr key={index}>
//                                     <td>{d.Buyer_Qty}</td>
//                                     <td>{d.Buyer_Price}</td>
//                                     <td>{d.Seller_Price}</td>
//                                     <td>{d.Seller_Qty}</td>
//                                 </tr>
//                             ))
//                         }
//                     </tbody>
//                 </table>

//             </div>

//         </div>
//     )
// }

// export default Pending_orderTable