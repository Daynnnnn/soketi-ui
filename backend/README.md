## Soketi Reborn - Upgraded to uWebSocket 20.43 and several Imrpovements.

As we all know that original Soketi project was not getting much of attention, i have been using Soketi heavily throughout my projects & i wanted to contribute to the community so that they can also utilize the latest improvements in Soketi. As of now i have upgraded the core of Soketi from uWebSocket 20.10 to 20.43 which is the last release upto today (14/03/2024).

I have added Subscription Count for all channel types and now WebHook will tell you about a channels subscribed user counts. 

Node is now upgraded to latest and in future releases we will stop using PM2 (actually in my builds i dont even now, but some user prefer it so its present.)

More changes will be coming soon. 
## Ready Made Docker Image 

For saving your time, i have compiled and created a Docker image which is available at (https://hub.docker.com/r/ehsanr91/soketi-reborn)

You can use `docker pull ehsanr91/soketi-reborn` to pull the image.

## Docker Compose Example with Custom config.
`
soketi:
    image: soketi-reborn:distrolessv4
    ports:
      - 6001:6001
      - 9601:9601
    environment:
      - SOKETI_DEBUG='-1'
      - DEFAULT_APP_ID='YOUR_APP_ID'
      - DEFAULT_APP_KEY='YOUR_APP_KEY'
      - DEFAULT_APP_SECRET='YOUR_APP_SECRET'
      - PUSHER_HOST='127.0.0.1'
      - PUSHER_PORT= '6001'
      - PUSHER_SCHEME='http'
      - METRICS_SERVER_PORT=9601
      - DEFAULT_APP_ENABLE_CLIENT_MESSAGES=false
      - METRICS_ENABLED= 1
      - SOKETI_CACHE_DRIVER=memory
      - HOME=/app/
    volumes:
      - ./config.json:/app/config.json
    command: ["/app/bin/server.js", "start", "--config=/app/config.json"]
    restart: unless-stopped
`

Alternatively you can modify the config.json file which actually loads the configuration, and Soketi will work with those configurations.

## Soketi can be now deployed on Cloudflare's infrastructure. 📣 

Ever dreamed about Serverless WebSockets? Soketi can be deployed to Cloudflare Workers. All around the world, closer to your users. Same Pusher protocol. 
Powered by Cloudflare's [Durable Objects](https://developers.cloudflare.com/workers/runtime-apis/durable-objects/) and [KV](https://developers.cloudflare.com/workers/runtime-apis/kv/), you can achieve great speeds at edge for your users.

Deploy fast Workers, use one of the fastest database available from Cloudflare and scale to infinity and beyond. 🚀

**[Start deploying Workers ➡️](https://dash.soketi.app/register)**

soketi
======

<img src="assets/logo.png" width="120" />

![CI](https://github.com/soketi/soketi/workflows/CI/badge.svg?branch=master)
[![codecov](https://codecov.io/gh/soketi/soketi/branch/master/graph/badge.svg)](https://codecov.io/gh/soketi/soketi/branch/master)
[![Latest Stable Version](https://img.shields.io/github/v/release/soketi/soketi)](https://www.npmjs.com/package/@soketi/soketi)
[![Total Downloads](https://img.shields.io/npm/dt/@soketi/soketi)](https://www.npmjs.com/package/@soketi/soketi)
[![License](https://img.shields.io/npm/l/@soketi/soketi)](https://www.npmjs.com/package/@soketi/soketi)

[![Artifact Hub](https://img.shields.io/endpoint?url=https://artifacthub.io/badge/repository/soketi)](https://artifacthub.io/packages/search?repo=soketi)
[![StandWithUkraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://github.com/vshymanskyy/StandWithUkraine/blob/main/docs/README.md)

[![Discord](https://img.shields.io/discord/957380329985958038?color=%235865F2&label=Discord&logo=discord&logoColor=%23fff)](https://discord.gg/VgfKCQydjb)

soketi is your simple, fast, and resilient open-source WebSockets server. 📣

### Blazing fast speed ⚡

The server is built on top of [uWebSockets.js](https://github.com/uNetworking/uWebSockets.js) - a C application ported to Node.js. uWebSockets.js is demonstrated to perform at levels [_8.5x that of Fastify_](https://alexhultman.medium.com/serving-100k-requests-second-from-a-fanless-raspberry-pi-4-over-ethernet-fdd2c2e05a1e) and at least [_10x that of Socket.IO_](https://medium.com/swlh/100k-secure-websockets-with-raspberry-pi-4-1ba5d2127a23). ([_source_](https://github.com/uNetworking/uWebSockets.js))

### Cheaper than most competitors 🤑

Compared with Pusher, you can achieve much more for less than one-third of the price.

For a $49 plan on Pusher, you get a limited amount of connections (500) and messages (30M).

With Soketi, for the price of an instance on Vultr or DigitalOcean ($5-$10), you get virtually unlimited connections, messages, and some more!

Soketi is capable to hold thousands of active connections with high traffic on less than **1 GB and 1 CPU** in the cloud. You can also [get free $100 on Vultr to try out soketi →](https://www.vultr.com/?ref=9032189-8H)

### Easy to use 👶

Whether you run your infrastructure in containers or monoliths, soketi got your back. There are multiple ways to [install](https://docs.soketi.app/getting-started/installation) and [configure](https://docs.soketi.app/getting-started/environment-variables) soketi, from single instances for development, to tens of active instances at scale with hundreds or thousands of active users.

### Pusher Protocol v7 📡

soketi implements the [Pusher Protocol v7](https://pusher.com/docs/channels/library\_auth\_reference/pusher-websockets-protocol#version-7-2017-11). Therefore, any Pusher-maintained or compatible client can connect to it, bringing a plug-and-play experience for existing applications that are already compatible with this protocol.

### App-based access 🔐

You and your users can access the API and WebSockets through [Pusher-like apps](https://docs.soketi.app/app-management/introduction) which serve keys and secrets to connect or authenticate requests for broadcasting events or checking channels statuses. soketi also comes built-in with support for DynamoDB and SQL-based servers like Postgres.

### Production-ready! 🤖

In addition to being a good companion during local development, soketi comes with the resiliency and speed required for demanding production applications.

### Built-in monitoring 📈

soketi just exposes the metrics to you, you just have to scrape them, whether it's a simple HTTP Client to pull the current usage, or you're using Prometheus to monitor all the connections.

## 🤝 Supporting

**soketi is meant to be free, forever. Having a good companion for developing real-time applications locally and in production should not involve any third-party and having a reliable websocket server to deploy behind a firewall makes soketi a compelling option for many applications.**

**Of course, like many open source software solutions, development is done by investing volunteer time into the project. Therefore, all donations are greatly appreciated. You can sponsor the development via **[**Github Sponsors**](https://github.com/sponsors/rennokki)**.**

## 📃 Documentation

[The entire documentation is available on Gitbook 🌍](https://rennokki.gitbook.io/soketi-docs/)

## 🌟 Stargazers

We really appreciate how this project turned to be such a great success. It will always remain open-source, free, and maintained. This is the real-time as it should be.

[![Stargazers over time](https://starchart.cc/soketi/soketi.svg)](https://starchart.cc/soketi/soketi)

## 🤝 Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## ⁉ Ideas or Discussions?

Have any ideas that can make into the project? Perhaps you have questions? [Jump into the discussions board](https://github.com/soketi/soketi/discussions) or [join the Discord channel](https://discord.gg/VgfKCQydjb)

## 🔒  Security

If you discover any security related issues, please email alex@renoki.org instead of using the issue tracker.

## 🎉 Credits

- [Alex Renoki](https://github.com/rennokki)
- [Pusher Protocol](https://pusher.com/docs/channels/library_auth_reference/pusher-websockets-protocol)
- [All Contributors](../../contributors)
