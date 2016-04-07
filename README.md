# transit on Barcelona


Data: http://opendata.bcn.cat/opendata/en/catalog/TRANSPORT/trams/


<road section identifier>#<date plus the hour, minutes and seconds>#<current status>#<expected status in 15 minutes>

status (0 = no data, 1 = very fluid, 2 = fluid, 3 = dense, 4 = very dense, 5 = congested, 6 = closed).


http://www.bcn.cat/transit/dades/dadestrams.dat



future experiments
```
"scripts": {
  "start": "watchify -d -t reactify src/index.js -o dist/bundle.js & serve",
  "test": "eslint src/*.js src/components/*.js src/components/**/*.js"
},

"devDependencies": {
  "eslint": "^0.16.2",
  "eslint-plugin-react": "^3.2.0",
  "hintify": "^0.1.0",
  "reactify": "^1.1.0",
  "serve": "^1.4.0",
  "watchify": "^2.4.0"
},
```

browserify

       --debug -d  Enable source maps that allow you to debug your files
                   separately.
--transform, -t  Use a transform module on top-level files.

**************************************************************************
# with reactify:

To install React DOM and build your bundle with browserify:

$ npm install --save react react-dom babelify babel-preset-react
$ browserify -t [ babelify --presets [ react ] ] main.js -o bundle.js

create index.js like this:
```
var React = require('react')

class Hello extends React.Component {

  render() {
    return <div>Hello, {this.props.name}!</div>
  }
}
```
$ browserify -t reactify main.js     
reactify transform activates for files with either .js or .jsx extensions.              
