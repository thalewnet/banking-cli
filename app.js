const express = require('express');
const customerRoute = require('./routes/customerRoute');
const branchRoute = require('./routes/branchRoute');
const accountRoute = require('./routes/accountRoute');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/customers', customerRoute);
app.use('/branchs', branchRoute);
app.use('/accounts', accountRoute);

app.use((req, res, next) => {
  res.status(404).json({ message: 'this resource is not found' });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

app.listen('8787', () => {
  console.log('Server running on Port 8787');
});
