
const {Users,validate} = require ('../../../models/users');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

describe('user.generateAuthToken',()=>{
    it('should return a valid JWT token',()=>{
        const payload = {_id:new mongoose.Types.ObjectId().toHexString()}
        const user = new Users(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token,'jwtPrivateKey');
        expect(decoded).toMatchObject(payload);
    })
})