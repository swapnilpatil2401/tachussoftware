const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/append-data', (req, res) => {
    const newData = req.body;

    // Read the existing data from the JSON file
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }

        // Parse the existing data
        const jsonData = JSON.parse(data);

        // Append new data
        jsonData.push(newData);

        // Write the updated data back to the JSON file
        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing file');
            }
            res.send('Data appended successfully');
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
