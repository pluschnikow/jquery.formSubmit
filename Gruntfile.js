module.exports = function(grunt) {

  grunt.initConfig({

    // Import package manifest
    pkg: grunt.file.readJSON("formSubmit.jquery.json"),

    // Banner definitions
    meta: {
      banner: "/*\n" +
        " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
        " *  <%= pkg.description %>\n" +
        " *\n" +
        " *  Made by <%= pkg.author.name %>\n" +
        " *  Under <%= pkg.licenses[0].type %> License\n" +
        " */\n"
    },

    // start a node server (for demo)
    connect: {
      demo: {
        options: {
          port: 9000,
          keepalive: false,
          base: 'demo'
        }
      },
      test: {
        options: {
          port: 9003,
          keepalive: false,
          base: '.'
        }
      }
    },

    qunit: {
      all: {
        options: {
          urls: [
            'http://localhost:9003/test/test.html',
          ]
        }
      }
    },

    // Copy task for demo
    copy: {
      demo: {
        files: [
          {expand: true, cwd: 'src/', src: ['jquery.formSubmit.js'], dest: 'demo/'},
        ]
      },
    },

    // Lint definitions
    jshint: {
      files: ["src/jquery.formSubmit.js"],
      options: {
        jshintrc: ".jshintrc"
      }
    },

    // Minify definitions
    uglify: {
      my_target: {
        src: ["src/jquery.formSubmit.js"],
        dest: "dist/jquery.formSubmit.min.js"
      },
      options: {
        banner: "<%= meta.banner %>"
      }
    },

    // watch for changes to source 
    watch: {
        files: ['src/*'],
        tasks: ['copy:demo']
    },

    // simulating Slow connection on port 9001
    throttle: {
      default: {
        remote_port: 9000,
        local_port: 9001,
        upstream: 10*1024,
        downstream: 10*1024,
        keepalive: false
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-throttle");
  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.registerTask("demo", ["jshint", "copy:demo", "connect","throttle:default", "watch"])
  grunt.registerTask("default", ["jshint", "uglify"]);
  grunt.registerTask('test', ['connect:test', 'qunit']);

};