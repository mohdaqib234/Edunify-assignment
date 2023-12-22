let express = require('express');
let app = express();
let mysql = require('mysql');
let bodyParser = require('body-parser');
let cors = require('cors');

const jsonParser = bodyParser.json();
app.use(cors());

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'add_school'
});

conn.connect(function(err){
    try {
        console.log("Database connected!");
    } catch (error) {
        console.log(error);
    }
})

app.post('/addSchool', jsonParser, async (req, res) => {
    try {
        const { name, address, city, state, number, image, mail } = req.body;
        // Convert base64 image to binary
        const imageBuffer = Buffer.from(image, 'base64');

        const query = `INSERT INTO addschool(name, address, city, state, number, image, email) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        await conn.query(query, [name, address, city, state, number, image, mail], () => {
            console.log("Data is stored!");
            res.status(201).send('Data is stored!');
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/showSchool',async(req,res)=>{
    await conn.query("SELECT * FROM addschool",function(error,data){
        res.send(data);
    });
});

app.listen(5000,()=>{
    console.log("Server started on PORT: 5000");
});