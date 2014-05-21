'use strict';

module.exports = function (grunt) {

    var fs = require("fs"),
        Util = {
            jsBasePath: 'src/',
            cssBasePath: 'themes/default/_css/',
            fetchScripts: function (readFile, basePath) {

                var sources = fs.readFileSync(readFile);
                sources = /\[([^\]]+\.js'[^\]]+)\]/.exec(sources);
                sources = sources[1].replace(/\/\/.*\n/g, '\n').replace(/'|"|\n|\t|\s/g, '');
                sources = sources.split(",");
                sources.forEach(function (filepath, index) {
                    sources[ index ] = basePath + filepath;
                });

                return sources;
            },
            fetchStyles: function () {

                var sources = fs.readFileSync(this.cssBasePath + "ueditor.css"),
                    filepath = null,
                    pattern = /@import\s+([^;]+)*;/g,
                    src = [];

                while (filepath = pattern.exec(sources)) {
                    src.push(this.cssBasePath + filepath[ 1 ].replace(/'|"/g, ""));
                }
                return src;
            }
        },
        packageJson = grunt.file.readJSON('package.json'),
        disDir = "../ueditor/",
        banner = '/*!\n * UEditor\n * version: ' + packageJson.name + '\n * build: <%= new Date() %>\n */\n\n';

    grunt.initConfig({
        pkg: packageJson,
        concat: {
            js: {
                options: {
                    banner: banner + '(function(){\n\n',
                    footer: '\n\n})();\n',
                    process: function (src, s) {
                        var filename = s.substr(s.indexOf('/') + 1);
                        return '// ' + filename + '\n' + src.replace('/_css/', '/css/') + '\n';
                    }
                },
                src: Util.fetchScripts("ueditor.all.js", Util.jsBasePath),
                dest: disDir + 'ueditor.all.js'
            },
            css: {
                src: Util.fetchStyles(),
                dest: disDir + 'themes/default/css/ueditor.css'
            }
        },
        copy: {
            base: {
                files: [
                    {
                        src: ['ueditor.config.js', '*.html', 'themes/iframe.css', 'themes/default/dialogbase.css', 'themes/default/images/**', 'dialogs/**', 'lang/**', 'third-party/**'],
                        dest: disDir
                    }
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', 'UEditor build', function () {
        grunt.task.run(['concat', 'copy']);
    });

};