// app.js
const express = require('express');
const cors = require('cors')
const pending_orders = require('./routes/pendingOrder');
const completed_orders = require('./routes/completePrder')
const orderRoutes = require('./routes/orderRoutes');
const bodyParser = require('body-parser'); // Import body-parser



const app = express();
const PORT = 3000;

// app.use(cors({
//    origin:`https://project-phi-blue.vercel.app`
// }))

app.use(cors({
   origin:`https://project-phi-blue.vercel.app`
}))

// Add body-parser middleware to parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/pending-order', pending_orders);
app.use('/complete-order', completed_orders);
app.use('/', orderRoutes);



app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});



