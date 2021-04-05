const express = require('express');
const {
    v4: uuidv4
} = require('uuid');
const fileUpload = require('express-fileupload');
const pdf_table_extractor = require("pdf-table-extractor");
const fs = require('fs');

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
        console.log(`Storing as ${filename}`);
        await req.files.file.mv('./uploads/' + filename);
        try {
            console.log(`Parsing ${filename}`);
            pdf_table_extractor('./uploads/' + filename, result => {
                console.log(`Parsing result: ${JSON.stringify(result)}`);
                res.send({
                    status: true,
                    message: `Parsed ${filename}`,
                    source: req.files.file.name,
                    data: result
                });
                console.log(`Deleting ${filename}`);
                fs.unlinkSync('./uploads/' + filename);
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