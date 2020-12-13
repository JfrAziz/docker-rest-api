const connection = require("./db");
const {
  OK,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
} = require("./response");

const index = (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log(`[success] sending response / to ${ip}`);
    return OK({ message: "welcome" }, res);
  } catch (error) {
    console.log(`[error] ${error.message}`);
    return INTERNAL_SERVER_ERROR("internal server error", res);
  }
};

const getComic = (req, res) => {
  try {
    const { id } = req.params;
    const query = id
      ? `SELECT * FROM comic WHERE id = ${id}`
      : `SELECT * FROM comic`;
    connection.query(query, (error, rows) => {
      if (error) throw error;
      if (!rows.length) return NOT_FOUND({ message: "No comic found" }, res);
      return OK(rows, res);
    });
  } catch (error) {
    console.log(`[error] ${error.message}`);
    return BAD_REQUEST({ error: `${error.message}` }, res);
  }
};

const getVolume = (req, res) => {
  try {
    const { id, volume_no } = req.params;
    if (volume_no) {
      const query = `SELECT * FROM volume WHERE comic_id = ${id} AND volume_no = ${volume_no}`;
      connection.query(query, (error, rows) => {
        if (error) throw error;
        if (!rows.length)
          return NOT_FOUND({ message: "No volumes found" }, res);
        const query_chapter = `SELECT c.title, c.chapter_no, v.published_date FROM chapter c, volume v WHERE v.comic_id = ${id} AND v.volume_no = ${volume_no} AND v.id = c.volume_id`;
        connection.query(query_chapter, (error, data = []) => {
          if (error) throw error;
          const reponse = {
            volume: rows,
            chapters: data,
          };
          return OK(reponse, res);
        });
      });
    } else {
      const query = `SELECT * FROM volume WHERE comic_id = ${id}`;
      connection.query(query, (error, rows) => {
        if (error) throw error;
        if (!rows.length)
          return NOT_FOUND({ message: "No volumes found" }, res);
        return OK(rows, res);
      });
    }
  } catch (error) {
    console.log(`[error] ${error.message}`);
    return BAD_REQUEST({ error: `${error.message}` }, res);
  }
};

const getChapter = (req, res) => {
  try {
    const { id, chapter_no } = req.params;
    const query = chapter_no
      ? `SELECT c.title, c.chapter_no, v.volume_no, v.published_date FROM chapter c, volume v WHERE v.comic_id =  ${id} AND c.volume_id = v.id AND c.chapter_no = ${chapter_no}`
      : `SELECT c.title, c.chapter_no, v.volume_no, v.published_date FROM chapter c, volume v WHERE v.comic_id =  ${id} AND  c.volume_id = v.id`;
    connection.query(query, (error, rows) => {
      if (error) throw error;
      if (!rows.length) return NOT_FOUND({ message: "No chapter found" }, res);
      return OK(rows, res);
    });
  } catch (error) {
    console.log(`[error] ${error.message}`);
    return BAD_REQUEST({ error: `${error.message}` }, res);
  }
};

const getCharacter = (req, res) => {
  try {
    const { id, character_id } = req.params;
    const query = character_id
      ? `SELECT * FROM characters WHERE comic_id = ${id} AND id = ${character_id}`
      : `SELECT * FROM characters WHERE comic_id = ${id}`;
    connection.query(query, (error, rows) => {
      if (error) throw error;
      if (!rows.length)
        return NOT_FOUND({ message: "No character found" }, res);
      return OK(rows, res);
    });
  } catch (error) {
    console.log(`[error] ${error.message}`);
    return BAD_REQUEST({ error: `${error.message}` }, res);
  }
};

module.exports = {
  index,
  getComic,
  getVolume,
  getChapter,
  getCharacter,
};
