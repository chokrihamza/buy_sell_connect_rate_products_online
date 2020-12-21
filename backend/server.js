/***Third step */
require('./config/dbConnect')();
//Admin bro const
const User = require('./models/User');
const Announce = require('./models/Announce');
const Profile = require('./models/Profile');
const AdminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');
const AdminBroExpress = require('@admin-bro/express');


/***End of Third step */
//@ etape 1
//touch server.js

const express = require('express');
const app = express();
const config = require('config');
const PORT = config.get('PORT');
// Express body parser
app.use('/imagesProduct', express.static('imagesProduct'));
app.use('/uploads', express.static('uploads'));
app.use('/assets', express.static('assets'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// create user route
app.use('/user', require('./Routes/user'));
//create profile routes
app.use('/profile', require('./Routes/profile'));

//create Announce routes
app.use('/announce', require('./Routes/announce'));

//using admin bro 
AdminBro.registerAdapter(AdminBroMongoose);
const AdminBroOptions = {
      resources: [User, Profile, Announce],
      rootPath: '/admin',
}

const adminBro = new AdminBro(AdminBroOptions);
const router=AdminBroExpress.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router);


app.listen(PORT, (err) => {
      err ? console.log(err) : console.log(`server running at port ${PORT}`)
})

//end of first step
//@ connect to the database mongoAtlas
//second step
//mkdir config 
