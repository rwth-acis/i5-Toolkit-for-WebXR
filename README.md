# i5-Toolkit-for-WebXR
The i5 Toolkit for WebXR is a collection of utilities that help to develop WebXR applications that are build with three.js.

## Installation

## Usage

## Local Development Setup

## Tipical Development Scenarious

### See the Examples
To see the examples in your browser use the following steps:



### Adding a new Example
To a add a new example one should use the following steps:

1. Choose an [ExampleName].
2. Copy the JS file in ./examples/src/template.js and rename it ti [ExampleName].js.
3. Copy the HTML file in ./examples/public/template.html and rename it to [ExampleName].html.
4. In the head section of [ExampleName].html unncomment the script tag and set the correct name of the [ExampleName] reference to the dist folder.

The dist folder is the place where the bundled JS files, created by webpack, are stored. To create them one has to bundle each js files in source before seeing their changes reflected. So for each change you want to see represented in the examle you should do the following:

4. Open a terminal in the examples directory. 
`cd examples`
5. Bundle the src files.
`npm run build`

Afterward the changes are visible. You can follow the instructions in the See the Examples section to view the examples in your browser.

### Updating the version
To create publish a new version, first one needs to increse the version. This can be done by the command npm version patch. The module can then be published to npm via npm publish. This requires the npm account credentials.