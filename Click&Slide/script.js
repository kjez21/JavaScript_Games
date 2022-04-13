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

    let rightArrow = document.createElement("img");
    rightArrow.setAttribute("src", "Graphics/arrowRight.png");
    rightArrow.setAttribute("id", "rightArrow");
    rightArrow.classList.add("arrow");
    rightArrow.addEventListener("click", scroll);
    slider.append(rightArrow);

    for (let i = 1; i <= 5; i++) {
        let img = document.createElement("img");

        // TODO: przetestować działanie bez warunku
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
        let cyfra = document.createElement("img");
        timer.appendChild(cyfra);
        if (i == 3 || i == 6) {
            cyfra.setAttribute("src", "Graphics/colon.gif");
        } else if (i == 9) {
            cyfra.setAttribute("src", "Graphics/dot.gif");
        } else {
            cyfra.setAttribute("src", "Graphics/0.gif");
        }
    }
}

let main = document.createElement("div");
let columns, width, height;

function createBoard(e) {

}

createPage();