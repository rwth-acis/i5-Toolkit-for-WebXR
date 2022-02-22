const glob = require('glob');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: glob.sync('./src/**.js').reduce(function(obj, el){
        obj[path.parse(el).name] = el;
        return obj
     },{}),
     output: {
       path: path.resolve(__dirname, 'dist'),
       filename: "[name].js"
     },
     resolveLoader: {
        modules: [
            path.join(__dirname, 'node_modules')
        ]
    },
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules')
        ]
    }
}