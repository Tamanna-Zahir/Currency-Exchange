const express = require('express');
const app = express();
const CC = require('currency-converter-lt');
const currencySymbolMap  = require('currency-symbol-map/map')
app.set("view engine", "ejs");
app.use(express.static("public"));
// root routes
app.get('/', (req, res) => {
  res.render('home')
});

app.get('/page1', async (req, res) => {
  let currencyConverter  =  new CC()
  res.render('page1', {"currencyCode": currencyConverter.currencyCode, "CC" : currencyConverter})
});


app.get('/page2', (req, res) => {
   let currencyConverter = new CC();
   let currencyNames = {};

   for (const currencyCode in currencyConverter.currencies) {
     const currencyName = currencyConverter.currencyName(currencyCode);
     currencyNames[currencyCode] = currencyName;
   }

   res.render('page2', {"currencies": currencyNames});
});


app.get('/page3', (req, res) => {
   let currencyConverter  =  new CC()
res.render('page3', {"currencyCode": currencyConverter.currencyCode})
});

app.get('/rates', async (req, res) => {
  
let from = req.query.currencyC;
  console.log("from" + from)
  const currencySymbol = currencySymbolMap[from];
  console.log(currencySymbol)
  const url = `https://v6.exchangerate-api.com/v6/2f37f7d40f9163a5c0ba1c85/latest/${from}`;

  let response = await fetch(url);
      let data = await response.json();
  res.render('rates', {"conversion_rates":data.conversion_rates, "lastUpdated":data.time_last_update_utc, "selected_currency":from, "currency_symbol":currencySymbol})
});
app.listen(3000, () => {
  console.log('server started');
});