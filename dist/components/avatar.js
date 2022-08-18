"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avatar = void 0;
class Avatar {
    constructor(c, loader, map) {
        this.x = 0;
        this.y = 0;
        this.screenX = 0;
        this.screenY = 0;
        this.c = c;
        // Get avatar assets from supplied loader
        this.loader = loader;
        this.avatarAsset = this.loader.loadImageToCanvas('avatar', this.c.ASSETS_AVATAR_HEIGHT, this.c.ASSETS_AVATAR_WIDTH);
        // Set the map to the map supplied
        this.map = map;
    }
    loadMapUpdate(map, x, y) {
        // Update the class variables
        this.map = map;
        this.x = x;
        this.y = y;
    }
    newAreaMapUpdate(map, addedTiles) {
        // Update the class variables
        this.map = map;
        // Update the avatar position with the offset supplied
        this.x = this.x + addedTiles[0] * this.c.MAP_TSIZE;
        this.y = this.y + addedTiles[1] * this.c.MAP_TSIZE;
    }
    move(delta, dirx, diry) {
        if (this.map) {
            // Save x and y for collision checking
            const x = this.x;
            const y = this.y;
            // Update x and y with delta and direction
            this.x += dirx * this.c.AVATAR_SPEED_WALK * delta;
            this.y += diry * this.c.AVATAR_SPEED_WALK * delta;
            // Check for collision
            this.collide(dirx, diry, x, y);
            // Compute max allowable values of x and y
            const maxX = this.map.currentMap.COLS * this.c.MAP_TSIZE;
            const maxY = this.map.currentMap.ROWS * this.c.MAP_TSIZE;
            // Limit x and y to between 0 and max values
            this.x = Math.max(0, Math.min(this.x, maxX));
            this.y = Math.max(0, Math.min(this.y, maxY));
        }
    }
    collide(dirx, diry, x, y) {
        if (this.map) {
            // Coordinates of different points on hitbox
            const left = this.x - this.c.AVATAR_WIDTH / 2;
            const right = this.x + this.c.AVATAR_WIDTH / 2 - 1;
            const bottom = this.y + this.c.AVATAR_HEIGHT / 2 - 1;
            const middleY = (this.y + bottom) / 2;
            // Check for collision
            const collision = this.map.isSolidTileAtXY(left, this.y, dirx, diry) ||
                this.map.isSolidTileAtXY(right, this.y, dirx, diry) ||
                this.map.isSolidTileAtXY(left, middleY, dirx, diry) ||
                this.map.isSolidTileAtXY(right, middleY, dirx, diry) ||
                this.map.isSolidTileAtXY(right, bottom, dirx, diry) ||
                this.map.isSolidTileAtXY(left, bottom, dirx, diry) ||
                this.map.isSolidTileAtXY(this.x, this.y, dirx, diry) ||
                this.map.isSolidTileAtXY(this.x, bottom, dirx, diry);
            // If no collision return
            if (!collision) {
                return;
            }
            // Else update x and y to previously stored x and y before movement calculation
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