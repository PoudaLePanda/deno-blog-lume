# deno-blog-lume
Bienvenue sur mon site personnel dédié au développement front-end fullstack JavaScript, propulsé par Deno et le moteur de blog Lume.


##Build the site
###Run the following to build your website:
```
deno task lume
```

##Start a local server
###Typically you will want to open the site in your browser so you can start a local server by adding the --serve (or -s) argument:
```
deno task lume --serve
```
This command initializes a local web server and starts watching changes of your site. So after changing anything, Lume will rebuild the site and reload your browser automatically with the new changes. The local server use the port 3000 by default but you can change it with the --port argument. For example:
```
deno task lume --serve --port=8000
```
To watch changes without starting a local server, use the --watch argument:
```
deno task lume --watch
```