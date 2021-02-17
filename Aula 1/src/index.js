const express = require('express');

const app = express();

app.get('/projetcs', (request, response) => {
    return response.json({msg:"hello world"});
});

app.listen(3333, () => console.log("Back-end iniciado! ☀"));