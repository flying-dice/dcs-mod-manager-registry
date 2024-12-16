[![Join Discord](https://img.shields.io/badge/Join-blue?logo=discord&label=Discord)](https://discord.com/invite/3VudyeRa9h)
[![patreon](https://img.shields.io/badge/Patreon-Dcs%20Web%20Editor-red?logo=patreon)](https://patreon.com/DcsWebEditor)

![logo](index.png)

# DCS Web Viewer LiveMap

This is a moving map / F10 map alternative for DCS. It runs in any browser, and on any device ( PC / tablet / phone ). See it in action on youtube

![DCS Moving Map](https://img.youtube.com/vi/ROhuIJtxM_k/0.jpg)](https://www.youtube.com/watch?v=ROhuIJtxM_k)

## Features

- **Moving Map** Easily find your position, route, targets, friendlies, airports etc
- **Map Styles** Different map styles from VFR / IFR charts to terrain or satellite images.
- **Take Notes** Draw on the map and save / load notes
- **VR** Works in VR , see Installation

## Prerequisites

Chrome / Chromium browser is best supported, make sure you try these first. Firefox may also work. Other browser may not work.

## Installation

Unzip dcs-web-viewer-api.zip
Place the dcs-web-viewer-api.lua in (drive):\Users\(name)\Saved Games\DCS...\Scripts\Hooks.
♻️ Restart DCS

### Open Kneeboard

To use it in VR, install OpenKneeboard [OpenKneeboard](https://openkneeboard.com/).
Ask the OpenKneeboard discord for help [discord](https://discord.gg/WdRvTxjwj4)

## Usage

After DCS is running a mission, go to [https://dcs-web-editor.github.io/dcs-web-viewer-deploy/live/](https://dcs-web-editor.github.io/dcs-web-viewer-deploy/live/), preferably in Chrome/Chromium browser. Firefox may also work. Other browser may not work.

### Shortcuts

- (f) Map-follow player on/off
- (p) Paint on map ( disable map-follow (f) for best results )
- (t) Write text
- (m) Measurement tool

### API Endpoints

1. **Health Check:**
    - Endpoint: [http://127.0.0.1:31485/health](http://127.0.0.1:31485/health)
    - Use this endpoint to check if the server is running.

## Troubleshooting

- **Server not starting:** Ensure all dependencies are installed and the required ports are not in use, and DCS is running. Make sure the /health endpoint works, see above.
