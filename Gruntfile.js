// Generated on 2017-05-19 using generator-angular 0.15.1
'use strict';

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        ngtemplates  : 'grunt-angular-templates',
        cdnify       : 'grunt-google-cdn'
    });

    // Configurable paths for the application
    var appConfig = {
        app    : require('./bower.json').appPath || 'app',
        dist   : 'dist',
        release: 'release'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower     : {
                files: [
                    'bower.json'
                ],
                tasks: [
                    'wiredep'
                ]
            },
            json      : {
                files: [
                    '<%= yeoman.app %>/**/*.json',
                    '!<%= yeoman.app %>/languages/*.concat.json'
                ],
                tasks: [
                    'languages'
                ]
            },
            js        : {
                files  : [
                    '<%= yeoman.app %>/**/*.js',
                    'Gruntfile.js'
                ],
                tasks  : [
                    'angularFileLoader',
                    'newer:jshint:all',
                    'newer:jscs:all'
                ],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest    : {
                files: ['test/spec/**/*.js'],
                tasks: [
                    'newer:jshint:test',
                    'newer:jscs:test',
                    'karma'
                ]
            },
            styles    : {
                files: ['<%= yeoman.app %>/**/*.css'],
                tasks: [
                    'newer:copy:styles',
                    'postcss'
                ]
            },
            less      : {
                files: ['<%= yeoman.app %>/**/*.less'],
                tasks: [
                    'less:main',
                    'newer:copy:styles',
                    'postcss'
                ]
            },
            gruntfile : {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files  : [
                    '<%= yeoman.app %>/**/*.html',
                    '.tmp/styles/**/*.css',
                    '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options   : {
                port      : 4444,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname  : 'localhost',
                livereload: 44444
            },
            livereload: {
                options: {
                    open      : true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect().use(
                                '/app/styles',
                                connect.static('./app/styles')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            test      : {
                options: {
                    port      : 4445,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist      : {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all    : {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/scripts/**/*.js'
                ]
            },
            test   : {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src    : ['test/spec/**/*.js']
            }
        },

        // Make sure code styles are up to par
        jscs: {
            options: {
                config : '.jscsrc',
                verbose: true
            },
            all    : {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/scripts/**/*.js'
                ]
            },
            test   : {
                src: ['test/spec/**/*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist   : {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/**/*',
                        '!<%= yeoman.dist %>/.git**/*'
                    ]
                }]
            },
            server : '.tmp',
            release: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp/release/**',
                        '<%= yeoman.release %>/**/*',
                        '!<%= yeoman.release %>/bower_components/**'
                    ]
                }]
            }
        },

        // Add vendor prefixed styles
        postcss: {
            options: {
                processors: [
                    require('autoprefixer-core')({browsers: ['last 1 version']})
                ]
            },
            server : {
                options: {
                    map: true
                },
                files  : [{
                    expand: true,
                    cwd   : '.tmp/styles/',
                    src   : '**/*.css',
                    dest  : '.tmp/styles/'
                }]
            },
            dist   : {
                files: [{
                    expand: true,
                    cwd   : '.tmp/styles/',
                    src   : '**/*.css',
                    dest  : '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            app : {
                src       : ['<%= yeoman.app %>/index.html'],
                ignorePath: /\.\.\//
            },
            test: {
                devDependencies: true,
                src            : '<%= karma.unit.configFile %>',
                ignorePath     : /\.\.\//,
                fileTypes      : {
                    js: {
                        block  : /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
                        detect : {
                            js: /'(.*\.js)'/gi
                        },
                        replace: {
                            js: '\'{{filePath}}\','
                        }
                    }
                }
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/scripts/**/*.js',
                    '<%= yeoman.dist %>/styles/**/*.css',
                    '<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= yeoman.dist %>/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html   : '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js : ['concat',
                                'uglifyjs'],
                            css: ['cssmin']
                        },
                        post : {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html   : ['<%= yeoman.dist %>/**/*.html'],
            css    : ['<%= yeoman.dist %>/styles/**/*.css'],
            js     : ['<%= yeoman.dist %>/scripts/**/*.js'],
            options: {
                assetsDirs: [
                    '<%= yeoman.dist %>',
                    '<%= yeoman.dist %>/images',
                    '<%= yeoman.dist %>/styles'
                ],
                patterns  : {
                    js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g,
                        'Replacing references to images']]
                }
            }
        },

        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        cssmin: {
            dist   : {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/**/*.css'
                    ]
                }
            },
            release: {
                files: [
                    {'<%= yeoman.release %>/styles/main.min.css': '.tmp/release/main.min.css'}
                ]
            }
        },

        uglify: {
            dist       : {
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': [
                        '<%= yeoman.dist %>/scripts/scripts.js'
                    ]
                }
            },
            releaseMain: {
                options: {
                    mangle: false // Avoid error with ui-router redirection (dependency renamed and not found...)
                },
                files  : {
                    '<%= yeoman.release %>/main.min.js': [
                        '<%= yeoman.app %>/**/*.js',
                        '.tmp/release/template.cache.js',
                        '!<%= yeoman.app %>/app.module.js',
                        '!<%= yeoman.app %>/app.config.js',
                        '!<%= yeoman.app %>/app.release.config.js',
                        '!<%= yeoman.app %>/app.run.js'
                    ]
                }
            },
            releaseApp : {
                files: {
                    '<%= yeoman.release %>/module.min.js': '<%= yeoman.app %>/app.module.js',
                    '<%= yeoman.release %>/config.min.js': '<%= yeoman.app %>/app.release.config.js',
                    '<%= yeoman.release %>/run.min.js'   : '<%= yeoman.app %>/app.run.js'
                }
            }
        },
        concat: {
            dist: {}
        },

        imagemin: {
            dist   : {
                files: [{
                    expand: true,
                    cwd   : '<%= yeoman.app %>/images',
                    src   : '**/*.{png,jpg,jpeg,gif}',
                    dest  : '<%= yeoman.dist %>/images'
                }]
            },
            release: {
                files: [{
                    expand: true,
                    cwd   : '<%= yeoman.app %>/images',
                    src   : '**/*.{png,jpg,jpeg,gif}',
                    dest  : '<%= yeoman.release %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd   : '<%= yeoman.app %>/images',
                    src   : '**/*.svg',
                    dest  : '<%= yeoman.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist   : {
                options: {
                    collapseWhitespace       : true,
                    conservativeCollapse     : true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA  : true
                },
                files  : [{
                    expand: true,
                    cwd   : '<%= yeoman.dist %>',
                    src   : ['*.html'],
                    dest  : '<%= yeoman.dist %>'
                }]
            },
            release: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace       : true,
                    removeAttributeQuotes    : true,
                    removeComments           : true,
                    removeCommentsFromCDATA  : true
                },
                files  : [
                    {
                        expand: true,
                        cwd   : '<%= yeoman.app %>',
                        src   : [
                            '**/*.html',
                            '!index.html',
                            '!index.release.html'
                        ],
                        dest  : '<%= yeoman.release %>'
                    }
                ]
            },
            index  : {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace       : true,
                    removeAttributeQuotes    : true,
                    removeComments           : true,
                    removeCommentsFromCDATA  : true
                },
                files  : [
                    {
                        expand: true,
                        cwd   : '<%= yeoman.app %>',
                        src   : [
                            'index.release.html'
                        ],
                        dest  : '<%= yeoman.release %>',
                        rename: function (dest, src) {
                            src = src.replace('release.', '');
                            return dest + '/' + src;
                        }
                    }
                ]
            }
        },

        ngtemplates: {
            dist   : {
                options: {
                    module : 'squareApp',
                    htmlmin: '<%= htmlmin.dist.options %>',
                    usemin : 'scripts/scripts.js'
                },
                cwd    : '<%= yeoman.app %>',
                src    : 'views/**/*.html',
                dest   : '.tmp/templateCache.js'
            },
            release: {
                options: {
                    module : 'squareApp',
                    htmlmin: '<%= htmlmin.release.options %>'
                },
                cwd    : '<%= yeoman.app %>',
                src    : [
                    '**/*.html',
                    '!index.html'
                ],
                dest   : '.tmp/release/template.cache.js'
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd   : '.tmp/concat/scripts',
                    src   : '*.js',
                    dest  : '.tmp/concat/scripts'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist     : {
                files: [{
                    expand: true,
                    dot   : true,
                    cwd   : '<%= yeoman.app %>',
                    dest  : '<%= yeoman.dist %>',
                    src   : [
                        '*.{ico,png,txt}',
                        '*.html',
                        'images/**/*.{webp}',
                        'styles/fonts/**/*.*'
                    ]
                },
                    {
                        expand: true,
                        cwd   : '.tmp/images',
                        dest  : '<%= yeoman.dist %>/images',
                        src   : ['generated/*']
                    }]
            },
            styles   : {
                expand: true,
                cwd   : '<%= yeoman.app %>/styles',
                dest  : '.tmp/styles/',
                src   : '**/*.css'
            },
            languages: {
                expand: true,
                cwd   : '<%= yeoman.app %>/languages',
                dest  : '<%= yeoman.release %>/languages/',
                src   : '*.json',
                rename: function (dest, src) {
                    src = src.replace('concat.', '');
                    return dest + src;
                }
            },
            other    : {
                expand: true,
                cwd   : '<%= yeoman.app %>',
                dest  : '<%= yeoman.release %>',
                src   : [
                    'robots.txt'
                ]
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test  : [
                'copy:styles'
            ],
            dist  : [
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun : true
            }
        },

        "merge-json": {
            i18n: {
                files: {
                    '<%= yeoman.app %>/languages/fr.concat.json': [
                        '<%= yeoman.app %>/**/*.fr.json',
                        'bower_components/cozen-lib/release/languages/fr.concat.json'
                    ]
                }
            }
        },

        angularFileLoader: {
            options: {
                scripts : [
                    '<%= yeoman.app %>/**/*.js',
                    '!<%= yeoman.app %>/**/*.tpl.js',
                    '!<%= yeoman.app %>/app.module.js',
                    '!<%= yeoman.app %>/app.config.js',
                    '!<%= yeoman.app %>/app.release.config.js',
                    '!<%= yeoman.app %>/app.run.js'
                ],
                startTag: 'start-js',
                endTag  : 'end-js'
            },
            index  : {
                src: ['<%= yeoman.app %>/index.html']
            }
        },

        less: {
            main   : {
                options: {
                    plugins: [
                        new (require('less-plugin-autoprefix'))()
                    ]
                },
                files  : [
                    {'<%= yeoman.app %>/styles/main.min.css': '<%= yeoman.app %>/styles/import.less'}
                ]
            },
            release: {
                options: {
                    plugins: [
                        new (require('less-plugin-autoprefix'))()
                    ]
                },
                files  : [
                    {'.tmp/release/main.min.css': '<%= yeoman.app %>/styles/import.less'}
                ]
            }
        },

        'string-replace': {
            release: {
                files  : [
                    {
                        expand: true,
                        cwd   : '<%= yeoman.release %>/styles',
                        src   : 'main.min.css',
                        dest  : '<%= yeoman.release %>/styles'
                    }
                ],
                options: {
                    replacements: [
                        {
                            pattern    : /..\/..\//g,
                            replacement: '../'
                        }
                    ]
                }
            }
        }
    });


    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build',
                'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'wiredep',
            'languages',
            'angularFileLoader',
            'less:main',
            'concurrent:server',
            'postcss:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'wiredep',
        'languages',
        'concurrent:test',
        'postcss',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'languages',
        'useminPrepare',
        'concurrent:dist',
        'postcss',
        'ngtemplates',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        // 'newer:jshint',
        // 'newer:jscs',
        'test',
        'build'
    ]);

    grunt.registerTask('release', [
        'clean:release',          // Delete the .tmp folder and release content folder
        'languages',              // Concat the languages files
        'less:release',           // Transform less to css and add them to the release folder
        'cssmin:release',         // Make the css better
        'ngtemplates:release',    // Transform all the .html as template
        'uglify:releaseMain',     // Copy and min all the js into the release folder
        'uglify:releaseApp',      // Copy and min the config, module and run js into the release folder
        'copy:languages',         // Copy the languages folder into the release folder
        'copy:other',             // Copy the other files into the release folder
        'htmlmin:index',          // Copy and min the index file into the release folder
        'string-replace:release', // Replace the absolute path in the css where url are pointing on images or fonts
        'imagemin:release'        // Copy and min all the images into the release folder
    ]);

    grunt.registerTask('languages', 'Languages task to compile the .json', [
        'merge-json:i18n'
    ]);
};
