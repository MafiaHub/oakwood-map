# oakwood-map
A tiny resource with webmap displaying player positions

![](https://user-images.githubusercontent.com/2182108/64923695-10273b80-d7e5-11e9-9453-bffd0c3c1261.png)

Any improvements or suggestions in forms pull requests or issues are highly appreciated.

## Instructions

1. Clone the repo
2. Run `npm install` to install dependencies
3. Run `node index.js` to start

By default the resource is configured to run for the localhost server.
To change that and make it avaliable for others to see your webmap, you need to do few things:

1. Make sure to configure HTTP_PORT and WEBSOCKET_PORT in the `index.js`
2. Make sure to change URI for Websocket client in the `static/index.html`
    (you would need to provide a proper host and port so that other people would be able to connect)

## Credits

Map image is created by [djbozkosz](http://www.djborzkosz.wz.cz)
