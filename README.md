# <p align="center"><img height="100px" src="https://github.com/Zuckerwattederivat/sharestuff/blob/master/client/src/assets/logo/logo-primary.svg" /></p><br><p align="center">ShareStuff - A Rent And Let Communtiy Platform</p>

ShareStuff is a free to use platform to rent and let retail items. 
Registered users are able to search for retail items to rent anywhere in the world. They are also able to offer their own retail items for rent.
Transactions are completed via chat after booking an item. ShareStuff will not be taking part in the facilitation of transactions between users at this point.

This SPA is build with the MERN Stack. If any of you guys want to fork this project to build something similar or just need parts of it feel free to do so. :+1:

![Homescreen](https://github.com/Zuckerwattederivat/public/blob/master/sharestuff_media/homescreen.gif)


## Contents :file_folder:

* [Features](https://github.com/Zuckerwattederivat/sharestuff#features-gem)
* [Setup](https://github.com/Zuckerwattederivat/sharestuff#setup-wrench)
* [Support](https://github.com/Zuckerwattederivat/sharestuff#support-ambulance)
* [License](https://github.com/Zuckerwattederivat/sharestuff#license-scroll)

## Features :gem:

* Working and customizable rent and let platform
* Users can rent retail products from other users
* Users can rent retail products to other users
* Frontend was built with [React](https://github.com/facebook/react) and [Material-UI](https://github.com/mui-org/material-ui)
* Backend was built with [Express](https://github.com/expressjs/express)
* Backend was setup to use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud storage
* Database queries are facilitated with [Mongoose](https://github.com/Automattic/mongoose)

## Setup :wrench:

```
# clone the repositiory with git or github CLI
$ git clone https://github.com/Zuckerwattederivat/sharestuff.git
$ gh repo clone Zuckerwattederivat/sharestuff

# install dependencies server
$ cd sharestuff
$ npm install

# install dependencies client
$ cd sharestuff
$ npm run clientinstall

# connect your db and add jwt secret
$ cd sharestuff/config
$ open default.json
-> add your MongoDB Atlas database cluster link to "mongoURI"
-> add your random JSON Webtoken secret

# Geocode API Key from geocodeapi.com is needed for search functionality
$ cd sharestuff/client
$ touch .env.local
$ code .env.local
-> add REACT_APP_GEOCODE_API_KEY=<Your API Key>

# launch client and server in dev mode
$ cd sharestuff
$ npm run dev

```

## Support :ambulance:

Use the issue ticker to submit bugs or requests. :blush: <br>
If you want to contribute to this project you are very welcome to do so. :octocat: :metal:

## License :scroll:

This project is licensed under the [MIT license](https://github.com/Zuckerwattederivat/sharestuff/blob/master/LICENSE.md).
