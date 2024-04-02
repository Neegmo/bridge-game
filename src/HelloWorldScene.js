import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene {
	constructor() {
		super('hello-world')
	}

	preload() {
		this.load.image("Platform", "Platform.png")
		this.load.image("Bridge", "Bridge.png")
		this.load.image("Character", "Character.png")
		this.load.image("Button", "Button.png")
	}

	create() {
		this.pointerDown = false;
		this.sceneHeight = this.sys.game.config.height;
		this.firstPlatform = this.add.image(300, 2015, "Platform")
		this.player = this.add.image(300, 1740, "Character")

		this.platform = this.add.image(750, 2015, "Platform").setScale(0.5, 1)

		this.input.on('pointerdown', () => {
			this.bridge = this.add.image(this.firstPlatform.x, 1880, "Bridge").setOrigin(0.5, 1)
			this.pointerDown = true;
		})

		this.input.on('pointerup', () => {
			this.pointerDown = false
			console.log(this.bridge.height * this.bridge.scaleY)

			this.tweens.add({
				targets: this.bridge,
				rotation: Math.PI / 2,
				repeat: 0,
				// ease: "Sine.easeOut",
				duration: 800,
				onComplete: () => {
					console.log("Rotation finished")
					this.checkBridgeDestination()
				}
			  });
		})
	}

	update(time, delta) {
		// this.cameras.main.scrollX += 5;
		if(this.pointerDown) {
			this.bridge.scaleY += 0.005 * delta
		}
	}

	checkBridgeDestination() {
		let platformMinDistance = this.platform.x - (this.platform.width * this.platform.scaleX / 2) - this.firstPlatform.x
		let platformMaxDistance = this.platform.x + (this.platform.width * this.platform.scaleX / 2) - this.firstPlatform.x
		let bridgeHeight = this.bridge.height * this.bridge.scaleY

		if(bridgeHeight > platformMinDistance && bridgeHeight < platformMaxDistance) {
			console.log("Succes!")
			this.movePlayer()
		}
		else {
			console.log("Fail")
			this.resetScene()
		}

	}
	
	movePlayer() {
		const playerX = this.player.x
		const cameraX = this.cameras.main.scrollX

		this.time.delayedCall(500, () => {

			this.tweens.add({
				targets: this.player,
				x: playerX +  this.platform.x - this.firstPlatform.x,
				repeat: 0,
				ease: "Sine.easeInOut",
				duration: 800,
				onComplete: () => {
					this.tweens.add({
						targets: this.cameras.main,
						scrollX: cameraX +  this.platform.x - this.firstPlatform.x,
						repeat: 0,
						ease: "Sine.easeOut",
						duration: 800,
						onComplete: () => {
							this.resetPlatforms()
						}
					  });
				}
			  });

			  
		})
	}

	resetPlatforms() {
		const randomScale = Phaser.Math.FloatBetween(0.4, 1.01)
		const randomPosition = Phaser.Math.Between(200, 600)

		this.bridge.destroy()
		this.firstPlatform.destroy()
		this.firstPlatform = this.platform

		this.platform = this.add.image(this.firstPlatform.x + randomPosition, 2015, "Platform").setScale(randomScale, 1)
	}

	resetScene() {
		this.time.delayedCall(1000, () => {
		  this.scene.restart();
		});
	  }
}
