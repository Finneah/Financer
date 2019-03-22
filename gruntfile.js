module.exports = function(grunt) {
    pkg: grunt.file.readJSON('package.json'),
        grunt.initConfig({
            jsdoc: {
                dist: {
                    src: [
                        './app/controller/*.js',
                        './app/renderer/*.js',
                        './app/classes/*.js'
                    ],
                    dest: './doc',
                    options: {
                        readme: './README.md'
                    }
                }
            },
            sass: {
                options: {
                    sourceMap: true
                },
                financer: {
                    files: {
                        './themes/css/financer.css': './themes/financer.scss'
                    }
                }
            },
            cssmin: {
                options: {
                    mergeIntoShorthands: false,
                    roundingPrecision: -1
                },
                dev: {
                    files: [
                        {
                            expand: true,
                            cwd: './themes/css',
                            src: ['*.css', '!*.min.css'],
                            dest: './app/resources/css',
                            ext: '.min.css'
                        }
                    ]
                }
            },
            watch: {
                scripts: {
                    files: ['./themes/*.scss'],
                    tasks: ['sass', 'cssmin'],
                    options: {
                        spawn: false
                    }
                }
            },
            clean: {
                yourTarget: {
                    src: ['./app/resources/css/*.css']
                }
            }
        });

    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('default', ['jsdoc']);

    grunt.registerTask('refresh', 'Sass to CSS', function() {
        grunt.log.writeln('Create CSS Files from SASS Soources');
        grunt.task.run('sass');
        grunt.task.run('cssmin');
    });
};
