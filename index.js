const fallback = require('express-history-api-fallback')
const express = require('express')
const path = require('path')

const app = express()
const root = path.join(__dirname, 'dist')
const port = process.env.PORT || 3000

app.use(express.static(root))
app.use(fallback('index.html', { root }))
app.listen(port)
console.log(`Server running on port ${port}`)
