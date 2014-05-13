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
            },
            css: {
                files: ['checkpoint.less'],
                tasks: ['less']
            }
        },
        
        // Compress javascript into dist folder
        uglify: {
            build: {
                files: {
                    'dist/js/checkpoint.min.js': ['checkpoint.js']
                }
            }
        },
        
        // Compress css into dist folder
        cssmin: {
            build: {
                src: 'checkpoint.css',
                dest: 'dist/css/checkpoint.min.css'
            }
        },
        
        // Compile css
        less: {
            development: {
                files: {
                    "checkpoint.css": "checkpoint.less",
                    "css/checkpoint.css": "checkpoint.less"
                }
            }
        }
    });

    // Register grunt tasks
    grunt.registerTask('default', []);
    
    // grunt task: compile and compress css into dist folder
    grunt.registerTask('buildcss',  ['less', 'cssmin']);

    grunt.registerTask('build',  ['less', 'cssmin', 'uglify']);

};