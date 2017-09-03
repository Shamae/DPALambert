var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

// starts server and restart on code change
gulp.task('default', function(){
    nodemon({
        script: 'tileServer.js',
        ext: 'js',
        env: {
            port: 8001
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log('Restarting Tile Server');
    });
})