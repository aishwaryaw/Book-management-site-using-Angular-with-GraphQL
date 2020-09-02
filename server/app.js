const express = require('express');
const graphqlHttp = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();

//allow cross-origin requests
app.use(cors());

mongoose.connect('mongodb url here',(err)=>
{
    if(err)
    console.log('Error');
    else
    console.log('connected to database')
});

app.use('/graphql', graphqlHttp({
    schema : schema,
    graphiql : true
}));



app.listen(3000 , ()=>{
    console.log('Server is started at 3000');
})
