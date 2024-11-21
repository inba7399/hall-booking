const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;


app.use(bodyParser.json());


let bookings = [];


app.post('/book-room', (req, res) => {
    const { roomId, date, timeSlot } = req.body;

    if (!roomId || !date || !timeSlot) {
        return res.status(400).json({ message: 'Room ID, date, and time slot are required' });
    }

    const isBooked = bookings.some(
        booking => booking.roomId === roomId && booking.date === date && booking.timeSlot === timeSlot
    );

    if (isBooked) {
        return res.status(409).json({ message: 'Room is already booked for the specified date and time slot' });
    }

    bookings.push({ roomId, date, timeSlot });
    res.status(201).json({ message: 'Room booked successfully', booking: { roomId, date, timeSlot } });
});


app.get('/bookings', (req, res) => {
    res.status(200).json({ bookings });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
