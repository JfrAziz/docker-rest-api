const OK = (values, res) => {
  const data = {
    status: 200,
    data: values,
  };
  res.status(200);
  res.json(data);
  res.end();
};

const BAD_REQUEST = (values, res) => {
  const data = {
    status: 400,
    data: values,
  };
  res.status(400);
  res.json(data);
  res.end();
};

const NOT_FOUND = (values, res) => {
  const data = {
    status: 404,
    data: values,
  };
  res.status(404);
  res.json(data);
  res.end();
};

const INTERNAL_SERVER_ERROR = (values, res) => {
  const data = {
    status: 500,
    data: values,
  };
  res.status(500);
  res.json(data);
  res.end();
};

module.exports = { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, NOT_FOUND };
