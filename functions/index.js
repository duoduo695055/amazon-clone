const functions = require("firebase-functions");
const express =require("express");
const cors=require("cors");
const stripe=require("stripe")('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')


//API

//-App Config
const app=express();

//-MiddleWares
app.use(cors({origin:true}));
app.use(express.json());

//-API routes
app.get('/', (request,response) =>response.status(200).send('Hello World'));
app.get('/duobao', (request,response) =>response.status(200).send('Hello duobao'));


app.post('/payments/create', async(request, response) => {
    const total=request.query.total;

    console.log('Payment Request Received>>>', total)

    const paymentIntent =await stripe.paymentIntents.create({
        amount:total,
        currency:"usd",
    });
    //ok -Created
    response.status(201).send({
        clientSecret:paymentIntent.client_secret,
    })

})

//-Listen Command
exports.api=functions.https.onRequest(app);

//Example Endpoint
//http://localhost:5001/challenge-7f107/us-central1/api