### Installation

```bash
npm i --save phaser3-swipe-plugin

# Or 

yarn add phaser3-swipe-plugin
```

### Usage

1. Import
```js
import SwipePlugin from 'phaser3-swipe-plugin'
```

2. Add to config (GameConfig) `plugins` property.

```js
  ...
  plugins: {
    global: [
      {
        key: 'RandomNamePlugin',
        plugin: SwipePlugin,
        start: true,
        data: {
          // you can give your value for min offset
          offset: 123
        }
      }
    ]
  }
  ...
```

Tested on Phaser `3.15.1`.
