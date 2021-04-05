const express = require('express');
const {
    v4: uuidv4
} = require('uuid');
const fileUpload = require('express-fileupload');
const pdf_table_extractor = require("pdf-table-extractor");

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.use(fileUpload());

app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'Hello, World!'
    });
});

app.post('/upload', async (req, res) => {
    if (!req.files.file) {
        res.status(400).send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
        console.log(req.files.file);
        let filename = uuidv4();
        await req.files.file.mv('./uploads/' + filename);
        try {
            pdf_table_extractor('./uploads/' + filename, result => {
                res.send({
                    status: true,
                    message: `Parsed ${filename}`,
                    data: result
                });
            }, error => {
                console.log(error);
                res.status(500).send({
                    status: false,
                    message: `Failed to parse file ${filename}`
                });
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: false,
                message: `Failed to parse file ${filename}`
            });
        }
    }
});

app.listen(PORT, HOST);
console.log(`Listening on http://${HOST}:${PORT}`);