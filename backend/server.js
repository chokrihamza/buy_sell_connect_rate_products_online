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
const cors = require('cors');
const path = require('path');
// Express body parser
//using admin bro 
AdminBro.registerAdapter(AdminBroMongoose);
const AdminBroOptions = {
      resources: [User, Profile, Announce],
      rootPath: '/admin',
      branding: {
            logo: "https://lh3.googleusercontent.com/ogw/ADGmqu8l_6pb5hLlrJaku18DIISO5cYyAyaDYS56ePDi1g=s32-c-mo",
            companyName: "AppVente",
            
            },
      }


// admin email&& password
const ADMIN = {
      email:'hamza@gmail.com',
      password:'hamza1994'
}

const adminBro = new AdminBro(AdminBroOptions);
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
      cookieName: 'admin-bro',
      cookiePassword: 'password',
      authenticate: async (email, password) => {
            if (email === ADMIN.email && password === ADMIN.password) {
                  return ADMIN
            }
            return null
      }


})
app.use(cors());
app.use(adminBro.options.rootPath, router);
app.use(express.json());

app.use('/imagesProduct', express.static('imagesProduct'));
app.use('/uploads', express.static('uploads'));
app.use('/assets', express.static('assets'));
app.use(express.urlencoded({ extended: true }));

// create user route
app.use('/user', require('./Routes/user'));
//create profile routes
app.use('/profile', require('./Routes/profile'));

//create Announce routes
app.use('/announce', require('./Routes/announce'));
const dirname = path.resolve();
if (config.get('NODE_ENV') === 'production') {
      app.use(express.static(path.join(dirname, '/client/build')));
      app.get('*', (req, res) => 
            res.sendFile(path.resolve(__dirname,'client','build','index.html'))
      )
}


app.listen(process.env.PORT||PORT, (err) => {
      err ? console.log(err) : console.log(`server running at port ${PORT}`)
})

//end of first step
//@ connect to the database mongoAtlas
//second step
//mkdir config 
