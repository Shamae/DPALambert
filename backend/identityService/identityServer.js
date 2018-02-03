var express = require('express'),
cors = require('cors');

const Provider = require('oidc-provider');
const configuration = {
  // ... see available options /docs/configuration.md
};
const clients = [{
  client_id: 'worldMapClient',
  client_secret: 'testsecret',
  redirect_uris: ['http://lvh.me:8080/cb'],
  // + other client properties
}];
 
const oidc = new Provider('http://localhost:3333', configuration);
oidc.initialize({ clients }).then(function () {
  console.log(oidc.callback); // => express/nodejs style application callback (req, res)
  console.log(oidc.app); // => koa2.x application
});