module.exports = function(grunt) {
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			glide: {
				options: {
					'-W099': true,
				},
				src: ['src/**/*.js']
			}
		},

		concat: {
			glide: {
				options: {
				    banner: '/*!\n' +
				    		' * <%= pkg.name %>\n' +
				    		' * Version: <%= pkg.version %>\n' +
							' * <%= pkg.description %>\n' +
							' * Author: <%= pkg.author %>\n' +
							' * Site: http://<%= pkg.homepage %>/\n' +
							' * Licensed under the MIT license\n' +
							' */\n' +
							''
				},
				src: 'src/jquery.glide.js',
				dest: 'dist/jquery.glide.js',
			},
		},

		uglify: {
			glidemin: {
				options: {
				    banner: '/*!\n' +
				    		' * <%= pkg.name %>\n' +
				    		' * Version: <%= pkg.version %>\n' +
							' * <%= pkg.description %>\n' +
							' * Author: <%= pkg.author %>\n' +
							' * Site: http://<%= pkg.homepage %>/\n' +
							' * Licensed under the MIT license\n' +
							' */\n' +
							'',
					report: 'gzip'
				},
				files: {
					'dist/jquery.glide.min.js': ['src/jquery.glide.js']
				}
			}
		},

		compass: {
			dist: {
				options: {
					sassDir: 'src/sass',
					cssDir: 'dist/css',
					environment: 'development',
					noLineComments: true
				}
			}
		},

		watch: {
			js: {
				files: ['src/**/*.js'],
				tasks: [
					'jshint',
					'concat',
					'uglify'
				],
			},
			sass: {
				files: ['src/**/*.scss'],
				tasks: [
					'compass'
				]
			}
		},
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', [
		'jshint',
		'concat',
		'uglify',
		'compass',
		'watch'
	]);
}
