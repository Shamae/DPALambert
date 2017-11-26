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

NodeJS API identity server middleware

    open administrative powershell
        install Python for Visual Studio Code
            https://www.python.org/downloads/release/python-2714/
        set python path
            npm config set python d:\Python27\python.exe
        install openSSL
            https://slproweb.com/products/Win32OpenSSL.html
    on the API service project
        npm install express-oidc-jwks-verify --save
        if not working include in package.json and "npm rebuild"

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