const express = require('express');
const path = require('path');
const app = express();
const port = 8000;


// servir todos os arquivos do diretorio /mnt/data
app.use('/', express.static('/mnt/data'));

app.listen(port, () => console.log(`Servidor rodando : https://localhost:${port}`));
