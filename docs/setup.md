## Setup

### Installation

#### NPM

#### Direct <script> Include

#### CDN

https://unpkg.com/glidejs

### Explanation of Different Builds

Glide.js is built in a few different variants. They can be found in the `dist/` directory.

- **Full** - Builds that contains both required and optional modules.
- **Modular** - Builds that contains only required modules. Optional modules are exported for import on demand.

|   | UMD | ES Module |
|---|---|---|
| Full | glide.js  | glide.esm.js |
| Modular | --- | glide.modular.esm.js |
| Full (minified) | glide.min.js | --- |