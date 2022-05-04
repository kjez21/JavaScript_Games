let body = document.getElementsByTagName("body");
let selectedImageUrl;

function createPage() {
    let container = document.createElement("div");
    container.setAttribute("id", "container");
    document.body.appendChild(container);
    createMenu();
}

function createMenu() {
    let menu = document.createElement("div");
    let slider = document.createElement("div");
    menu.setAttribute("id", "menu");
    slider.setAttribute("id", "slider");
    menu.append(slider);
    container.appendChild(menu);

    let selectedPicture = document.createElement("div");
    selectedPicture.setAttribute("id", "selected");

    let leftArrow = document.createElement("img");
    leftArrow.setAttribute("src", "Graphics/arrowLeft.png");
    leftArrow.setAttribute("id", "leftArrow");
    leftArrow.classList.add("arrow");
    leftArrow.addEventListener("click", scroll);
    slider.append(leftArrow);

    

    for (let i = 1; i <= 5; i++) {
        let img = document.createElement("img");
        if (i == 1) {
            img.setAttribute("src", "Graphics/" + 5 + ".jpg");
        } else {
            img.setAttribute("src", "Graphics/" + (i - 1) + ".jpg");
        }
        selectedPicture.appendChild(img);
    }

    slider.append(selectedPicture);
    selectedPicture.style.scrollBehavior = "auto";
    selectedPicture.scrollLeft = 150;

    setTimeout(() => {
        selectedPicture.scrollLeft = 150;
    }, 50);

    let rightArrow = document.createElement("img");
    rightArrow.setAttribute("src", "Graphics/arrowRight.png");
    rightArrow.setAttribute("id", "rightArrow");
    rightArrow.classList.add("arrow");
    rightArrow.addEventListener("click", scroll);
    slider.append(rightArrow);

    let buttons = document.createElement("div");
    buttons.setAttribute("id", "buttons");
    menu.appendChild(buttons);

    for (let columns = 3; columns <= 6; columns++) {
        let btn = document.createElement("button");
        btn.setAttribute("id", "btn_" + columns);
        btn.classList.add("btn");
        btn.innerHTML = columns + " x " + columns;
        buttons.appendChild(btn);
        btn.addEventListener("click", createBoard);
    }

    let timer = document.createElement("div");
    timer.setAttribute("id", "timer");
    menu.appendChild(timer);

    let label = document.createElement("label");
    label.innerHTML = "Podaj nick: ";

    let input = document.createElement("input");
    input.setAttribute("type", "text");

    label.appendChild(input);
    menu.appendChild(label);

    for (let i = 1; i <= 12; i++) {
        let number = document.createElement("img");
        timer.appendChild(number);
        if (i == 3 || i == 6) {
            number.setAttribute("src", "Graphics/colon.gif");
        } else if (i == 9) {
            number.setAttribute("src", "Graphics/dot.gif");
        } else {
            number.setAttribute("src", "Graphics/0.gif");
        }
    }
}

let main = document.createElement("div");
let columns, width, height;

function findBlack(n, m) {
    for (let o = n - 1; o <= n + 1; o += 2) {
        let id = "field_" + o + "_" + m;
        let sibling = document.getElementById(id);
        if (sibling != null && sibling.classList.contains("black")) {
            return id;
        }
    }

    for (let o = m - 1; o <= m + 1; o += 2) {
        let id = "field_" + n + "_" + o;
        let sibling = document.getElementById(id);
        if (sibling != null && sibling.classList.contains("black")) {
            return id;
        }
    }
}

function createBoard(e) {
    main.setAttribute("id", "main");
    main.innerHTML = "";
    container.appendChild(main);

    width = main.clientWidth;
    height = main.clientHeight;
    columns = e.target.id.split("_")[1];
    let topPosition = 0;
    let leftPosition = 0;
    let w = width / columns;
    let h = height / columns;

    for (let i = 1; i <= columns; i++) {
        for (let j = 1; j <= columns; j++) {
            let field = document.createElement("div");
            field.setAttribute("id", "field_" + i + "_" + j);
            field.classList.add("field");
            field.style.width = w + "px";
            field.style.height = h + "px";
            field.dataset.x = j;
            field.dataset.y = i;

            leftPosition = "-" + (w * (j - 1));
            topPosition = "-" + (w * (i - 1));
            position = leftPosition + "px " + topPosition + "px";
            field.style.backgroundPosition = position;

            if (i == columns && j == columns) {
                field.classList.add("black");
            } else {
                selectedImageUrl = document.getElementById("selected").childNodes[1].getAttribute("src");
                field.style.backgroundImage = "url(" + selectedImageUrl + ")";
            }

            field.addEventListener("click", onClick)
            main.appendChild(field);
        }
    }
    shuffle();
}

function onClick() {
    let i = parseInt(this.id.split("_")[1]);
    let j = parseInt(this.id.split("_")[2]);
    let id = "field_" + i + "_" + j;
    let block = findBlack(i, j);
    if (block == null) {
        return;
    }
    move(id);
    checkBoard();
}

function move(id) {
    klocek = document.getElementById(id);
    let black = document.getElementsByClassName("black")[0];
    let tmpStylePosition = klocek.style.backgroundPosition;
    black.style.backgroundImage = "url(" + selectedImageUrl + ")";
    klocek.style.backgroundImage = "";

    let tmpDatasetX = klocek.dataset.x;
    let tmpDatasetY = klocek.dataset.y;
    klocek.dataset.x = black.dataset.x;
    klocek.dataset.y = black.dataset.y;
    black.dataset.x = tmpDatasetX;
    black.dataset.y = tmpDatasetY;

    black.classList.remove("black");
    klocek.classList.add("black");
    black.style.backgroundPosition = tmpStylePosition;
}

function checkBoard() {
    for (let i = 1; i <= columns; i++) {
        for (let j = 1; j <= columns; j++) {
            let field = document.getElementById("field_" + i + "_" + j);
            if (field.dataset.x != j || field.dataset.y != i) {
                return;
            }
        }
    }
    gameTime();
}

function modal(results) {
    let alertDiv = document.createElement("div");
    alertDiv.setAttribute("id", "modal");
    let span = document.createElement("span");
    span.classList.add("closebtn");
    span.innerHTML = "&times;";
    span.addEventListener("click", function () {
        this.parentElement.style.display = 'none'
    })

    let header = document.createElement("h1");
    header.innerText = "ZWYCIĘSTWO!";
    let result = document.createElement("h2");
    result.innerText = "Twój czas to: " + string;
    let top = document.createElement("h2");
    top.innerText = "TOP 10: ";
    let magicDiv = document.createElement("div");
    magicDiv.setAttribute("id", "magic");
    magicDiv.append(span);
    magicDiv.append(header);
    magicDiv.append(result);
    magicDiv.append(top);

    for (let i = 0; i < results.length; i++) {
        let line = document.createElement("h3");
        line.innerText = (i + 1) + ". " + results[i][0] + ": " + results[i][2];
        magicDiv.append(line);
    }

    alertDiv.style.display = "block";
    alertDiv.append(magicDiv);
    let black = document.getElementsByClassName("black")[0];
    black.classList.remove("black");
    black.style.backgroundImage = "url(" + selectedImageUrl + ")";

    let w = width / columns;
    let h = height / columns;

    leftPosition = "-" + (w * (columns - 1));
    topPosition = "-" + (w * (columns - 1));
    position = leftPosition + "px " + topPosition + "px";
    black.style.backgroundPosition = position;

    container.append(alertDiv);
    let modal = document.getElementById('modal');
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
        alertDiv.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            alertDiv.style.display = "none";
        }
    }
}

let start, clockInterval;

function shuffle() {
    let tab = [];
    let repeat = 3; /*columns * columns * 10*/
    for (let i = 0; i <= repeat; i++) {
        setTimeout(moveRandom, 60 * i);
    }
    setTimeout(function () {
        start = +new Date();
        clockInterval = setInterval(countTime, 1000 / 60);
    }, 60 * repeat);
}

function moveRandom() {
    let black = document.getElementsByClassName("black")[0];
    tab = [];
    let xBlack = parseInt(black.id.split("_")[1]);
    let yBlack = parseInt(black.id.split("_")[2]);

    if (document.getElementById("field_" + xBlack + "_" + (yBlack - 1))) {   //up
        tab.push("field_" + xBlack + "_" + (yBlack - 1));
    }
    if (document.getElementById("field_" + (xBlack + 1) + "_" + yBlack)) {   //right
        tab.push("field_" + (xBlack + 1) + "_" + yBlack);
    }
    if (document.getElementById("field_" + (xBlack - 1) + "_" + yBlack)) {   //left
        tab.push("field_" + (xBlack - 1) + "_" + yBlack);
    }
    if (document.getElementById("field_" + xBlack + "_" + (yBlack + 1))) {   //down
        tab.push("field_" + xBlack + "_" + (yBlack + 1));
    }

    let randomItem = tab[Math.floor(Math.random() * tab.length)];
    move(randomItem);
}

function scroll(e) {
    let selected = document.getElementById("selected");
    //let scroll = selected.scrollLeft;
    selected.style.scrollBehavior = "auto";
    //TODO: poprawić pixele na procenty
    if (e.target.id == "leftArrow") {
        selected.insertBefore(selected.childNodes[selected.childElementCount - 1], selected.childNodes[0])
        selected.scrollLeft = 300;
        selected.style.scrollBehavior = "smooth";
        selected.scrollLeft = 150;
    } else if (e.target.id == "rightArrow") {
        selected.insertBefore(selected.childNodes[0], null)
        selected.scrollLeft = 0;
        selected.style.scrollBehavior = "smooth";
        selected.scrollLeft = 150;
    }
}

function time(numbers) {
    //let date = new Date();

    for (let i = 0; i < numbers.length; i++) {
        let img = document.getElementById("timer").childNodes[i];
        let src = document.getElementById("timer").childNodes[i].getAttribute("src");

        if (numbers[i] == ".") {
            src = "Graphics/dot.gif";
        } else {
            src = "Graphics/" + (numbers[i]) + ".gif";
        }
        img.setAttribute("src", src);
    }
}

let string, milliseconds;

function countTime() {
    let actualTime = +new Date();
    let difference = actualTime - start;
    milliseconds = difference;

    let ms = difference % 1000;
    difference -= ms;
    difference /= 1000;
    let s = difference % 60;
    difference -= s;
    difference /= 60;
    let min = difference % 60;
    difference -= min;
    difference /= 60;
    let h = difference % 60;
    difference -= min;

    ms = ("0" + ms).slice(-3);
    s = ("0" + s).slice(-2);
    min = ("0" + min).slice(-2);
    h = ("0" + h).slice(-2);
    string = h + ":" + min + ":" + s + "." + ms;
    time(string);
}

function gameTime() {
    let cookieName = "wyniki" + columns;
    let ciasteczkaWyniki = getCookieValue(cookieName);
    let wyniki = [];

    if (ciasteczkaWyniki != "") {
        wyniki = JSON.parse(ciasteczkaWyniki);
    }

    let nick = document.getElementsByTagName("input")[0].value;
    if (nick == "") {
        nick = "Guest";
    }

    let cookie = [nick, milliseconds, string];
    wyniki.push(cookie);
    wyniki.sort(sortFunction);

    function sortFunction(a, b) {
        if (a[1] === b[1]) {
            return 0;
        } else {
            return (a[1] < b[1]) ? -1 : 1;
        }
    }

    if (wyniki.length > 10) {
        wyniki.pop();
    }

    document.cookie = `${cookieName}=` + JSON.stringify(wyniki) + "; expires=Tue, 19 Jan 2038 03:14:07 UTC";
    clearInterval(clockInterval);
    modal(wyniki);
}

function getCookieValue(a) {
    let b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

createPage();