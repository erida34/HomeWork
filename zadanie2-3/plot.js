import {Window} from "./window.js";
import {Variables} from "./variables.js";
export class Plot extends Window {
    /**
     * @param {function(Number)} func - function
     * @param {Number} bottomEdge
     * @param {Number} topEdge
     * @param {Number} stringCount - count of string
     */
    static drawSymbolPlot(func, bottomEdge, topEdge, stringCount) {
        Window.clear();
        const {stdout} = process;
        const columnTerminal = Math.floor((stdout.getWindowSize()[0]) - Variables.widthDelta);
        let all_values = [];
        let step = (topEdge - bottomEdge) / stringCount;
        let maxXLength = Number.MIN_VALUE;
        for (let i = bottomEdge; i <= topEdge; i++) {
            maxXLength = Math.max(maxXLength, String(Math.round(i * step * 10 / Variables.koeficient) / 10).length)
        }
        let usesSpace = columnTerminal - maxXLength;
        let minimum = Number.MAX_VALUE,
            maximum = Number.MIN_VALUE;
        for (let i = bottomEdge; i <= topEdge; i += step) { // make maximum and minimum values
            minimum = Math.min(func(i / Variables.koeficient), minimum);
            maximum = Math.max(func(i / Variables.koeficient), maximum);
            all_values.push(func(i / Variables.koeficient));
        }
        let localMin = minimum / (maximum - minimum) * (usesSpace);
        let localMax = maximum / (maximum - minimum) * (usesSpace);
        let valuesY = [];
        let lengthValues = 0;

        for (let i = Math.round(localMin); i <= Math.round(localMax); i++) { // create array with all values of y-axis
            if (i % 10 === 0) {
                let riska = Math.round((i / (usesSpace) * (maximum - minimum)) * 10) / 10;
                valuesY.push(riska)
                lengthValues += String(riska).length;
            }
        }

        let maxLengthLine = (usesSpace - lengthValues + 6);
        let firstLine = "┌";
        firstLine += "─".repeat(maxXLength);
        for (let i = 0; i < maxLengthLine; i++) { // draw y-axis line
            if (i % Math.round(maxLengthLine / valuesY.length) === 0 && valuesY[i / Math.round(maxLengthLine / valuesY.length)] !== undefined)
                firstLine += valuesY[i / Math.round(maxLengthLine / valuesY.length)];
            firstLine += "─";
        }
        Variables.output_massive[0].push(firstLine);
        for (let i = bottomEdge, j = 0; i <= topEdge, j < stringCount; i++, j++) { // draw plot
            let value = func(i * step / Variables.koeficient) / (maximum - minimum) * (usesSpace);
            let resultString = "";
            if (j % 3 === 0)
                resultString += Math.round(i * step * 10 / Variables.koeficient) / 10;
            else
                resultString += "│";
            resultString += " ".repeat(maxXLength - resultString.length);
            for (let k = localMin; k < Math.round(value) + 1; k++) {
                resultString += " ";
                if (resultString.length >= usesSpace + 6) {
                    break
                }
            }
            if (value === localMin)
                resultString += "$"
            else if (value === localMax)
                resultString += "#"
            else
                resultString += "*";
            Variables.output_massive[0].push(resultString);
        }
        this.minimum = minimum;
        this.maximum = maximum;
        this.all_values = all_values;
        this.side_menu();
    }

    static getAverage(arr) {
        const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const avg = sum / arr.length;
        return avg;
    }

    static getMedian(arr) {
        arr.sort((a, b) => a - b);
        const mid = Math.floor(arr.length / 2);
        if (arr.length % 2 === 0) {
            return (arr[mid - 1] + arr[mid]) / 2;
        } else {
            return arr[mid];
        }
    }

    static getStandardDeviation(arr) {
        const n = arr.length;
        const mean = arr.reduce((acc, val) => acc + val, 0) / n;
        const variance = arr.reduce((acc, val) => acc + (val - mean) ** 2, 0) / (n - 1);
        const standardDeviation = Math.sqrt(variance);
        return standardDeviation;
    }

    static getDispersion(arr) {
        const n = arr.length;
        const mean = arr.reduce((acc, val) => acc + val, 0) / n;
        const sumSquares = arr.reduce((acc, val) => acc + (val - mean) ** 2, 0);
        const dispersion = sumSquares / n;
        return dispersion;
    }

    static getExcessKurtosis(arr) {
        const n = arr.length;
        const mean = arr.reduce((acc, val) => acc + val, 0) / n;
        const variance = arr.reduce((acc, val) => acc + (val - mean) ** 2, 0) / n;
        const stdDev = Math.sqrt(variance);

        const sumFourthPowerDeviations = arr.reduce((acc, val) => acc + (val - mean) ** 4, 0);
        const excessKurtosis = sumFourthPowerDeviations / (n * stdDev ** 4) - 3;

        return excessKurtosis;
    }

    static getSkewness(arr) {
        const n = arr.length;
        const mean = arr.reduce((acc, val) => acc + val, 0) / n;
        const variance = arr.reduce((acc, val) => acc + (val - mean) ** 2, 0) / n;
        const stdDev = Math.sqrt(variance);

        const sumThirdPowerDeviations = arr.reduce((acc, val) => acc + (val - mean) ** 3, 0);
        const skewness = sumThirdPowerDeviations / (n * stdDev ** 3);

        return skewness;
    }

    static side_menu() {
        Variables.output_massive[1].push('\x1b[35m$ - minimum;\x1b[0m');
        Variables.output_massive[1].push('\x1b[35m# - maximum;\x1b[0m');
        Variables.output_massive[1].push(' ');
        Variables.output_massive[1].push(`min = \x1b[32m${this.minimum}\x1b[0m;`);
        Variables.output_massive[1].push(`max = \x1b[32m${this.maximum}\x1b[0m;`);
        Variables.output_massive[1].push(`avg = \x1b[32m${this.getAverage(this.all_values)}\x1b[0m;`);
        Variables.output_massive[1].push(`median = \x1b[32m${this.getMedian(this.all_values)}\x1b[0m;`);
        Variables.output_massive[1].push(`standart deviation = \x1b[32m${this.getStandardDeviation(this.all_values)}\x1b[0m;`);
        Variables.output_massive[1].push(`dispersion = \x1b[32m${this.getDispersion(this.all_values)}\x1b[0m;`);
        Variables.output_massive[1].push(`excess = \x1b[32m${this.getExcessKurtosis(this.all_values)}\x1b[0m;`);
        Variables.output_massive[1].push(`skewness = \x1b[32m${this.getSkewness(this.all_values)}\x1b[0m;`);
        Variables.output_massive[1].push(' ');
        Variables.output_massive[1].push('\x1b[34mclick arrows keyboard, or use mouse wheel :)\x1b[0m');
        Variables.output_massive[1].push('\x1b[31m(Maybe you should hold down the ctrl)\x1b[0m');
        Variables.output_massive[1].push(' ');
        Variables.output_massive[1].push('\x1b[33mc - exit;\x1b[0m');
        Variables.output_massive[1].push('\x1b[33mm - menu;\x1b[0m');
        Variables.output_massive[1].push('\x1b[33mq - reduce width;\x1b[0m');
        Variables.output_massive[1].push('\x1b[33mw - increase width;\x1b[0m');
        Variables.output_massive[1].push('\x1b[33m↑ - move up;\x1b[0m');
        Variables.output_massive[1].push('\x1b[33m↓ - move down;\x1b[0m');
        Variables.output_massive[1].push('\x1b[33m→ - increase argument;\x1b[0m');
        Variables.output_massive[1].push('\x1b[33m← - reduce argument;\x1b[0m');
    }
}