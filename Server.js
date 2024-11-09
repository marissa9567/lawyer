require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); // Add this for MongoDB

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true,
}));
app.use(bodyParser.json({
    verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    }
}));

// Connect to your MongoDB database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err.message); // Log the error message
        process.exit(1); // Exit the process with a failure code
    });

// Example post schema (replace with your actual schema)
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    imageUrl: String,
    // Add other fields as needed
});

const Post = mongoose.model('Post', postSchema); // Replace 'Post' with your model name

// Email setup
const transporter = nodemailer.createTransport({
    service: 'yahoo', // or your email provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Endpoint to create a PaymentIntent
app.post('/create-payment-intent', async (req, res) => {
    const { amount, customerEmail } = req.body; // Retrieve email here

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            receipt_email: customerEmail, // Set the receipt email here
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send(error.message);
    }
});

// Webhook endpoint for handling Stripe events
const endpointSecret = process.env.WEBHOOK_SECRET;

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            const receiptEmail = paymentIntent.receipt_email; // Get the email
            const receiptMessage = `Thank you for your purchase! Amount: $${(paymentIntent.amount / 100).toFixed(2)}`;
            
            // Send receipt email
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: receiptEmail, // Use the email from the payment intent
                subject: 'Your Purchase Receipt',
                text: receiptMessage,
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log('Receipt sent to:', receiptEmail);
            } catch (error) {
                console.error('Error sending receipt email:', error);
            }
            break;
        case 'payment_intent.payment_failed':
            const paymentFailed = event.data.object;
            console.log('PaymentIntent failed:', paymentFailed);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
});

// Endpoint to fetch a post by ID
app.get('/api/posts/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId); // Fetch the post from the database

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Error fetching post', error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
