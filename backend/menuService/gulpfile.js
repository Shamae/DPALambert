var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

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
})