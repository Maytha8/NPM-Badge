# NPM-Badge
Nice NPM badge that works and is simple.

I was planning to put it on Heroku and keep maintaining it, but Heroku doesn't think the port was binded to, whatever I do, so ***this repository is in maintenance mode until further notice.*** If you think it's my code, you can see for yourself.

To install, use the following:
```sh
git clone https://github.com/Maytha8/NPM-Badge.git
cd NPM-Badge
npm install
npm start
```
The server will listen on `$PORT` or `0.0.0.0` if not specified.

## Routes
```
GET /{package}
```
package - A package or scoped package in the NPM registry. Scoped packages do not need to be url encoded.

Gives an SVG that can be used as a badge on a README.
