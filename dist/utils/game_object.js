"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameObject = void 0;
class GameObject {
    constructor(ctx, gameObject, xSource, ySource, width, height, x, y) {
        this.scaleFactor = 1;
        this.opacity = 1;
        this.animationCounter = 0;
        this.animation = false;
        this.animationXOffset = 0;
        this.animationYOffset = 0;
        this.animationOnTrigger = false;
        this.animationDelay = 0;
        this.animationNOfFrames = 0;
        this.animationFrame = 0;
        this.ctx = ctx;
        this.gameObject = gameObject;
        this.xSource = xSource;
        this.ySource = ySource;
        this.widthSource = width;
        this.width = width;
        this.heightSource = height;
        this.height = height;
        this.x = x;
        this.y = y;
    }
    update(gameObject) {
        this.gameObject = gameObject;
    }
    updateSourcePosition(xSource, ySource) {
        this.xSource = xSource;
        this.ySource = ySource;
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }
    setWidth(width) {
        this.widthSource = width;
        this.width = width;
    }
    setScale(scaleFactor) {
        this.scaleFactor = scaleFactor;
        const newWidth = this.scaleFactor * this.widthSource;
        const newHeight = this.scaleFactor * this.heightSource;
        this.x += (this.width - newWidth) / 2;
        this.y += this.height - newHeight;
        this.width = newWidth;
        this.height = newHeight;
    }
    setOpacity(opacity) {
        this.opacity = opacity;
    }
    setAnimation(onTrigger, delay, xSourceOffset, ySourceOffset, animationNOfFrames) {
        this.animationOnTrigger = onTrigger;
        this.animationXOffset = xSourceOffset;
        this.animationYOffset = ySourceOffset;
        this.animationDelay = delay;
        this.animationNOfFrames = animationNOfFrames;
        this.animation = true;
    }
    animationTrigger(frame) {
        this.animationFrame = frame;
    }
    scaleTo(delta, speed, toFactor) {
        const newScaleFactor = this.scaleFactor + delta * speed;
        this.scaleFactor = newScaleFactor > toFactor ? toFactor : newScaleFactor;
        const newWidth = this.scaleFactor * this.widthSource;
        const newHeight = this.scaleFactor * this.heightSource;
        this.x += (this.width - newWidth) / 2;
        this.y += this.height - newHeight;
        this.width = newWidth;
        this.height = newHeight;
        this.render(delta);
        if (this.scaleFactor < toFactor) {
            return false;
        }
        else {
            return true;
        }
    }
    opacityTo(delta, speed, toVisible, toOpacity) {
        let newOpacity;
        if (toVisible) {
            newOpacity = this.opacity + delta * speed;
            this.opacity = newOpacity > toOpacity ? toOpacity : newOpacity;
        }
        else {
            newOpacity = this.opacity - delta * speed;
            this.opacity = newOpacity < toOpacity ? toOpacity : newOpacity;
        }
        this.render(delta);
        if ((toVisible && this.opacity < toOpacity) || (!toVisible && this.opacity > toOpacity)) {
            return false;
        }
        else {
            return true;
        }
    }
    animate(delta, speed, dirx, diry, endx, endy, drawWhenFinished) {
        const newx = this.x + delta * speed * dirx;
        const newy = this.y + delta * speed * diry;
        if ((dirx === -1 && newx > endx) || (dirx === 1 && newx < endx) ||
            (diry === -1 && newy > endy) || (diry === 1 && newy < endy)) {
            this.x = newx;
            this.y = newy;
            this.render();
            return false;
        }
        else {
            if (drawWhenFinished) {
                this.render();
            }
            return true;
        }
    }
    render(delta = 0) {
        let xSource = this.xSource;
        let ySource = this.ySource;
        if (this.animation) {
            let frame;
            if (this.animationOnTrigger) {
                frame = this.animationFrame;
                if (frame >= this.animationNOfFrames) {
                    frame = 0;
                    this.animationFrame = 0;
                }
            }
            else {
                frame = this.animationCounter / this.animationDelay << 0;
                if (frame >= this.animationNOfFrames) {
                    frame = 0;
                    this.animationCounter = 0;
                }
            }
            xSource = this.xSource + frame * this.animationXOffset;
            ySource = this.ySource + frame * this.animationYOffset;
        }
        this.ctx.globalAlpha = this.opacity;
        this.ctx.drawImage(this.gameObject, xSource, ySource, this.widthSource, this.heightSource, this.x << 0, this.y << 0, this.width, this.height);
        this.ctx.globalAlpha = 1;
        this.animationCounter += delta * 1000;
    }
}
exports.GameObject = GameObject;
//# sourceMappingURL=game_object.js.map