Angular Failed Requests
=======================

Angular Module to manage your failed requests.

This module is focused on **mobile development**, specially for phonegap apps (or any **HTML5 / Javascript** framework)  that you build using angular.
This module will help you to:
* Store failed requests when mobile devices lose connection
* Keep your app running as if nothing has happened and retry all your failed HTTP Requests later (when your app is loaded again)

In order to keep your app running correctly, **you should manage error cases** as them will be passed to your http requests, that is, you have to __control http error responses and keep them *hidden*__ to make believe the user everything went right and **improve the user experience** of your app. This means user won't have unwanted stops or halts using your app.


Upcomming Features
------------------
As this repository is focused to help manage failed requets these features are planned to be added soon:
1. Management of resolving failed requests
  * Resolving time (currently failed requests are retried when the app reloads)
2. Filters to catch desired requests by path.
3. Some other ideas that come as this project goes on...

Suggestions are welcome.

Requirements
------------
This module requires my [key-value-storage module](https://github.com/alejandrocarrasco/angular-key-value-storage) in order to work. You'll need ngCookies for this module to work.

Installation
------------
Add "ngCookies", "localStorage" and "failedRequestsManager" to your app modules list:
```
angular.module('MyApp', [ ... , 'localStorage', 'failedRequestsHandler', 'ngCookies' ])

<script type="application/javascript" src="lib/key-value-storage/key-value-storage.js"></script>
<script type="application/javascript" src="lib/failed-requests/failed-requests-handler.js"></script>
```

Usage
-----
Currently, by adding the 'failedRequestsHandler' module, all your non-read HTTP Requests which have failed will be stored. Automatically, when your app loads again, this module will retry the stored requests.

