const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// SDK de Mercado Pago
const mercadopago = require('mercadopago');

//middleware

app.use(bodyParser.urlencoded({ extended: false }));

// Agrega credenciales
mercadopago.configure({
  access_token:
    'TEST-6173196905390209-112022-5ff6193a8bb7de849d305917452b75e5-57744358',
});

//routes
app.post('/checkout', (req, res) => {
  // Crea un objeto de preferencia

  let preference = {
    items: [
      {
        title: req.body.title,
        unit_price: parseInt(req.body.price),
        quantity: 1,
      },
    ],
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.redirect(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
});

//server

app.listen(3001, () => {
  console.log('Server on port 3001');
});
