module.exports = function(grunt){
    
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'doctype-first': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'head-script-disabled': true,
                    'style-disabled': true
                },
                src: ['index.html']
            }
        },
        watch: {
            html: {
                files: ['index.html'],
                tasks: ['htmlhint']
            },
            js: {
                files: ['checkpoint.js'],
                tasks: ['uglify']
            }
        },
        uglify: {
            build: {
                files: {
                    'dist/js/checkpoint.min.js': ['checkpoint.js']
                }
            }
        },
        cssmin: {
            build: {
                src: 'checkpoint.css',
                dest: 'dist/css/checkpoint.min.css'
            }
        },
        less: {
            files: {
                "checkpoint.css": "checkpoint.less"
            }
        }
    });

    grunt.registerTask('default', []);

};