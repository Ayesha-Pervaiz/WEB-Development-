//2-12-2023 Day-1 Done 
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI

// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

// Connect to the MongoDB server
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    // You can perform operations with the database here
    // For example, you can access databases and collections
    const database = client.db('sp21-bcs-091'); // Replace 'myDatabase' with your database name
    const collection = database.collection('car'); // Replace 'myCollection' with your collection name

    // Perform operations here (e.g., insert, update, delete)
    // For example, inserting a document
    const result = await collection.insertOne({ key: 'value' });
    console.log('Document inserted:', result.insertedId);
    
    // Close the connection when done
    await client.close();
    console.log('Connection closed');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

// Call the function to connect
connectToMongoDB();
