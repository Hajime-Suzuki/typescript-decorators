/* eslint-disable @typescript-eslint/no-var-requires */
const path = process.env.URL_PATH
const axios = require('axios')

axios
  .post(`http://localhost:4000/${path}/1234`, {
    key1: 'value1',
    key2: 'value2',
  })
  .then(({ data }) => console.log(data))
