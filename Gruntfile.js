/**
 * author: zhaokunkun
 * 
 * Date: 2017/10/20
 */
module.exports = function(grunt) {
	grunt.initConfig({
		// 获取package.json信息
		pkg: grunt.file.readJSON("package.json"),

		// uglify 插件配置信息
		uglify: {
			options: {
				stripBanners: true,
				banner: "/*! jquery.crp.multipliableItem-<%=pkg.version%>.js <%= grunt.template.today('yyyy-mm-dd') %> */\n"
			},
			js: {
				src: "src/jquery.crp.multipliableItem.js",
				dest: "dist/jquery.crp.multipliableItem-<%=pkg.version%>.min.js"
			}
		},
		jshint: {
			js: ["Gruntfile.js", "src/jquery.crp.multipliableItem.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},
		// cssmin 插件的配置信息
		cssmin: {
			css: {
				src: "src/jquery.crp.multipliableItem.css",
				dest: "dist/jquery.crp.multipliableItem-<%=pkg.version%>.min.css"
			}
		}
	});
	// 加载对应插件
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-cssmin");

	// 输入grunt时做的事
	grunt.registerTask("default", ["jshint", "uglify", "cssmin"]);
};