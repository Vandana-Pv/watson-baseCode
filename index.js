const express = require('express');
const app = express();
const watsonFulfilment = require('./routes/server')

app.use(express.json())
app.use(express.urlencoded({extended : true}));

app.use('/watsonFulfilment',watsonFulfilment)

const port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log(`Express app started on port ${port}`);
});