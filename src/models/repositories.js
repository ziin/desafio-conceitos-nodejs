const { v4: uuid } = require("uuid");
const { NotFoundError } = require("../utils/errors");

let repositories = [];

module.exports = {
  find: () => repositories,

  findOne: (id) => {
    const repository = repositories.find((repo) => repo.id === id);
    if (!repository) {
      throw new NotFoundError("Repository");
    }
    return repository;
  },

  create: ({ title = "", url = "", techs = [] }) => {
    const repository = {
      id: uuid(),
      title,
      url,
      techs,
      likes: 0,
    };
    repositories.push(repository);
    return repository;
  },

  update: (id, fields) => {
    const index = repositories.findIndex((repo) => repo.id === id);
    if (index !== -1) {
      const old = repositories[index];
      const updated = {
        ...old,
        ...fields,
      };
      repositories = [
        ...repositories.slice(0, index),
        updated,
        ...repositories.slice(index + 1),
      ];
      return updated;
    }
    throw new NotFoundError("Repository");
  },

  delete: (id) => {
    const oldLength = repositories.length;
    repositories = repositories.filter((repo) => repo.id !== id);
    if (repositories.length !== oldLength - 1) {
      throw new NotFoundError("Repository");
    }
  },
};
