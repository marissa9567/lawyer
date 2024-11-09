// src/components/Tracking.js
import React, { useState } from 'react';
import "../styles/Track.css";
const Tracking = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [trackingInfo, setTrackingInfo] = useState(null);
    const [error, setError] = useState('');

    const handleTrackingSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetchTrackingInfo(trackingNumber);
            setTrackingInfo(response);
        } catch (err) {
            setError('Tracking number not found or an error occurred.');
        }
    };

    // Simulated function to mimic fetching tracking info
    const fetchTrackingInfo = (number) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (number === '12345') {
                    resolve({ status: 'In Transit', estimatedDelivery: '2023-10-10' });
                } else {
                    reject('Not found');
                }
            }, 1000);
        });
    };

    return (
        <div>
            <h2>Track Your Order</h2>
            <form onSubmit={handleTrackingSubmit}>
                <input
                    type="text"
                    placeholder="Enter Tracking Number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    required
                />
                <button className='track-submit-button' type="submit">Track</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {trackingInfo && (
                <div>
                    <h3>Tracking Info:</h3>
                    <p>Status: {trackingInfo.status}</p>
                    <p>Estimated Delivery: {trackingInfo.estimatedDelivery}</p>
                </div>
            )}
        </div>
    );
};

export default Tracking;
