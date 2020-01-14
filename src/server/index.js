require('dotenv').config()
const express = require('express')
const massive = require('massive')

const app = express()

const { API_KEY } = process.env

app.listen(4000, () => {
  console.log('listening on 4000')
})