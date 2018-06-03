how to create a new service

Base (do once)
    install NodeJS
        https://nodejs.org/en/

    npm install gulp -g
        to run gulp via commandline
        NOTE: the service must contain file called gulpfile.js

For each service (execute the NPM comands via powershell/cmd in the folder of the new service)

    npm init
        follow installation instructions on screen
        creates node_modules folder and package.json file
    npm install express --save
        for routing and structure of the service
        --save puts a reference in package JSON file
    npm install gulp --save
        task runner
        gulp for testing and automatic refresh etc.
    npm install gulp-nodemon --save
        to be able to run our NodeJS server via gulp
    npm install cors --save
        for cors

Additional modules
    mongoose
        for MongoDB acces
    body-parser
        to parse the html body
    sinon, should, gulp-mocha
        for testing

make a certificate for identity server
    you need openSSL
        https://slproweb.com/products/Win32OpenSSL.html
        openssl req -x509 -days 365 -newkey rsa:4096 -keyout key.pem -out cert.pem
        openssl pkcs12 -export -in cert.pem -inkey key.pem -out cert.pfx

how to make the project run

requirements
    NodeJS
    .NET Core 2.0 (for identityService)

globally
    npm install gulp -g

for each service
    npm install (in the basefolder)

create DBs
    .\mongo.exe "[insert folder here]\create.js"