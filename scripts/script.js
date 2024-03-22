console.log("Que comience el juego")

let isButtonDisabled = false;

function getRandomNumber(min = 1, max = 100){
    return Math.floor(Math.random() * (max - min)) + min;
}

function numPlus(){
    const minValue = document.getElementById("minValue");
    const guessedNumber = document.getElementById("guessedNumber");

    minValue.innerHTML = parseInt(guessedNumber.innerHTML) + 1;
    wrongNumber();
    setTimeout(NewGuess, 1500);
}

function numMinus(){
    const maxValue = document.getElementById("maxValue");
    const guessedNumber = document.getElementById("guessedNumber");

    maxValue.innerHTML = `${parseInt(guessedNumber.innerHTML) - 1}`;
    wrongNumber();
    setTimeout(NewGuess, 1500);
}

function NewGuess(){
    const minValueStr = document.getElementById("minValue");
    const maxValueStr = document.getElementById("maxValue");

    const maxValue = parseInt(maxValueStr.innerHTML);
    const minValue = parseInt(minValueStr.innerHTML);

    let newAnswer = 0;

    newAnswer = binarySearch(minValue, maxValue);
    guessNumber(newAnswer);
    if(minValue > maxValue)
        finishGame();
}

function binarySearch(minValue = 1, maxValue = 100){
    console.log(`${minValue}, ${maxValue}`);
    return Math.floor( ( minValue + maxValue ) / 2);
}

// Transiciones del juego

function startGame(){
    const tryButtons = document.getElementsByClassName("tryButton");
    const confirmButton = document.getElementById("confirmButton");

    confirmButton.innerHTML = "¡Correcto!";
    confirmButton.setAttribute("onclick", "finishGame()");
    confirmButton.setAttribute("class", "col-12 col-lg-4 btn btn-outline-success");

    for (const tryButton of tryButtons) {
        tryButton.removeAttribute("disabled");
        tryButton.style.visibility = "visible";
    }

    const randomNumber = getRandomNumber();
    guessNumber(randomNumber);
}

function guessNumber(number){
    const genieIMG = document.getElementById("catIMG");
    const genieTextBox = document.getElementById("catTextBox");

    if(number === 1)
        disableSmallerNumberButton();
    else if(number === 100)
        disableLargerNumberButton();
    else if(isButtonDisabled)
        enableButtons();

    genieIMG.setAttribute("src", "./assets/image/black-cat.jpg");
    genieTextBox.innerHTML = `¡AJA!, el número que estás pensando es <span id="guessedNumber">${number}</span>, ¿cierto?`;
}

function wrongNumber(){
    const genieIMG = document.getElementById("catIMG");
    const genieTextBox = document.getElementById("catTextBox");

    genieIMG.setAttribute("src", "./assets/image/black-cat-pensanding.jpg");

    const option = getRandomNumber(1, 5);
    let message = "";

    switch(option){
        case 1:
            message = "Espero que no te quieras pasar de listirijillo";
            break;
        case 2:
            message = "Parece que no esta siendo tan sencillo como esperaba";
            break;
        case 3:
            message = "Ahora esta es la respuesta correcta";
            break;
        case 4:
            message = "Parece ser que el cielo nublado interfiere con la recepcion de mis poderes";
            break;
        default:
            message = "¡¡¡¡No hagas trampaaaa!!!!";
    }

    genieTextBox.innerHTML = message;
}

function setGame(){
    const genieIMG = document.getElementById("catIMG");
    const confirmButton = document.getElementById("confirmButton");
    const genieTextBox = document.getElementById("catTextBox");
    const minValue = document.getElementById("minValue");
    const maxValue = document.getElementById("maxValue");

    minValue.innerHTML = "1";
    maxValue.innerHTML = "100";

    confirmButton.innerHTML = "OK";
    confirmButton.setAttribute("onclick", "startGame()");

    genieTextBox.innerHTML = `¡Soy el Gato Mistico, piensa en un numero del 1 al 100, te aseguro que lo adivinare!, Presiona Comenzar`;

    genieIMG.setAttribute("src", "./assets/image/black-cat.jpg");
}

function finishGame(){
    const genieIMG = document.getElementById("catIMG");
    const genieTextBox = document.getElementById("catTextBox");
    const guessedNumber = document.getElementById("guessedNumber");
    const tryButtons = document.getElementsByClassName("tryButton");
    const confirmButton = document.getElementById("confirmButton");

    const rightAnswer = guessedNumber.innerHTML;

    genieIMG.setAttribute("src", "./assets/image/cat-smiling.jpg");
    genieTextBox.innerHTML = `¡¡Te atrape!!, tu número es el ${rightAnswer}`;

    for (const tryButton of tryButtons) {
        tryButton.style.visibility = "hidden";
    }

    confirmButton.setAttribute("class", "col-12 btn btn-outline-success");
    confirmButton.innerHTML = "Volver a jugar";
    confirmButton.setAttribute("onclick", "setGame()");

}

// Funciones para habilitar y deshabilitar los botones

function disableSmallerNumberButton(){
    const smallerNumberButton = document.getElementById("smallerNumberButton");
    smallerNumberButton.disabled = true;
    isButtonDisabled = true;
}

function disableLargerNumberButton(){
    const largerNumberButton = document.getElementById("largerNumberButton");
    largerNumberButton.disabled = true;
    isButtonDisabled = true;
}

function enableButtons(){
    const largerNumberButton = document.getElementById("largerNumberButton");
    const smallerNumberButton = document.getElementById("smallerNumberButton");
    largerNumberButton.disabled = false;
    smallerNumberButton.disabled = false;
    isButtonDisabled = false;
}

