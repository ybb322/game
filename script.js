let app = new PIXI.Application({width: 800, height: 600});
document.body.appendChild(app.view);

const groundTexture = PIXI.Texture.from('/assets/ground.png');
const groundTilingSprite = new PIXI.TilingSprite(
    groundTexture, app.screen.width, app.screen.height
)

const skyTexture = PIXI.Texture.from('/assets/sky.png');
const skyTilingSprite = new PIXI.TilingSprite(
    skyTexture, app.screen.width, app.screen.height
)

const person = PIXI.Sprite.from('/assets/person.png')

app.stage.addChild(skyTilingSprite, groundTilingSprite);
app.stage.addChild(person);

person.x = -200;
person.y = 75;

const backgroundTicker = app.ticker.add(() => {
    groundTilingSprite.tilePosition.x -= 1;
    skyTilingSprite.tilePosition.x -= 0.2;
});


person.eventMode = 'dynamic';
person.on('click', personJump)

function personJump() {
    let elapsed = 0;
    const jumpTicker = app.ticker.add((delta) => {
        person.y = 35 + Math.cos(elapsed / 10) * 40;
        elapsed += delta;
        console.log(elapsed)
        if (elapsed > 50) {
            app.ticker.remove(jumpTicker)
        }
    })
}
