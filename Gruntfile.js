/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['lib/**/*.js'],
        // the location of the resulting JS file
        dest: 'dist/pie-xapi.js'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task.
  grunt.registerTask('default', ['concat']);

};
