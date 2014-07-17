module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      all: ['Grunfile.js', 'src/js/**/*.js']
    },

    concat: {
      dist: {
        src: ['src/js/main.js', 'src/js/**/*.js'],
        dest: 'dist/temp/main.min.js'
      }
    },

    // clean
    clean: {
      build: {
        src: [ 'dist' ]
      },
      after: {
        src: [ 'dist/temp']
      },
  	  jsFiles: {
  		 src: [ 'dist/js']
  	  }
    },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
        mangle: false
      },
      build: {
        files: {
          'dist/js/main.min.js': 'dist/temp/main.min.js'
        }
      }
    },

    // compile less stylesheets to css -----------------------------------------
    less: {
      build: {
        files: {
          'dist/css/pretty.css': 'src/css/pretty.less'
        }
      }
    },

    // configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/css/Site.min.css': 'src/css/Site.css'
        }
      }
    },

    // configure watch to auto update ------------------------------------------
  	watch: {
  	  nodeFiles: {
        files: ['app.js'],
        tasks: ['express:dev'],
        options: {
          spawn: false
        }
      },
  	  staticFiles: {
  		files: ['src/**/*.css', 'src/**/*.html'],
          tasks: ['cssmin', 'less', 'copy:build'],
          options: {
            spawn: false
          }
  	  },	  
      jsFiles: {
        files: ['src/**/*.js'],
        tasks: ['jshint', 'clean:jsFiles', 'concat', 'copy:copyUnminJsFiles', 'clean:after', 'jasmine:runUnitTests'],
        options: {
          spawn: false
        }
      }
    },
	
  	express: {
      dev: {
        options: {
          script: './app.js'
        }
      }
    },
	
  	shell: {
  		mongodb: {
  			command: 'mongod --dbpath ./data',
  			options: {
  				async: true,
  				stdout: false,
  				stderr: true,
  				failOnError: true,
  				execOptions: {
  					cwd: '.'
  				}
  			}
  		},      
  		protractorStart: {			
  			command: 'protractor protractor.conf.js'
  		}
  	},

    copy: {
      build: {
        src: ['css/**', 'lib/**', 'templates/**', 'img/**', 'index.html'],
        expand: true,
        cwd: 'src',
        dest: 'dist',
      },
      copyUnminJsFiles: {
        src: ['dist/temp/main.min.js'],
        dest: 'dist/js/main.min.js'
      }
    },

    // jasmine tests via grunt-contrib-jasmine	
  	jasmine: {
		  runUnitTests: {
			  src: [
  				'dist/lib/js/angular.js',
  				'dist/lib/js/angular-mocks.js',
  				'dist/lib/js/angular-route.js',
  				'dist/lib/js/angular-animate.js',
  				'dist/lib/js/ui-bootstrap-0.10.0.js',
          'dist/lib/js/calendar.js',
  				'dist/js/**/*.js',
  				'!src/js/**/*.test.js'
			  ],
			  options: {
  				specs: 'test/unit/**/*.spec.js',
          outfile: 'test/test-results.html',
          keepRunner: true,
  				template: require('grunt-template-jasmine-istanbul'),
  				templateOptions: {
  					coverage: 'test/output/CoverageReport/coverage.json',                  
  					report: [
  					  {type: 'html', options: {dir: 'test/output/CoverageReport/'}},
  					  {type: 'cobertura', options: {dir: 'test/output/cobertura'}},
  					  {type: 'text-summary'}
  				  ]
  				}
			  }
		  }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
	  
    // not working
	  protractor: {
		  options: {
  			keepAlive: true,
  			configFile: "protractor.conf.js"
		  },
		  singlerun: {},
		  auto: {
  			keepAlive: true,
  			options: {
  			  args: {
  				seleniumPort: 4444
  			  }
  			}
		  }
	   }
  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-shell-spawn');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-template-jasmine-istanbul');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');

  // ===========================================================================
  // CREATE TASKS ==============================================================
  // ===========================================================================
  //grunt.registerTask('devBuild', ['jshint', 'clean:build', 'concat', 'cssmin', 'less', 'copy:build', 'copy:copyUnminJsFiles', 'clean:after', 'jasmine:runUnitTests']); 
  grunt.registerTask('devBuild', ['jshint', 'clean:build', 'concat', 'cssmin', 'less', 'copy:build', 'copy:copyUnminJsFiles', 'clean:after', 'karma']); 
  grunt.registerTask('prodBuild', ['jshint', 'clean:build', 'concat', 'uglify', 'cssmin', 'less', 'copy:build', 'clean:after']); 
  grunt.registerTask('startServer', ['shell:mongodb', 'express:dev', 'watch']);

  grunt.registerTask('default', function() {
    grunt.task.run('devBuild');
    grunt.task.run('startServer');
  });

  grunt.registerTask('prod', function() {
    grunt.task.run('prodBuild');
    grunt.task.run('startServer');   
  });

  grunt.registerTask('test', function() {
		grunt.task.run('devBuild');
    grunt.task.run('karma:unit');
		//grunt.task.run('jasmine:runUnitTests');
	});

  grunt.registerTask('e2e', function() {
    grunt.task.run('devBuild');
    grunt.task.run('express:dev');
    grunt.task.run('shell:protractorStart');
  });

};