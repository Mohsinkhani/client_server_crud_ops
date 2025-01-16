const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
// const session = require('express-session');
const axios = require('axios');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

router.get('/list', function(req, res) {
  const apiUrl = 'http://192.168.100.193:4000/students';
  axios.get(apiUrl)
    .then(response => {
      const d = response.data;
      res.render('customerList', { items: d });
    })
    .catch(error => {
      console.log(error);
    });
});

// Use the router
app.use('/', router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Running at Port ${port}`);
});
