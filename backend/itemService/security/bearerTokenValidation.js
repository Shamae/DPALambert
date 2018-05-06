'use strict';
const _ = require('lodash');
const request = require('request');
const urlJoin = require('url-join');

// validates if token is valid
// TODO find a package that does this loacally!
function authorization(options) {
  if (!options) {
    throw new Error('Options are missing.')
  }

  if (!options.validationUri) {
    throw new Error('validationUri option is missing.')
  }

  if (!options.tokenParam) {
    throw new Error('tokenParam option is missing.')
  }

  return function (req, res, next) {
    if (_.some(options.unprotected, (route) => {
        return route === req._parsedUrl.pathname
      })) {
      return next();
    }

    if (req.headers.authorization) {
      // get bearer token
      let bearerToken = req.headers.authorization.substr(7);
      let tokenParam = `?${options.tokenParam}=${bearerToken}`;
      var uriIntrospect = urlJoin(options.validationUri, tokenParam);
      // set post options to introspection endpoint for token validation
      var postOptions = {
        url: uriIntrospect,
        headers: {
            'Authorization': 'Basic aXRlbUFwaTppdGVtc2VjcmV0',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        body : 'token=' + bearerToken
      };
      // token validation via identityserver
      request.post(postOptions, function (err, validationResponse, body) {
        if (err) {
          // failed to get validation response
          return res.status(500).send();
        }
        if (validationResponse.statusCode === 200) {
            // check if active
            if (JSON.parse(body).active) {
              // set userInfo
              req.session.userInfo = JSON.parse(body);
              // validation successful
              return next();
            }
        }
        return res.status(401).send()
      });
    } else {
      return res.status(401).send();
    }
  }
}

module.exports = authorization;