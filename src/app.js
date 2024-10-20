const express = require('express');
const app = express();
const port = 3000;

const controller = require("./controller");

app.use(express.json());


//Routes
app.get('/api/items', controller.getItems);
app.post('/api/items', controller.createItem);
app.put('/api/items/:id', controller.updateItem);
app.delete('/api/items/:id', controller.deleteItem);


//Start server
app.listen(port, () => {
    console.log(`PI is Running on http://localhost: ${port}`);

});

module.exports = app;
