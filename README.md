[![tag:?](https://img.shields.io/github/tag/stevetarver/grunt-excel-as-json.svg)](https://github.com/stevetarver/grunt-excel-as-json/releases)
[![license:mit](https://img.shields.io/badge/license-mit-green.svg)](#license)
[![build:?](https://img.shields.io/travis/stevetarver/grunt-excel-as-json/master.svg)](https://travis-ci.org/stevetarver/grunt-excel-as-json)
<br>
[![npm:](https://img.shields.io/npm/v/grunt-excel-as-json.svg)](https://www.npmjs.com/package/grunt-excel-as-json)
[![dependencies:?](https://img.shields.io/david/stevetarver/grunt-excel-as-json.svg)](https://david-dm.org/stevetarver/grunt-excel-as-json.svg)
[![devDependency Status](https://david-dm.org/stevetarver/grunt-excel-as-json/dev-status.svg)](https://david-dm.org/stevetarver/grunt-excel-as-json#info=devDependencies)

# grunt-excel-as-json

> Convert Excel files to JSON files

## Getting Started
This plugin requires Grunt `~0.4.5` (soft requirement - previous versions of grunt have not been tested but should work).

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check 
out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) 
as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-excel-as-json --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-excel-as-json');
```

## The "convertExcelToJson" task

### Overview

Your Excel spreadsheet should contain a key row with JSON key paths and all remaining rows are values. You can transpose this organization and use a key column where all remaining columns are values. The JSON output is a list of keyed value rows/columns.

[excel-as-json](https://www.npmjs.com/package/excel-as-json) provides detailed instructions for configuring your Excel spreadsheets for use with this module.

Add a section named `convertExcelToJson` to your Gruntfile.

```js
grunt.initConfig({
  // ...
  convertExcelToJson: {
    dist: {
      files: [
        {src: <excel_file1>, dst: <json_file1>, isColOriented: false},
        {src: <excel_file2>, dst: <json_file2>, isColOriented: true}
      ]
    },
    test: {
      files: [
        {src: <excel_file3>, dst: <json_file3>, isColOriented: true}
      ]
    },
  },
});
```

This is a Grunt MultiTask using the Files Array Format so you must have targets like 'dist:' or 'test:', but they can be any name you choose. Each files section may have multiple entries.

### Files

#### files.src
Type: `String`

Path to the Excel file data source (xlsx only) 

#### files.dst
Type: `String`

Path to the JSON output file

#### files.isColOriented
Type: `Boolean`
Default: `true`
Indicates whether objects in this Excel file are stored as columns or rows


### Usage Examples

#### Standard Use

You have a static site project with a `data` directory containing Excel spreadsheets with pricing and item details. Your static site needs this data in JSON form and reads it from `public/data`. Every time you `grunt dist`, you want to refresh the JSON files.

This configuration converts the pricing data (row oriented), and item details (col oriented) to json files in `public/data`. Note that the row oriented Excel spreadsheet (pricing.xlsx) omits isColOriented - using the default of false.

```js
grunt.initConfig({
  convertExcelToJson: {
    dist: {
      files: [
    	 {src: 'data/pricing.xlsx', dst: 'public/data/pricing.json'},
    	 {src: 'data/item1.xlsx', dst: 'public/data/item1.json', isColOriented: true}
      ]
    }
  }
});
```

## TODO
- Add code coverage integration for coveralls or codecov

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
