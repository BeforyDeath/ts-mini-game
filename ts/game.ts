/** Created by beforydeath on 08.05.16. **/

class Game {
    level:number;
    list:number[] = [];

    constructor(level:number = 4) {
        this.level = level;
        console.log('Start game:' + level);
    }

    draw = () => {
        var game = document.getElementById("game");
        game.style.width = this.level * (50 + 4) + "px";
        for (var x = 1; x < this.level + 1; x++)
            for (var y = 1; y < this.level + 1; y++) {
                var state = Math.floor(Math.random() * (1 + 1));
                var block = document.createElement('span');

                block.className = "block state_" + state;
                block.setAttribute("state", '' + state);
                block.id = x + '' + y;

                block.addEventListener("click", this.click);
                game.appendChild(block);
            }
    };

    click = (e) => {
        var block = e.originalTarget;

        this.toggle(block);

        var row = parseInt(block.id[0]);
        var col = parseInt(block.id[1]);

        this.list = [];
        for (var cell = 1; cell < this.level + 1; cell++) {
            this.up(row, col, cell);
            this.right(row, col, cell);
            this.down(row, col, cell);
            this.left(row, col, cell);
        }

        let _self = this;
        for (let i in this.list) {
            setTimeout(function () {
                var id = _self.list[i];
                block = document.getElementById(id);
                _self.toggle(block);
            }, 30 * i)
        }

    };

    toggle = (block) => {
        var state = block.getAttribute('state');
        if (state == 0) block.setAttribute("state", "1");
        else block.setAttribute("state", "0");
        block.classList.toggle("state_0");
        block.classList.toggle("state_1");
    };

    down = (row, col, cell) => {
        var n = (row) + cell;
        if (n < (this.level + 1)) this.list.push('' + n + col);
    };

    up = (row, col, cell) => {
        var n = (row) - cell;
        if (n > 0) this.list.push('' + n + col);
    };

    left = (row, col, cell) => {
        var n = (col) - cell;
        if (n > 0) this.list.push('' + row + n);
    };

    right = (row, col, cell) => {
        var n = (col) + cell;
        if (n < (this.level + 1)) this.list.push('' + row + n);
    };


}