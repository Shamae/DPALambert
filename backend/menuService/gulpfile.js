var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    supertest = require('supertest');

// starts server and restart on code change
gulp.task('default', function(){
    nodemon({
        script: 'menuServer.js',
        ext: 'js',
        env: {
            port: 8000
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log('Restarting');
    });
});

// test task for unit testing
gulp.task('test', function(){
    // setup test environement
    env({vars: {ENV: 'Test'}});
    // take all js test files
    gulp.src('tests/*.js', {read: false})
        // pipe into mocha (nyan for the looks)
        .pipe(gulpMocha({report: 'nyan'}))
});