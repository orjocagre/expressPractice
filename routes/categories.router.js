const express = require('express');
const router = express.Router();
const CategoriesService = require('./../services/category.services');
const service = new CategoriesService();
const validatorHandler = require('./../middlewares/validator.handler');

const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('./../schemas/category.schma');

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

router.get('/', async (req, res, next) => {
  try {
    res.status(200).json(await service.find());
  } catch(err) {
    next(err);
  }
});

router.get('/:id',
validatorHandler(getCategorySchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    res.status(200).json(await service.findOne(id));
  }
  catch( err ) {
    next(err);
  }
}
);

router.post('/', validatorHandler(createCategorySchema, 'body'), async (req, res, next) => {
  try {
    res.status(201).json(await service.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.patch('/:id',
validatorHandler(updateCategorySchema, 'params'),
validatorHandler(createCategorySchema, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    res.status(200).json(await service.update(id, body))
  }
  catch (err) {
    next(err);
  }
}
);


router.delete('/:id',
validatorHandler(getCategorySchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    res.status(200).json(await service.delete(id));
  }
  catch ( err ) {
    next(err);
  }
}
);


module.exports = router;
/*
pasos para crear una api rest con node y express


    inicializar npm (npm init -y)
    inicializar git (git init)
    crear el .gitignore (gitignore.io se selecciona node y los 3 S.O.)
    crear el .editorconfig sirve para configurar el editorconfig
    crear el .eslintrc.json sirve para las reglas de buenas practicas
    crear archivo inicial index.js

    creamos algunas tareas en package.json ("scripts")
      se levanta un enterno de desarrollo
        "dev": "nodemon index.js"
      start para iniciar con node ya en produccion
        "dev": "node index.js"
      correr linter que se va a asegurar de que se esten haciendo las buenas practicas
        "lint": "eslint"

    Instalar dependencias de desarrollo
      npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -D

    Probar en entornos de desarrollo y produccion
      npm run dev (se ve que se corre nodemon y que esta observando cambios en los archivos)
      npm run start ( se ejecuta directamente)

  Crear servidor en express

    instalar express como una dependencia de produccion
      npm i express

REST Representional State Transfer (get put post delete)






*/
