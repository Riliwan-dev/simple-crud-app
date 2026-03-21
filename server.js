const express = require('express')
const mongoose = require('mongoose');
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})

mongoose.connect("mongodb+srv://belloriliwan001_db_user:9zlftBqcaf1kHrrO@backenddb.2fximk0.mongodb.net/Node-Api?appName=BackendDb")
  .then(() => {
    console.log('Connected!')
  })
  .catch((error) => {
    console.log(error)
  })