#Express Basics Demo Site

This repo features an express app to serve as demo in the Express Basics course on Treehouse.

## Quick Start
```
#clone the repo
git clone <this-repo>
cd <this-repo>

#install node dependencies
npm install

#view the app
#Note: to develop, see instructions below
node app
```

## Developing
```
#make sure you have some popular node tools installed
npm install -g nodemon
npm install -g node-inspector

#have nodemon run the app in one terminal tab
#nodemon will watch for file changes in the express app
#and restart the server
nodemon --debug app 

#run the debugger in another terminal
#node-debug will break the application when a break point
#or `debugger` statement is reached in the JavaScript
node-debug
```
