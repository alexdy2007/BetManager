var fs = require('fs');
var gulp = require('gulp'),   gp_concat = require('gulp-concat'),
    gp_del = require('del'),
    gp_order = require("gulp-order");

gulp.task('concatSeeds',['deleteSeeds'] ,function() {
         return gulp.src('seeders/*.sql')
            .pipe(gp_order([
                'user.sql',
                'accounttypes.sql',
                'sport.sql',
                'account.sql',
                'betstatus.sql',
                'bettype.sql',
                'resulttype.sql',
                'bookie.sql',
                'bookieaccount.sql',
                'betcase.sql',
                'bet.sql'
            ]))
            .pipe(gp_concat('allSeeds.sql', {newLine: '\n'}))
            .pipe(gulp.dest('./seeders/'));
});


gulp.task('deleteSeeds', function () {
    if( fs.existsSync('./seeders/allSeeds.sql')){
        console.log('Deleting allSeed.sql');
        return gp_del('./seeders/allSeeds.sql', {'force':true});
    } else {
        console.log('allSeed.sql does not exist');
        return
    }
});

gulp.task('populate', ['deleteSeeds', 'concatSeeds'], function () {
    return
});
