class Rect {
    constructor(indice, opt) {
        this.indice = indice;
        this.minimo = 30;
        this.passo = 15;
        this.h = 15;
        this.w = this.minimo + this.passo * this.indice;
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

    moverPara(fn) {
        var torre = this.torre;
        return torre.moverRect(this, fn);
    }
}

class Torre {
    constructor(indice) {
        this.indice = indice;
        this.h = 150;
        this.w = 50;
        this.top = 200;
        this.left = 600;
        this.div = null;
        this.origem = {
            y : this.top + this.h,
            x : this.left + this.indice * this.h + this.h,
        };
        this.rects = [];
        this.draw();
    }

    draw() {
        var div = document.createElement("div");
        var div2 = document.createElement("div");
        div = $(div);
        div2 = $(div2);
        div.css({
            borderLeft : "1px solid #aaa",
            height : this.h + "px",
            width : 0,
            position : "absolute",
            left : this.origem.x + "px",
            top : this.origem.y - this.h + "px"
        });
        div2.css({
            position : "absolute",
            width : this.w + "px",
            height : 0,
            borderBottom : "1px solid #aaa",
            bottom : 0,
            left : (- this.w / 2) + 'px'
        });
        div.append(div2);
        this.div = div;
        $(document.body).append(div);
    }

    moverRect(rect, fn) {
        var podeMover = false;
        if (this.rects.length === 0) {
            podeMover = true;
        } else {
            var top = this.rects[this.rects.length -1];
            if (top.indice > rect.indice) {
                podeMover = true;
            }
        }
        if (podeMover) {
            if (rect.from) {
                rect.from.rects = rect.from.rects.filter(function (item) {
                    return item.indice !== rect.indice;
                });
            }
            this.rects.push(rect);
            rect.from = this;
            var indice = this.rects.length;
            rect.div.animate({
                top : this.origem.y - rect.h * indice + "px",
                left : this.origem.x + "px"
            }, rect.velocidade, fn);
        }
        return podeMover;
    }
}

function main(n, opt) {
    var rects = [];
    var torres = [];
    const TOTAL_TORRES = 3;

    for (i = 0; i < n; i++) {
        rects.push(new Rect(i, {}));
    }

    for (i = 0; i < TOTAL_TORRES; i++) {
        torres.push(new Torre(i));
    }

    rects[0].to = torres[1];
    rects[0].torre = torres[1];
    rects[0].moverPara(()=>{return});
}

$( document ).ready(function() {
    main(5, {});
});