const gulp = require('gulp')
var data = require('gulp-data');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const nodemon = require('gulp-nodemon')
const debug = require('gulp-debug')

const PORT = process.env.PORT

/*
  Get data via database, keyed on filename.
  */
const static_posts = [
  {
    title: "First post", 
    content: "Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
  }, 
  {
    title: "Second post", 
    content: "Bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
  }, 
  {
    title: "Some ideas", 
    content: "Lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
  } 
];


gulp.task('db-test', function() {
  return gulp.src('views/index.pug')
    .pipe(data(function(file, cb) {
      MongoClient.connect('mongodb://localhost:27017/passport', function(err, db) {
        db.collection('posts').find().forEach(function(doc) {
          console.log(doc) // This logs each of my posts from the mongodb
        });
        debugger;
        if(err) return cb(err);
        cb(undefined, db.collection('posts').find());
      });
    }))

    .pipe(pug({
      locals: {posts: static_posts,error: "WTF"}
    }))
    .pipe(gulp.dest('./dist'))
});

//gulp.task('views', function buildHTML() {
  //return gulp.src('views/*.pug')
    //.pipe(rename(function (path) {
      //path.dirname = './'
      //path.extname = '.html'
    //}))
    //.pipe(pug({
      //debug: true,
      //locals: {error: "WTF"}
    //}))
    //.on('error', function(e){
      //console.log(e);
    //})
    //.pipe(debug())
    //.pipe(gulp.dest('src'))
//});

gulp.task('build', ['sass', 'fonts', 'images'])
gulp.task('serve', ['sass', 'fonts', 'images'], () => {

  browserSync.init({
    proxy: {
      target: "localhost:3000",
      proxyReq: [
        function(proxyReq) {
          proxyReq.setHeader('X-Forwarded-Host', 'localhost:8000');
        }
      ],
    },
    port: 8000,
    open: false,
    ui: {
      port: 8001
    },

  });

  gulp.watch(`./views/**/**/*.pug`).on('change', browserSync.reload);
  gulp.watch(`./src/**/**/*.sass`, ['sass']);
});

gulp.task('sass', () => {
  return gulp.src(`./src/stylesheets/*.sass`)
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(`./dist`))
    .pipe(browserSync.stream());
});
gulp.task('fonts', () => {
  return gulp.src(['./src/fonts/*.*'] )
    .pipe(gulp.dest('./dist/fonts'));
});
gulp.task('images', () => {
  return gulp.src(['./src/images/*.*'] )
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('nodemon', () => {
  nodemon({
    script: './server/server.js',
    ext: 'js html',
    watch: 'dist',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('default', ['serve', 'nodemon']);
