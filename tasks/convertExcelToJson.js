/**
 grunt-excel-as-json
 https://github.com/stevetarver/grunt-excel-as-json

 Copyright (c) 2015 Steve Tarver <steve.tarver@gmail.com>
 Licensed under the MIT license.
 */

'use strict';
var path = require('path');
var convertExcel = require('excel-as-json').processFile;

module.exports = function(grunt) {

  // Require our configuration to use Grunt Files Array Format http://gruntjs.com/configuring-tasks
  //  convertExcelToJson1: {
  //    dist: {
  //      files: [
  //        {src: 'data/row-oriented.xlsx', dst: 'tmp/row-oriented.json', isColOriented: false}
  //      ]
  //    },
  // so this.target will be 'dist' and this.data will be
  //  { "files": [
  //    {
  //      "src": [
  //        "data/row-oriented.xlsx"
  //      ],
  //      "dst": "tmp/row-oriented.json",
  //      "isColOriented": false
  //    }]}
  grunt.registerMultiTask('convertExcelToJson', 'Convert Excel files to JSON files', function() {
    // Is configuration sane?
    if(this.data.files === undefined) {
      grunt.fail.warn("convertExcelToJson: No files specified. Cannot continue. See configuration documentation (Files Array Format).");
      return false;
    }
    if(Object.prototype.toString.call( this.data.files ) !== '[object Array]') {
      grunt.fail.warn("convertExcelToJson: target 'files' object must be an Array, even if there is only one item. Cannot continue. See configuration documentation (Files Array Format).");
      return false;
    }

    var done = this.async();
    var fileCount = this.data.files.length;
    var filesProcessed = 0;

    this.data.files.forEach(function(f) {
      // Is configuration sane?
      if (!grunt.file.exists(f.src[0])) {
        grunt.fail.warn('convertExcelToJson: Source file "' + f.src[0] + '" not found. Cannot continue.');
        done();
        return false;
      }
      if (f.src.length > 1) {
        grunt.log.warn('convertExcelToJson: Multiple source files not supported: using only the first one.');
      }

      // Convert a single file asynchronously
      convertExcel(f.src[0], f.dst, f.isColOriented, function(err, data) {
        if(err) {
          grunt.fail.warn('excel-as-json error: ' + err);
        }
        else {
          grunt.log.writeln('Converted "' + f.src[0] + '" to "' + f.dst + '".');
        }
        // When the last file is processed, signal done
        if(++filesProcessed === fileCount) {
          done();
        }
      });
    });
  });

};
