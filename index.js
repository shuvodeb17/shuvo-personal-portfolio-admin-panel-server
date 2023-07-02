const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const port = process.env.port || 5000

// middleware
app.use(cors())
app.use(express.json())







const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.DB_PASS}@cluster0.b0yctrm.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const projectsCollection = client.db('shuvoPortfolio').collection('projects')


        app.post('/all-projects', async (req, res) => {
            const data = req.body;
            const result = await projectsCollection.insertOne(data)
            res.send(result)
        })

        app.get('/projects', async (req,res) => {
            const result = await projectsCollection.find().toArray()
            res.send(result)
        })

        app.get('/project/:id', async(req,res) => {
            const id = req.body._id
            const result = await projectsCollection.findOne(id)
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("database connected");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Shuvo portfolio')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
