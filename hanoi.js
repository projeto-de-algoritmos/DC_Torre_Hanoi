class Rect {
    constructor(indice, opt) {
        this.indice = indice;
        this.minimo = 20;
        this.passo = 10;
        this.h = 8;
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
            backgroundColor : '#ffd233',
            opacidade : opacidade,
            width : this.w + "px",
            height : this.h + 'px',
            left : "100px",
            top : 250 + this.indice * 10 + "px",
            borderRadius : "7px",
            marginLeft : -(this.minimo + this.passo * this.indice) / 2 + "px",
            border : "1px solid black"
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
        this.h = 190;
        this.w = 140;
        this.top = 500;
        this.left = 200;
        this.div = null;
        this.origem = {
            y : this.top + this.h,
            x : this.left + this.indice * 3 * this.h + this.h,
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
            top : this.origem.y - this.h + "px",
            border : "1px solid black"
        });
        div2.css({
            position : "absolute",
            width : this.w + "px",
            height : 0,
            borderBottom : "1px solid #aaa",
            bottom : 0,
            left : (- this.w / 2) + 'px',
            border : "1px solid black"
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
    const TOTAL_TORRES = 3;
    var torres = [],
        rects = [],
        i = 0;

    for (i = 0; i < TOTAL_TORRES; i++) {
        torres.push(new Torre(i));
    }

    function mover(i, to, fn) {
        rects[i].torre = to;
        rects[i].moverPara(fn)
    }

    for (i = 0; i < n; i++) {
        rects.push(new Rect(i, {
            velocidade : parseInt(opt.velocidade)
        }));
    }

    
    var indice = rects.length - 1;
    new Promise((resolve, reject) => {
        todosOsRetangulosParaPrimeiraTorre(indice, torres[0]);

        function todosOsRetangulosParaPrimeiraTorre(i, to) {
            if (i < 0) {
                resolve();
                return;
            }

            mover(i, to, function () {
                i = i - 1;
                todosOsRetangulosParaPrimeiraTorre(i, torres[0]);
            });
        }

    }).then(() => {
        start();
    });


    function start() {
        var passos = [];
        recursaoHanoi(n - 1, torres[0], torres[1], torres[2], function (prop) {
            passos.push(prop);
        });
        var i = 0,
        len = passos.length;
        console.log(passos);
        loop(i);

        function loop(i){
            if (i >= len) return;
            mover(passos[i].indice, passos[i].to, function () {
                i = i + 1;
                loop(i);
            });
        }
    }


    function recursaoHanoi(n_rects, torre_1, torre_2, torre_3, fn){
        if (n_rects === 0) {
            fn({
                indice : n_rects,
                to : torre_3
            });
        } else {
            recursaoHanoi(n_rects -1, torre_1, torre_3, torre_2, fn);
            fn({
                indice : n_rects,
                to : torre_3
            });
            recursaoHanoi(n_rects-1, torre_2, torre_1, torre_3, fn);
        }
    }
}

var rodando = false;
$("#btn").on("click", function () {
    if (rodando) return;
    rodando = true;
    var velocidade = $("#velocidade").val();
    var blocos = $("#input").val();
    if (blocos > 20) {
        alert("A partir de 20 blocos fica muito pesado, o programa foi limitado a 20")
        blocos = 20;
    } 
    main(blocos, {
        velocidade : velocidade
    });

});