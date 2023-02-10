var gulp = require( 'gulp' )
var fontSpider = require( 'gulp-font-spider' )

gulp.task('fontspider', function() {
    return gulp.src('./build/cns.html')
        .pipe(fontSpider())
})