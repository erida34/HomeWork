import {Window} from "./window.js";
import {Menu} from "./menu.js";
import {Plot} from "./plot.js";
import {Variables} from "./variables.js";
import * as readline from 'readline';
/**
 * Class that handles the controls of the Application
 */
export class Controls {
    constructor() {
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);
        process.stdin.on('keypress', (str, key) => {
            if (Window.valid_menu_id === 1) {
                Menu.display();
            }
            if (Window.valid_menu_id === 0) {
                if (key.name === 'up') {
                    Variables.bottomEdge -= 1;
                    Variables.topEdge -= 1;
                } else if (key.name === 'down') {
                    Variables.bottomEdge += 1;
                    Variables.topEdge += 1;
                } else if (key.name === 'left') {
                    Variables.koeficient++;
                } else if (key.name === 'right') {
                    Variables.koeficient--;
                } else if (key.name === 'q') {
                    Variables.widthDelta++;
                } else if (key.name === 'w' && Variables.widthDelta > 55) {
                    Variables.widthDelta--;
                } else if (key.name === 'c') {
                    process.exit(-1);
                } else if (key.name === 'm') {
                    Window.valid_menu_id = 1;
                    Menu.display();
                }
                let resultFunc = `(x)=>{return ${Variables.funcUse}}`;
                const {stdout} = process;
                const rowsTerminal = stdout.getWindowSize()[1] - 4;
                Variables.output_massive = [[], []];
                Plot.drawSymbolPlot(eval(resultFunc), Variables.bottomEdge, Variables.topEdge, rowsTerminal);
                Window.formating_output(Variables.output_massive, 2);
            }

        });
    }
}