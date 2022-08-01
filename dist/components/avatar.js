"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avatar = void 0;
const constants_1 = require("../utils/constants");
class Avatar {
    constructor(loader, map) {
        this.x = 0;
        this.y = 0;
        this.screenX = 0;
        this.screenY = 0;
        this.loader = loader;
        this.avatarAsset = this.loader.loadImageToCanvas('avatar', constants_1.constants.ASSETS_AVATAR_HEIGHT, constants_1.constants.ASSETS_AVATAR_WIDTH);
        this.map = map;
    }
    loadMapUpdate(map, x, y) {
        this.map = map;
        this.x = x;
        this.y = y;
    }
    newAreaMapUpdate(map, addedTiles) {
        this.map = map;
        this.x = this.x + addedTiles[0] * constants_1.constants.MAP_TSIZE;
        this.y = this.y + addedTiles[1] * constants_1.constants.MAP_TSIZE;
    }
    move(delta, dirx, diry) {
        if (this.map) {
            const x = this.x;
            const y = this.y;
            this.x += dirx * constants_1.constants.AVATAR_SPEED_WALK * delta;
            this.y += diry * constants_1.constants.AVATAR_SPEED_WALK * delta;
            this._collide(dirx, diry, x, y);
            const maxX = this.map.currentMap.COLS * constants_1.constants.MAP_TSIZE;
            const maxY = this.map.currentMap.ROWS * constants_1.constants.MAP_TSIZE;
            this.x = Math.max(0, Math.min(this.x, maxX));
            this.y = Math.max(0, Math.min(this.y, maxY));
        }
    }
    _collide(dirx, diry, x, y) {
        if (this.map) {
            const left = this.x - constants_1.constants.AVATAR_WIDTH / 2;
            const right = this.x + constants_1.constants.AVATAR_WIDTH / 2 - 1;
            const bottom = this.y + constants_1.constants.AVATAR_HEIGHT / 2 - 1;
            const middleY = (this.y + bottom) / 2;
            const collision = this.map.isSolidTileAtXY(left, this.y, dirx, diry) ||
                this.map.isSolidTileAtXY(right, this.y, dirx, diry) ||
                this.map.isSolidTileAtXY(left, middleY, dirx, diry) ||
                this.map.isSolidTileAtXY(right, middleY, dirx, diry) ||
                this.map.isSolidTileAtXY(right, bottom, dirx, diry) ||
                this.map.isSolidTileAtXY(left, bottom, dirx, diry) ||
                this.map.isSolidTileAtXY(this.x, this.y, dirx, diry) ||
                this.map.isSolidTileAtXY(this.x, bottom, dirx, diry);
            if (!collision) {
                return;
            }
            if (diry !== 0) {
                this.y = y;
            }
            else if (dirx !== 0) {
                this.x = x;
            }
        }
    }
}
exports.Avatar = Avatar;
//# sourceMappingURL=avatar.js.map