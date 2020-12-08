const {
  index,
  getComic,
  getVolume,
  getCharacter,
  getChapter,
} = require("./controller");

const routes = (app) => {
  app.route("/").get(index);
  app.route("/comic").get(getComic);
  app.route("/comic/:id").get(getComic);
  app.route("/comic/:id/volumes").get(getVolume);
  app.route("/comic/:id/volumes/:volume_no").get(getVolume);
  app.route("/comic/:id/characters").get(getCharacter);
  app.route("/comic/:id/characters/:character_id").get(getCharacter);
  app.route("/comic/:id/chapters").get(getChapter);
  app.route("/comic/:id/chapters/:chapter_no").get(getCharacter);
};

module.exports = routes;
