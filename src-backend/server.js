const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const api = require('./macCommandApi');

const port = 8000;

// --- asyc await handler
// app.post('/', async (req, res) => {
// --- then catch handler
app.post('/', (req, res) => {
    let ccsip = req.body.ccsip
    let deveui = req.body.deveui
    let bytes = req.body.bytes

    console.log(deveui)

    // --- then catch handler
    api.sendMacCommand(ccsip, deveui, bytes).then(data=>{
           res.send({response: 'ok'})
       }).catch(error=>{
           res.send({response: 'error'})
       })

    // --- asyc await handler
    // try {
    //     const result = await api.sendMacCommand(ccsip, deveui, bytes)
    //     console.log(result); 
    //     res.send({response: 'ok'})
    // } catch (error) {
    //     console.log('jeblug');
    //     res.send({response: 'error'})       
    // }
})

app.listen(port, () =>
    console.log(`listening on localhost:${port}`)
)