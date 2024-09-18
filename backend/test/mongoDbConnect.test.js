import { MongoClient, ObjectId } from 'mongodb';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectToMongo, getAllTeams, addTeam, deleteTeam } from '../mongoDbConnect'; // Assure-toi que ce chemin est correct

let mongoServer;
let uri;
let dbName;
let collectionName;
let client;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  uri = mongoServer.getUri();
  dbName = 'tournament-team-manager';
  collectionName = 'team';
  client = new MongoClient(uri);
  await client.connect();
});

after(async () => {
  await client.close();
  await mongoServer.stop();
});

describe('MongoDB Functions', () => {
  let collection;

  beforeEach(async () => {
    collection = client.db(dbName).collection(collectionName);
  });

  it('should connect to MongoDB', async () => {
    const result = await connectToMongo();
    expect(result).to.be.an('object');
    expect(result).to.have.property('find');
  });

  it('should get all teams', async () => {
    await collection.insertMany([{ name: 'Team A' }, { name: 'Team B' }]);
    const teams = await getAllTeams();
    expect(teams).to.be.an('array');
    expect(teams).to.have.lengthOf(2);
    expect(teams[0]).to.have.property('name').that.is.oneOf(['Team A', 'Team B']);
  });

  it('should add a team', async () => {
    const teamName = 'Team C';
    const teamId = await addTeam(teamName);
    const team = await collection.findOne({ _id: new ObjectId(teamId) });
    expect(team).to.be.an('object');
    expect(team).to.have.property('name').eql(teamName);
  });

  it('should delete a team', async () => {
    const { insertedId: teamId } = await collection.insertOne({ name: 'Team D' });
    const result = await deleteTeam(teamId.toString());
    expect(result).to.be.true;
    const team = await collection.findOne({ _id: teamId });
    expect(team).to.be.null;
  });

  it('should return false when deleting a non-existing team', async () => {
    const result = await deleteTeam(new ObjectId().toString());
    expect(result).to.be.false;
  });
});
