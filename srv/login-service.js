const cds = require("@sap/cds");

const { generateJWT } = require('./utils/tokenHandler');



module.exports = cds.service.impl(async function (srv) {
    const db = await cds.connect.to('db');
    const {  Users } = db.entities;

    srv.on('Login', async(req)=>{
        
        const Email = req.data.input.username
        const Password = req.data.input.password

        const user = await db.read(Users).where({ Email, Password });

        if (user.length > 0) {
            const token = generateJWT(user[0]);
            user[0].token = token
            
            return { user: user[0] };
        } else {
            return { message: 'User not found' };
        }

        return req.data;
    })


});

/*
    const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent in the Authorization header
    const decodedData = decodeJWT(token);
    */