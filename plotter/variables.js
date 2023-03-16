import * as readline from 'readline';
const { stdout } = process;
const rowsTerminal = stdout.getWindowSize()[1] -4;
export class Variables {
    static koeficient = 8.0001;
    static widthDelta = 55;
    static bottomEdge = -rowsTerminal / 2;
    static topEdge = rowsTerminal / 2;
    static funcUse = "Math.sin(x)";
    static output_massive = [[], []];
    static rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
}