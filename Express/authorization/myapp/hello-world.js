const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

//Respond to the post
app.post('/',(req,res) => {
    res.send('Got a Post Request')
})

//Respond to a PUT request on the root root(/),the applications homepage
app.put('/user' ,(req, res) => {
    res.send('Got a Put raquest at /user')
    
})
//Responding to the DELETE request to the /user route
app.delete('/user',(req, res) => {
    res.send('Got a DELETE request at /user')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})