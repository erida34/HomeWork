const readline = require('readline');
const process = require('process');
const rowsTerminal = process.stdout.rows -7;

let koeficient = 8.0001;
let widthDelta = 8;
let idWindow = 1;
let bottomEdge = -Math.abs(rowsTerminal)/2,
    topEdge = Math.abs(rowsTerminal)/2;
let funcUse = "Math.sin(x)";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function displayMenu() {
    console.clear();
    idWindow = 2;
    console.log(`\x1b[36m1.\x1b[0m Function: \x1b[32m${funcUse}\x1b[0m`);
    console.log(`\x1b[36m2.\x1b[0m Сoefficient: \x1b[32m${koeficient}\x1b[0m`);
    console.log(`\x1b[36m3.\x1b[0m Bottom Edge: \x1b[32m${bottomEdge}\x1b[0m`);
    console.log(`\x1b[36m4.\x1b[0m Top Edge: \x1b[32m${topEdge}\x1b[0m`);
    console.log('\x1b[36m5.\x1b[0m \x1b[32mDone\x1b[0m');
}

function handleOption(option) {
    switch(option) {
        case '1':
            rl.question('Enter function code\x1b[31m(you can use object Math from JS)\x1b[0m: ', (answer) => {
                if(answer !== "")
                    funcUse = answer;
                displayMenu();
                askOption();
            });
            break;
        case '2':
            rl.question('Enter Сoefficient: ', (answer) => {
                if(answer !== "" && !Number.isNaN(Number(answer)))
                    koeficient = answer;
                displayMenu();
                askOption();
            });
            break;
        case '3':
            rl.question('Enter Bottom Edge: ', (answer) => {
                if(answer !== "" && !Number.isNaN(Number(answer)))
                    bottomEdge = answer;
                displayMenu();
                askOption();
            });
            break;
        case '4':
            rl.question('Enter Top Edge: ', (answer) => {
                if(answer !== "" && !Number.isNaN(Number(answer)))
                    topEdge = answer;
                displayMenu();
                askOption();
            });
            break;
        case '5':
            idWindow = 0;
            break;
        case '':
            idWindow = 0;
            break;
        default:
            console.log('Invalid option. Please try again.');
            displayMenu();
            askOption();
    }
}

function askOption() {
    rl.question('\x1b[33mSelect an option(default: 5):\x1b[0m ', (answer) => {
        handleOption(answer);
    });
}

/*
* @param {function(Number)} func - function
* @param {Number} bottomEdge
* @param {Number} topEdge
* @param {Number} stringCount - count of string
* */
function drawSymbolPlot(func, bottomEdge, topEdge, stringCount){
	console.clear();
    const columnTerminal = process.stdout.columns - widthDelta;
    const rowsTerminal = process.stdout.rows -7;
    
    let step = (topEdge - bottomEdge)/stringCount;
    let maxXLength = Number.MIN_VALUE;
    for(let i = bottomEdge; i <= topEdge; i++){
        maxXLength = Math.max(maxXLength, String(Math.round(i*step*10/koeficient)/10).length)
    }
    let usesSpace = columnTerminal - maxXLength;
    let minimum = Number.MAX_VALUE,
        maximum = Number.MIN_VALUE;
    for(let i = bottomEdge; i <= topEdge; i+= step){ // make maximum and minimum values
        minimum = Math.min(func(i/koeficient), minimum);
        maximum = Math.max(func(i/koeficient), maximum);
    }
    let localMin = minimum/(maximum - minimum)*(usesSpace);
    let localMax = maximum/(maximum - minimum)*(usesSpace);
    let valuesY = [];
    let lengthValues = 0;

    for(let i = Math.round(localMin); i <= Math.round(localMax); i++){ // create array with all values of y-axis
        if(i%10 === 0) {
            let riska = Math.round((i/(usesSpace)*(maximum - minimum))*10)/10;
            valuesY.push(riska)
            lengthValues += String(riska).length;
        }
    }
    let maxLengthLine = (usesSpace-lengthValues+6);
    let firstLine = "┌";
    firstLine += "─".repeat(maxXLength);
    for(let i = 0; i < maxLengthLine; i++){ // draw y-axis line
        if(i%Math.round(maxLengthLine/valuesY.length) === 0 && valuesY[i/Math.round(maxLengthLine/valuesY.length)] !== undefined)
            firstLine += valuesY[i/Math.round(maxLengthLine/valuesY.length)];
        firstLine += "─";
    }
    console.log(firstLine)
    for(let i = bottomEdge, j = 0; i <= topEdge, j < stringCount; i++, j++){ // draw plot
        let value = func(i*step/koeficient)/(maximum - minimum)*(usesSpace);
        let resultString = "";
        if(j % 3 === 0)
            resultString += Math.round(i*step*10/koeficient)/10;
        else
            resultString += "│";
        resultString += " ".repeat(maxXLength - resultString.length);
        for(let k = localMin; k < Math.round(value)+1; k++){
            resultString += " ";
            if(resultString.length >= usesSpace+6){
                break
            }
        }
        if(value === localMin)
            resultString += "$"
        else if(value === localMax)
            resultString += "#"
        else
            resultString += "*";
        console.log(resultString);
    }
    console.log(`\x1b[35m$ - minimum; # - maximum;\x1b[0m  min=\x1b[32m${minimum}\x1b[0m; max=\x1b[32m${maximum}\x1b[0m;`);
    console.log("\x1b[34mclick arrows keyboard, or use mouse wheel :)\x1b[0m \x1b[31m(Maybe you should hold down the ctrl)\x1b[0m");
    console.log("\x1b[33mc-exit; m-menu; q-reduce width; w-increase width; ↑-move up; ↓-move down; →-increase argument; ←-reduce argument\x1b[0m")
}


readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
    if(idWindow === 1){
        displayMenu();
        askOption();
    }
    if(idWindow === 0){
        if (key.name === 'up') {
            bottomEdge -= 1;
            topEdge -= 1;
        } else if (key.name === 'down') {
            bottomEdge += 1;
            topEdge += 1;
        } else if (key.name === 'left') {
            koeficient++;
        } else if (key.name === 'right') {
            koeficient--;
        } else if (key.name === 'q') {
            widthDelta++;
        } else if (key.name === 'w' && widthDelta > 7) {
            widthDelta--;
        } else if (key.name === 'c') {
            process.exit(-1);
        } else if (key.name === 'm') {
            idWindow = 1;
            displayMenu();
            askOption();
        }
        let resultFunc = `(x)=>{return ${funcUse}}`;
        drawSymbolPlot(eval(resultFunc), bottomEdge, topEdge, rowsTerminal);

    }

});

displayMenu();
askOption();




