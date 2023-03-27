const httpStatus = require("http-status");
const config = require("../config/config");
const FormData = require("form-data");
const fs = require("fs");
const axios = require('axios');

const { API_KEY, API_DOMAIN } = config;

const createTune = (async (req, res) => {
  let formData = new FormData();

  const { fileName, name, title } = req.body;
  const fileNames = fileName.split(",");
  for (let fname of fileNames) {
    const file = fs.readFileSync("uploads/" + fname);
    formData.append("tune[images][]", file, fname);
  }
  formData.append('tune[name]', name);
  formData.append('tune[title]', title);
  formData.append('tune[callback]', 'https://optional-callback-url.com/to-your-service-when-ready');

  await axios({
    method: 'POST',
    url: API_DOMAIN + "/tunes",
    headers: {
      "Authorization": 'Bearer ' + API_KEY
    },
    data: formData
  }).then((res) => {
    console.log(res.data);
  }).catch((err) => {
    throw err;
  });

  res.status(httpStatus.OK).send({});
});

const getTunes = (async (req, res) => {
  let data;
  await axios({
    method: 'GET',
    url: API_DOMAIN + "/tunes",
    headers: {
      "Authorization": 'Bearer ' + API_KEY
    },
  }).then((res) => {
    data = res.data;
  }).catch((err) => {
    throw err;
  });

  res.status(httpStatus.OK).send({data});
});

const getPrompts = (async (req, res) => {
  const { id } = req.params;
  let data;
  await axios({
    method: 'GET',
    url: API_DOMAIN + "/tunes/" + id + "/prompts",
    headers: {
      "Authorization": 'Bearer ' + API_KEY
    },
  }).then((res) => {
    data = res.data;
  }).catch((err) => {
    throw err;
  });

  res.status(httpStatus.OK).send({data});
})

const createPrompt = ( async (req, res) => {
  const { id, promptText } = req.body;
  let formData = new FormData();
  formData.append('prompt[text]', promptText);
  formData.append('prompt[callback]', "https://localhost");

  await axios({
    method: 'POST',
    url: API_DOMAIN + "/tunes/" + id + "/prompts",
    headers: {
      "Authorization": 'Bearer ' + API_KEY
    },
    data: formData
  }).then((res) => {

  }).catch((err) => {
    throw err;
  });

  res.status(httpStatus.OK).send({});
})

module.exports = {
  createTune,
  getTunes,
  getPrompts,
  createPrompt
};
  