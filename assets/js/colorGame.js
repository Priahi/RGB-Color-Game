// var colors = [
//     "rgb(255, 0, 0)",
//     "rgb(255, 255, 0)",
//     "rgb(0, 255, 0)",
//     "rgb(0, 255, 255)",
//     "rgb(0, 0, 255)",
//     "rgb(255, 0, 255)"
// ];
const EASY = 3;
const HARD = 6;
const INTENSE = 9;

const game = new Game(HARD);
reset.call(game);
difficulty.call(game);

function Game(num) {
    this.squares = document.querySelectorAll(".square");
    this.num = num;
    this.pickedColor = null;
    this.colors = null;
}

function reset() {
    $("h1").css("background-color", "steelblue");
    $("#message").text("");
    this.colors = genColors.call(this);
    setSquareColors.call(this);
    this.pickedColor = this.colors[Math.floor(Math.random() * this.num)];
    $("#colorDisplay").text(this.pickedColor.toString() + "?");
}

function difficulty() {
    const _ = this; // game obj
    $(".mode").click(function () {
        $(".mode").removeClass("selected");
        $(this).addClass("selected");
        $(this).text() === "Easy" ? _.num = EASY:
            ($(this).text() === "Hard" ? _.num = HARD: _.num = INTENSE);
        reset.call(_);
    });
    $("#reset").click(resetGame.bind(_))
}

function setSquareColors() {
    $(".square").css("background-color", "#232323");
    for(let i=0; i< this.num;i++) {
        this.squares[i].style.backgroundColor = this.colors[i];
    }
    const _ = this; // game obj -> _
    $(".square").click(function () {// "this" refers to square event
        winOrLose.call(this, $(this).css("background-color"), _);
    });
}

function winOrLose(color, _) {
    if (color === _.pickedColor) { // _ is the game obj
        $("#message").text("Correct!");
        changeColors.call(_, color);
        $("h1").css("background-color", color);
        $("#reset").text("Play Again?");
    } else {
        $(this).css("background-color", "#232323")
        $("#message").text("Try Again...");
    }
}

// function unselectButtons(_) {
//         $(".mode").removeClass("selected");
//         $(this).addClass("selected");
//         $(this).text() === "Easy" ? _.num = EASY:
//             ($(this).text() === "Hard" ? _.num = HARD: _.num = INTENSE);
//         reset.call(_);
// }

function resetGame() {
    $("#reset").text("New Colors");
    reset.call(this);
}

function changeColors(color) {
    for (let i = 0; i < this.colors.length; i++) {
        if (i < this.num) {
            this.squares[i].style.backgroundColor = color;
        } else {
            this.squares[i].style.backgroundColor = document.body.background;
        }
    }
}

function genColors() {
    const arr = [];
    for(let i = 0; i < this.num; i++) {
        arr.push(genColor());
    }
    return arr;
}

function genColor() {
    const r = randoRGB();
    const g = randoRGB();
    const b = randoRGB();
    return `rgb(${r}, ${g}, ${b})`
}

function randoRGB() {
    return Math.floor(Math.random() * 256);
}

