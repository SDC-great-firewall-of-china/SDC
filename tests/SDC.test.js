const {MongoClient} = require('mongodb');
const axios = require('axios');
require('dotenv').config();
const _ = require('lodash');
const dbs = require('./../server/db.js');

describe('fields', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('sdc');
  });

  afterAll(async () => {
    await connection.close();
  });

  it('products table should have all expected values', async () => {
    const products = db.collection('products');
    const fields = ['id','campus','name','slogan','description','category','default_price','created_at','updated_at']
    const data = await products.findOne({id:37311});
    fields.forEach((field) => {
      expect(data).toHaveProperty(field);
    })
  });

  it('features table should have all expected values', async () => {
    const features = db.collection('features');
    const fields = ['id', 'product_id', 'feature', 'value']
    const data = await features.findOne({id:1});
    fields.forEach((field) => {
      expect(data).toHaveProperty(field);
    })
  });

  it('photos table should have all expected values', async () => {
    const photos = db.collection('photos');
    const fields = ['id', 'styleId', 'url', 'thumbnail_url']
    const data = await photos.findOne({id:1});
    fields.forEach((field) => {
      expect(data).toHaveProperty(field);
    })
  });

  it('photos table should have all expected values', async () => {
    const photos = db.collection('photos');
    const fields = ['id', 'styleId', 'url', 'thumbnail_url']
    const data = await photos.findOne({id:1});
    fields.forEach((field) => {
      expect(data).toHaveProperty(field);
    })
  });

  it('skus table should have all expected values', async () => {
    const skus = db.collection('skus');
    const fields = ['id', 'styleId', 'size', 'quantity']
    const data = await skus.findOne({id:1281158});
    fields.forEach((field) => {
      expect(data).toHaveProperty(field);
    })
  });

  it('styles table should have all expected values', async () => {
    const styles = db.collection('styles');
    const fields = ['id', 'productId', 'name', 'sale_price', 'original_price', 'default_style']
    const data = await styles.findOne({id:221010});
    fields.forEach((field) => {
      expect(data).toHaveProperty(field);
    })
  });
});

describe('api query', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('sdc');
  });

  afterAll(async () => {
    await connection.close();
  });

  it('products by id api call should return same as heroku api', async () => {
    var dbResult;
    await axios.get('http://localhost:3000/api/product')
      .then((results) => {
        dbResult = results.data;
        dbResult.created_at = null;
        dbResult.updated_at = null;
        return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/37315',  {
          headers: { Authorization: process.env.TOKEN }
        })
      })
      .then((results) => {
        var herokuResults = results.data;
        herokuResults.created_at = null;
        herokuResults.updated_at = null;
        expect(JSON.stringify(dbResult)).toEqual(JSON.stringify(herokuResults));
      })
  });

  it('images api call should return same as heroku api', async () => {
    var dbResult;
    await axios.get('http://localhost:3000/api/images')
      .then((results) => {
        dbResult = results.data;
        dbResult.created_at = null;
        dbResult.updated_at = null;
        return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/37315/styles',  {
          headers: { Authorization: process.env.TOKEN }
        })
      })
      .then((results) => {
        var herokuResults = results.data;
        herokuResults.created_at = null;
        herokuResults.updated_at = null;
        expect(JSON.stringify(dbResult)).toEqual(JSON.stringify(herokuResults));
      })
  }, 20000);
});

describe('db query times', () => {

  it('products should query item in last 10% in less than 50ms', async () => {
    await dbs.products.find({id: 10000000}).explain('executionStats')
     .then((results) => {
      expect(results.executionStats.executionTimeMillis).toBeLessThanOrEqual(50);
     })
 });

it('styles should query item in last 10% in less than 50ms', async () => {
  await dbs.styles.find({productId: 19000000}).explain('executionStats')
   .then((results) => {
     expect(results.executionStats.executionTimeMillis).toBeLessThanOrEqual(50);
   })
});

it('photos should query item in last 10% in less than 50ms', async () => {
  await dbs.photos.find({styleId: 5500000}).explain('executionStats')
   .then((results) => {
     expect(results.executionStats.executionTimeMillis).toBeLessThanOrEqual(50);
   })
});

it('skus should query item in last 10% in less than 50ms', async () => {
  await dbs.skus.find({styleId: 11000000}).explain('executionStats')
   .then((results) => {
     expect(results.executionStats.executionTimeMillis).toBeLessThanOrEqual(50);
   })
});

it('features should query item in last 10% in less than 50ms', async() => {
  await dbs.features.find({product_id: 2000000}).explain('executionStats')
   .then((results) => {
     expect(results.executionStats.executionTimeMillis).toBeLessThanOrEqual(50);
   })
});

});