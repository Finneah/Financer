## Financer Documentation

### Use app (Build)

_Mac_
go to /builds/production
install financer.app

_Windows_
go to /builds/production
install financer.exe

_Linux_
Not supported at this moment

#### Features

-   add Revenues and Expences with click on "+" Btn
-   Select an Category, Interval and Period for the Entrys
-   see Overview for every Month
-   edit Entrys with double-click on the Entry
-   delete Entrys with right-click on the Entry

#### Set up development environment

1. install node _(version 8.10.0 or the LTS)_ [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
2. open Editor and CLI, browse to "Financer"
3. install npm (node package manager) `"npm install -g"`
4. install grunt global `"npm install grunt -g"`
5. install grunt cli global `"npm install grunt-cli -g"`
6. istall all packages `"npm install"`

#### Start app

_see "package.json"_

type `"npm start"` in CLI app path. In "package.json" is this defined => `"start": "electron ."`

#### Use grunt tasks

_see "gruntfile.js"_

to use the grunt tasks type the following commands in the CLI app path:

-   `"grunt"` => re-write the documentation for inline comments
-   `"grunt watch"`=> wait for changes in sass-files and compile sass to css, minified css to cssmin and delete css-files
-   `"grunt refresh"`=> refresh changes in sass-files and compile sass to css, minified css to cssmin and delete css-files

#### Build contruction

-   run `"npm run productionBuild"` or `"npm run testBuild"`
    _asar:false for testBuild. So you can see the Ressources_

#### Documentations and APIs

-   [electron documentation](https://electronjs.org/docs)
-   [npm node package manager](https://www.npmjs.com/features?gclid=CjwKCAiA693RBRAwEiwALCc3u2HzaZHdFwBUf9wAkrKpGftyCNJUMumlQo-YB--Im9NSODeR_4R1zRoCm54QAvD_BwE)
-   [grunt -javascript task manager](https://gruntjs.com/)
-   [electron builder API](https://www.electron.build/)
-   [Node js API](https://nodejs.org/api/index.html)

###### Autor: Jennifer Schnaible <jennifer.schnaible86@gmail.com> last Edit: 15.05.2018
