const express = require("express");
const router = express.Router();
const repositories = require("../models/repositories");

router.get("/", (request, response) => {
  response.send(repositories.find());
});

router.post("/", (request, response) => {
  try {
    const repository = repositories.create(request.body);
    response.status(201).send(repository);
  } catch (err) {
    response.status(400).send({ message: err.message });
  }
});

router.put("/:id", (request, response) => {
  try {
    const { id } = request.params;
    const { likes, ...fields } = request.body;
    response.status(200).send(repositories.update(id, fields));
  } catch (err) {
    response.status(400).send({ message: err.message });
  }
});

router.delete("/:id", (request, response) => {
  try {
    const { id } = request.params;
    repositories.delete(id);
    response.status(204).send();
  } catch (err) {
    response.status(400).send({ message: err.message });
  }
});

router.post("/:id/like", (request, response) => {
  try {
    const { id } = request.params;
    const old = repositories.findOne(id);
    const repository = repositories.update(id, {
      likes: old.likes + 1,
    });
    response.status(200).send(repository);
  } catch (err) {
    response.status(400).send({ message: err.message });
  }
});

module.exports = router;
