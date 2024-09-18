const { MongoClient, ObjectId  } = require('mongodb');
const uri = "mongodb://localhost:27017";
const dbName = "tournament-team-manager";
const collectionName = "team";

async function connectToMongo() {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      console.log("Connecté à MongoDB");
      return client.db(dbName).collection(collectionName);
    } catch (error) {
      console.error('Erreur de connexion à MongoDB:', error);
      throw error;
    }
  }
  
  async function getAllTeams() {
    try {
      const collection = await connectToMongo(); 
      const teams = await collection.find().toArray();
      return teams;
    } catch (error) {
      console.error('Erreur lors de la récupération des équipes:', error);
      throw error;
    }
  }

  async function addTeam(teamName) {
    try {
      const collection = await connectToMongo();
      const result = await collection.insertOne({ name: teamName });
      return result.insertedId;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'équipe:', error);
      throw error;
    }
  }

  async function deleteTeam(teamId) {
    try {
      const collection = await connectToMongo(); 
      const result = await collection.deleteOne({ _id: new ObjectId(teamId) });
      if (result.deletedCount === 1) {
        console.log('Équipe supprimée avec succès');
        return true; 
      } else {
        console.log('Aucune équipe trouvée avec cet ID');
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'équipe:', error);
      throw error;
    }
  }


module.exports = { connectToMongo, getAllTeams, addTeam, deleteTeam, ObjectId}