const readline = require('readline');

const { stdout } = process;
const rowsTerminal = stdout.getWindowSize()[1] -7;
let Koeficient = 8.0001;
let widthDelta = 8;
/*
* @param {Number} x - argument
* */
function sinusoid(x){
    return Math.sin(x);
}

function quad(x){
    return Math.sin(x);
}

let funcUse = quad;

/*
* @param {function(Number)} func - function
* @param {Number} bottomEdge
* @param {Number} topEdge
* @param {Number} stringCount - count of string
* */
function drawSymbolPlot(func, bottomEdge, topEdge, stringCount){
    console.clear();

    const columnTerminal = stdout.getWindowSize()[0] - widthDelta;
    let step = (topEdge - bottomEdge)/stringCount;
    let maxXLength = Number.MIN_VALUE;
    for(let i = bottomEdge; i <= topEdge; i++){
        maxXLength = Math.max(maxXLength, String(Math.round(i*step*10/Koeficient)/10).length)
    }
    let usesSpace = columnTerminal - maxXLength;
    let minimum = Number.MAX_VALUE,
        maximum = Number.MIN_VALUE;
    for(let i = bottomEdge; i <= topEdge; i+= step){ // make maximum and minimum values
        minimum = Math.min(func(i/Koeficient), minimum);
        maximum = Math.max(func(i/Koeficient), maximum);
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
        let value = func(i*step/Koeficient)/(maximum - minimum)*(usesSpace);
        let resultString = "";
        if(j % 3 === 0)
            resultString += Math.round(i*step*10/Koeficient)/10;
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
    console.log(`$ - minimum; # - maximum;  min=${minimum}; max=${maximum};`);
    console.log("click arrows keyboard, or use mouse wheel :) (Maybe you should hold down the ctrl)");
    console.log("c-exit; q-reduce width; w-increase width; ↑-move up; ↓-move down; →-increase argument; ←-reduce argument")
}
let bottomEdge = -rowsTerminal/2,
    topEdge = rowsTerminal/2;

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
    console.clear();
    if (key.name === 'up') {
        bottomEdge -= 1;
        topEdge -= 1;
    } else if (key.name === 'down') {
        bottomEdge += 1;
        topEdge += 1;
    } else if (key.name === 'left') {
        Koeficient++;
    } else if (key.name === 'right') {
        Koeficient--;
    } else if (key.name === 'q') {
        widthDelta++;
    } else if (key.name === 'w' && widthDelta > 7) {
        widthDelta--;
    } else if (key.name === 'c') {
        process.exit(-1);
    }

    drawSymbolPlot(funcUse, bottomEdge, topEdge, rowsTerminal);
});

drawSymbolPlot(funcUse, bottomEdge, topEdge, rowsTerminal);