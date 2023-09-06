var jwt = require('jsonwebtoken')
require('dotenv').config();
const bcrypt = require('bcrypt');
const Client = require('../models/clientModel');

async function addClient(req, res) {
   const { name, email, password } = req.body;
   const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
   try {

      const hash = await bcrypt.hash(password, 12)
      const client = {
         name,
         email,
         password: hash,
         token,
         admin: false
      }

      console.log(client);
      const result = await Client.create(client);
      res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 });
      res.send(result);
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ message: 'An error occurred ' });
   }
}

async function checkLogin(req, res) {
   const { email, password } = req.body;

   try {
      const result1 = await Client.find({ email: email });
      console.log(result1)
      if (result1[0]) {
         bcrypt.compare(password, result1[0].password, (err, result) => {
            if (result) res.send(result1[0]);
            else res.send("Passwords don't match");
         })
      }
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ message: 'An error occurred' });
   }
}

module.exports = { addClient, checkLogin };