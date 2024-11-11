const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', express.static(path.join(__dirname, 'static')));
const filePath = path.join(__dirname, 'static/users.json')


app.get('/', (req, res) => {
    res.send('Welcome to my webpage')
})

app.get('/welcome', (req, res) => {
    res.json({message:'Welcome to the land of greatness wonderful user'});
});

app.get('/users', (req, res) => {
    
    fs.readFile(filePath, "utf8", (err, file) => {
        if(err) {
            res.send('An error occured while reading the file');
            console.log(err);
        } else{
            try {
                const data = JSON.parse(file);
                res.send(data);
            } catch (error) {
                res.status(500).send('Error parsing the data')
            }
        }
    })


});

app.get('/posts', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'))
})

app.post('/', (req, res) => {
    const info = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    fs.readFile(filePath, "utf8", (err, file) => {
        if(err) {
            // res.send('An error occured while reading the file');
            console.log(err);
        } else{
            try {
                const data = JSON.parse(file);
                data.push(info)
                // res.send(data);
                fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
                    if(err) {
                        res.send('Error occured while writing to file')
                    } else {
                        res.send("Submitted successfully")
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
    })
});

// making post requests via endpoints. But this should be used with postman
app.post('/:name/:email/:password', (req, res) => {
    const info = {
        name: req.params.name,
        email: req.params.email,
        password: req.params.password
    }

    fs.readFile(filePath, "utf8", (err, file) => {
        if(err) {
            // res.send('An error occured while reading the file');
            console.log(err);
        } else{
            try {
                const data = JSON.parse(file);
                data.push(info)
                // res.send(data);
                fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
                    if(err) {
                        res.send('Error occured while writing to file')
                    } else {
                        res.send("Submitted successfully")
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
    })
});

// handling invalid routes
app.get('*', (req, res) => {
    res.send('Oh sorry about that, the route does\'nt exist');
});

app.listen(3000);