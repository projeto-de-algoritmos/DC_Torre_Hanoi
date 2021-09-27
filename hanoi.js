class Rect {
    constructor() {
        this.h = 10;
        this.w = this.minimo + this.passo * this.indice;
        this.minimo = 20;
        this.passo = 8;
        this.div = null;
        this.from = null;
        this.torre = null;
    }
}

class Torre {
    constructor() {
        this.h = 100;
        this.w = 50;
        this.top = 200;
        this.left = 200;
        this.div = null;
        this.rects = [];
    }
}