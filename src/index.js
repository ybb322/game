import * as PIXI from 'pixi.js'

let app = new PIXI.Application({width: 800, height: 600});
document.body.appendChild(app.view);

const groundTexture = PIXI.Texture.from('/src/assets/ground.png');
const groundTilingSprite = new PIXI.TilingSprite(
    groundTexture, app.screen.width, app.screen.height
)

const skyTexture = PIXI.Texture.from('/src/assets/sky.png');
const skyTilingSprite = new PIXI.TilingSprite(
    skyTexture, app.screen.width, app.screen.height
)

const person = PIXI.Sprite.from('/src/assets/person.png')

app.stage.addChild(skyTilingSprite, groundTilingSprite);
app.stage.addChild(person);

person.x = -200;
person.y = 75;

const backgroundTicker = app.ticker.add(() => {
    groundTilingSprite.tilePosition.x -= 1;
    skyTilingSprite.tilePosition.x -= 0.2;
});

let elapsed = 0;

function jump(delta) {
    person.y = 35 + Math.cos(elapsed / 10) * 40;
    elapsed += delta;
    console.log(person.y)
    if (elapsed > 10 && person.y.toFixed(0) === '75') {
        PIXI.Ticker.shared.remove(jump)
        elapsed = 0;
        person.y = 75;
    }

}

person.on('click', () => {
    PIXI.Ticker.shared.add(jump)
})


person.eventMode = 'dynamic';
