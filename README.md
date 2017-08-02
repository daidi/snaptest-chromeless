SnapTest Chromeless Harness


# Development (local) version (MAC)

## Installation:

Requirements 
- Node 8.2+ 
- [Chrome Canary](https://www.google.com/chrome/browser/canary.html) or have Chrome 60+

### In a different directory:
1. Clone [chromeless](https://github.com/graphcool/chromeless.git) into another directory
1. Install `npm install`
1. Build: `npm run build`
1. Link: `npm link`

### In this directory:

1. Link: `npm link`

# Running tests:

1. Make an alias to canary
	```alias canary="/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary"```
1. Launch Chrome with a debugger port open.  This process will need to stay open:
	```canary --remote-debugging-port=9222```
	or
	```chrome --remote-debugging-port=9222 --disable-gpu --headless```
1.  Run a single tests:
	```node example.js```
1.  Multiple tests: NOT SUPPORTED (someone needs to make a testing library on top of chromeless.)

---

# Running on lambda

1. Follow [the lambda steps on the official chromeless README](https://github.com/graphcool/chromeless#installation)
