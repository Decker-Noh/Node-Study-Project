
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<id>:<password>@cluster0.hqytr.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function main() {
    try {
        await client.connect();

        console.log("Mongo DB 접속 성공");

        const collection = client.db('test').collection('person');

        await collection.insertOne({name : "andy", age: 30});
        console.log("문서 추가 완료");

        const documents = await collection.find({name : "andy"}).toArray();
        console.log("찾은 문서 ", documents);

        await collection.updateOne({name : "andy"}, { $set: {age : 31}});
        console.log("문서 업데이트");

        const updateDocuments = await collection.find({name : "andy"}).toArray();
        console.log("갱신된 문서 ",updateDocuments);

        await collection.deleteOne({name : "andy "});
        console.log("문서 삭제");
    } finally {
        await client.close();
    }
}

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const testDB = client.db('admin').admin();
    const listDatabases = await testDB.listDatabases();
    console.log(listDatabases);
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
main();
