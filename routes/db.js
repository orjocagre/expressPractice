const fs = require('node:fs/promises');
const faker = require('faker');

(async function (path) {
  try {

    const category = [];

    for(let i=0; i<10; i++) {
      category.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.department(),
      })
    }


    const product = [];

    for (let index = 0; index < 1000; index++) {
      product.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        category: category[Math.floor(Math.random()*10)].id
      });
    }

    const user = [];
    for(let i=0; i<100; i++) {
      user.push({
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        job: faker.name.jobTitle()
      });
    }

    const db = {
      categories: category,
      products: product,
      users: user
    }
    const jsonString = JSON.stringify(db);
    await fs.writeFile(path, jsonString);
  } catch (e) {
    console.error(e + 'Error at generating the database');
  }
})('./db.json');


