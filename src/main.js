import Phaser from 'phaser'

import HelloWorldScene from './HelloWorldScene'

const config = {
	type: Phaser.AUTO,
	backgroundColor: '#5a4484',
	parent: 'app',
	scale: {
        mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        width: 1080,
        height: 2160
    },
	physics: {
		default: 'matter',
		matter: {
			debug: true,
			gravity: { y: 0 },
		},
	},
	scene: [HelloWorldScene],
}

export default new Phaser.Game(config)

