# i5-Toolkit-for-WebXR
The i5 Toolkit for WebXR is a collection of utilities that help to develop WebXR applications that are build with three.js.

## Installation

## Usage

## Local Development Setup


## Tipical Development Scenarious

### See the Examples
To see the examples in your browser use the following steps:

1. Install serve with `sudo npm install -g serve`
2. Go to the examples folder with `cd examples`
3. Serve the content on your PCs localhost with `serve`
4. When using serve with the devault configuration you can access the example landing page at: http://localhost:3000/public/

Some examples, especially those that use AR, can only be used on an AR enabled device like a phone.
Since WebXR required localhost or https to be accessable, the best way to see the examples quickly on your phone is the following:

5. Enter the development mode on your phone. For most Android phones this is done by clicking the build number 10 times.
6. Enable USB Debugging.
7. Connect USB phone via USB to your PC.
8. Open chrome://inspect#devices where you should now see your connected phone.
9. Enable port forwarding. You can for example forward the PCs localhost:3000 to localhost:5000 on your phone.
10. View the examples on your phone by visiting localhost:5000/public.

### Adding a new Example
To a add a new example one should use the following steps:

1. Choose an [ExampleName].
2. Copy the JS file in ./examples/src/template.js and rename it ti [ExampleName].js.
3. Copy the HTML file in ./examples/public/template.html and rename it to [ExampleName].html.
4. In the head section of [ExampleName].html unncomment the script tag and set the correct name of the [ExampleName] reference to the dist folder.
5. Add the information of the example in the example index page located at ./examples/public/index.html.

The dist folder is the place where the bundled JS files, created by webpack, are stored. To create them one has to bundle each js files in source before seeing their changes reflected. So for each change you want to see represented in the examle you should do the following:

6. Open a terminal in the examples directory. 
`cd examples`
7. Bundle the src files.
`npm run build`

Afterward the changes are visible. You can follow the instructions in the See the Examples section to view the examples in your browser.

### Updating the version
To update the version it is required to be logged in with an account that has the right to update the npm package.
When you have acces to such an account you can add it with `npm adduser`. Afterwards follow those steps to update the package at npm.

1. 