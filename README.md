# TLS Notary Browser Extension - Instagram Plugin

This repository is a fork of the Twitter plgugin TLSNotary browser extension. This plugin proves ownership of an Instagram account.
If you want to know more about the plugin boilerplate, check the [original repository](https://github.com/tlsnotary/tlsn-plugin-boilerplate).

## Preview

![Preview](https://i.imgur.com/u4KYxIo.jpeg)
![Preview](https://i.imgur.com/ibLAILc.png)
![Preview](https://i.imgur.com/XR2tJyl.png)

## Running the Instagram Plugin

1. Build the `instagram_profile` plugin as explained below - or just refer to step 4 if you want to directly use instagram_profile.tlsn.wasm.
2. Build and install the `tlsn-extension` as documented in the [main README.md](../README.md).
3. [Run a local notary server](https://github.com/tlsnotary/tlsn/blob/main/notary-server/README.md), ensuring `TLS` is disabled in the [config file](https://github.com/tlsnotary/tlsn/blob/main/notary-server/config/config.yaml#L18).
4. Install the plugin: Click the **Add a Plugin (+)** button and select the `index.wasm` file you built in step 1. A **Instagram Profile** button should then appear below the default buttons.
5. Click the **Instagram Profile** button. This action opens the Instagram webpage along with a TLSNotary sidebar.
6. Run your own Instagram proxy - [Follow this tutorial](https://docs.tlsnotary.org/quick_start/tlsn-js.html?highlight=proxy#run-a-local-notary-server-and-websocket-proxy--optional) and run : docker run -it --rm -p 55688:80 novnc/websockify 80 instagram.com:443
7. Follow the steps in the TLSNotary sidebar.
8. Access the TLSNotary results by clicking the **History** button in the TLSNotary extension.

## Installation of Extism-js

**Download and Install Extism-js**: Begin by setting up `extism-js`, which enables you to compile and manage your plugins. Run these commands to download and install it:

```sh
curl -O https://raw.githubusercontent.com/extism/js-pdk/main/install.sh
sh install.sh
```

This script installs the Extism JavaScript Plugin Development Kit from its GitHub repository, preparing your environment for plugin compilation.

## Building the Instagram Profile Plugin

To build the plugin, run:

```sh
npm i
npm run build
```

This will output the wasm binary in `dist/index.wasm`.

## Contribution

_Contributions are welcome!_
If you would like to contribute to Magi, please follow these steps:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and commit them.
- Push your changes to your forked repository.
- Submit a pull request to the main repository.