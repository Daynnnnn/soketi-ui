Need to add following to index.d.ts in uWebSockets.js 

  /** Arbitrary user data may be attached to this object. In C++ this is done by using getUserData(). */
    [key: string]: any;



For starting using custom config:

    node bin/server.js start --config=./config.json


    

    