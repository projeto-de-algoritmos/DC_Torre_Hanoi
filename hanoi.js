class Rect {
    constructor(indice, opt) {
        this.indice = indice;
        this.minimo = 30;
        this.passo = 15;
        this.h = 15;
        this.w = this.minimo + this.passo * this.indice;
        this.div = null;
        this.from = null;
        this.torre = null;
        this.velocidade = opt.velocidade;
        this.draw();
    }

    draw() {
        this.div = $(document.createElement("div"));
        var opacidade = 0.3 + Math.random() * 0.7;
        this.div.css({
            position : "absolute",
            backgroundColor : "#000",
            opacidade : opacidade,
            width : this.w + "px",
            height : this.h + 'px',
            left : "600px",
            top : 100 + this.indice * 10 + "px",
            borderRadius : "2px",
            marginLeft : -(this.minimo + this.passo * this.indice) / 2 + "px",
            borderBottom : "1px solid #ccc"
        });
        $(document.body).append(this.div);
    }
}

class Torre {
    constructor(indice) {
        this.indice = indice;
        this.h = 100;
        this.w = 50;
        this.top = 200;
        this.left = 200;
        this.div = null;
        this.origin = {
            x : this.left + this.indice * this.h + this.h,
            y : this.top + this.h
        };
        this.rects = [];
    }
}

function main(n, opt) {
    var rects = [];

    for (i = 0; i < n; i++) {
        rects.push(new Rect(i, {}));
    }
}

$( document ).ready(function() {
    main(5, {});
});