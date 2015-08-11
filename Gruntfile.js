module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		/**
		 * Define structure paths
		 */
		paths: {
			'bower': 'bower_components',
			'dist': 'dist',
			'src': 'src',
			'tests': 'tests'
		},

		banner: '/*!\n' +
				' * <%= pkg.name %>\n' +
				' * Version: <%= pkg.version %>\n' +
				' * <%= pkg.description %>\n' +
				' * Author: <%= pkg.author %>\n' +
				' * Site: http://<%= pkg.homepage %>/\n' +
				' * Licensed under the MIT license\n' +
				' */\n' +
				'',

		jshint: {
			src: {
				options: {
					'-W099': true,
					expr: true
				},
				src: [
					'Gruntfile.js',
					'<%= paths.src %>/**/*.js',
					'<%= paths.tests %>/**/*.js'
				]
			}
		},

		jasmine: {
			src: {
				src: '<%= paths.src %>/**/*.js',
				options: {
					specs: '<%= paths.tests %>/specs/*Spec.js',
					helpers: '<%= paths.tests %>/helpers/*Helper.js',
					outfile: '<%= paths.tests %>/_SpecRunner.html',
					vendor: [
						'<%= paths.bower %>/jquery/dist/jquery.js',
						'<%= paths.bower %>/jasmine-jquery/lib/jasmine-jquery.js',
						'<%= paths.dist %>/glide.js'
					]
				},

			}
		},

		/**
		 * Merege all scripts into one file
		 * Warp concated files inside self-invoking anonymous function
		 */
		concat: {
			options: {
				separator: ';',
				banner: '<%= banner %>\n' +
						';(function($, window, document, undefined){\n' +
						'',
				footer: '\n})(jQuery, window, document);'
			},
			dist: {
				files: {
					'<%= paths.dist %>/glide.js': [
						'<%= paths.src %>/modules/*.js',
						'<%= paths.src %>/*.js'
					]
				}
			}
		},

		/**
		 * Minify concated files
		 */
		uglify: {
			dist: {
				options: {
					report: 'min',
					banner: '<%= banner %>',
					sourceMap: true,
				},
				files: [{
					'<%= paths.dist %>/glide.min.js': [
						'<%= paths.dist %>/glide.js'
					]
				}],
			}
		},

		/**
		 * Compile Less styles
		 */
		less: {
			options: {
				paths: [
					"<%= paths.bower %>/",
				]
			},
			normal: {
				files: {
					"<%= paths.dist %>/css/glide.core.css": '<%= paths.src %>/less/glide.core.less',
					"<%= paths.dist %>/css/glide.theme.css": '<%= paths.src %>/less/glide.theme.less',
				}
			},
			min: {
				options: {
					compress: true,
					report: 'min'
				},
				files: {
					"<%= paths.dist %>/css/glide.core.min.css": '<%= paths.src %>/less/glide.core.less',
					"<%= paths.dist %>/css/glide.theme.min.css": '<%= paths.src %>/less/glide.theme.less',
				}
			}
		},

		/**
		 * Conver LESS to SASS
		 */
		lessToSass: {
			convert: {
				files: {
					"<%= paths.src %>/sass/glide.core.scss": '<%= paths.src %>/less/glide.core.less',
					"<%= paths.src %>/sass/glide.theme.scss": '<%= paths.src %>/less/glide.theme.less',
				}
			}
		},

		/**
		 * Autoprefixer
		 * autoprefix CSS3
		 */
		autoprefixer: {
			dist: {
				files: {
					'<%= paths.dist %>/css/glide.core.css': '<%= paths.dist %>/css/glide.core.css',
					'<%= paths.dist %>/css/glide.core.min.css': '<%= paths.dist %>/css/glide.core.min.css',
					'<%= paths.dist %>/css/glide.theme.css': '<%= paths.dist %>/css/glide.theme.css',
					'<%= paths.dist %>/css/glide.theme.min.css': '<%= paths.dist %>/css/glide.theme.min.css'
				}
			 }
		},

		/**
		 * Set watch
		 */
		watch: {
			css: {
				files: ['<%= paths.src %>/**/*.{css,less,sass,scss}'],
				tasks: ['style']
			},
			js: {
				files: [
					'<%= paths.src %>/**/*.js',
					'<%= paths.tests %>/**/*.js'
				],
				tasks: ['script']
			}
		}
	});

	/**
	 * Register grunt tasks
	 */
	grunt.registerTask('default', [
		'style', 'script', 'watch'
	]);

	grunt.registerTask('style', [
		'less', 'autoprefixer'
	]);

	grunt.registerTask('script', [
		'jshint',
		'jasmine',
		'concat', 'uglify',
	]);

	grunt.registerTask('test', [
		'jshint',
		'jasmine'
	]);

};
