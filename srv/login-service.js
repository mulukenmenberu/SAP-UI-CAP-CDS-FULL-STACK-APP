const cds = require("@sap/cds");

module.exports = cds.service.impl(async function (srv) {
    const db = await cds.connect.to('db');
    const {  Users } = db.entities;

    srv.on('Login', async(req)=>{
        
        const Email = req.data.input.username
        const Password = req.data.input.password

        const user = await db.read(Users).where({ Email, Password });

        if (user.length > 0) {
            // User found, return user information
            return { user: user[0] };
        } else {
            // User not found, return 'user not found' JSON
            return { message: 'User not found' };
        }

        // fetch data from users based on this username and password if existed return user information if not return usernot found json
        return req.data;
    })


});