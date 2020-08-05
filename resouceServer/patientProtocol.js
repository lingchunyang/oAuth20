/*
 *Endpoint to get Patient Protocol
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const tokenService = require("./jwtDecode");

const protocolSchema = new mongoose.Schema({
    userId: String,
    doctorId: String,
    visitDate: Date,
    description: String
});

const Protocol = mongoose.model('protocol', protocolSchema);

router.post('/protocol', tokenService.doctorGuard, (req, res) => {
    tokenService.getAccessToken(req.headers).then(token => {
        const protocol = new Protocol();
        protocol.userId = req.body.userId;
        protocol.description = req.body.description;
        protocol.visitDate = new Date();
        protocol.doctorId = token.username;
        protocol.save();
        res.send('Update Protocol');
    });
});

router.get('/protocol', tokenService.tokenGuard, async (req, res) => {
    if(req.query.userId){
        const users = await Protocol.find({ userId: req.query.userId }).exec();
        res.send(200, users);
    }
    res.send(500);
});

module.exports = router;