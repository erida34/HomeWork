import {Window} from "./window.js";
import {Variables} from "./variables.js";

export class Menu extends Window {
    /**
     * Prompt the user to select an option from the menu.
     */
    static askOption() {
        Variables.rl.question('\x1b[33mSelect an option(default: 5):\x1b[0m ', (answer) => {
            this.handleOption(answer);
        });
    }

    /**
     * Handle the selected option based on the user's input.
     *
     * @param {string} option - The option selected by the user.
     */
    static handleOption(option) {
        switch (option) {
            case '1':
                Variables.rl.question('Enter function code\x1b[31m(you can use object Math from JS)\x1b[0m \nFor example: Math.sin(x), x*x, x^3, 1/x and etc.\nYour function: ', (answer) => {
                    if (answer !== "")
                        Variables.funcUse = answer;
                    this.display();
                });
                break;
            case '2':
                Variables.rl.question('Enter Сoefficient: ', (answer) => {
                    if (answer !== "" && !Number.isNaN(Number(answer)))
                        Variables.koeficient = answer;
                    this.display();
                });
                break;
            case '3':
                Variables.rl.question('Enter Bottom Edge: ', (answer) => {
                    if (answer !== "" && !Number.isNaN(Number(answer)))
                        Variables.bottomEdge = answer;
                    this.display();
                });
                break;
            case '4':
                Variables.rl.question('Enter Top Edge: ', (answer) => {
                    if (answer !== "" && !Number.isNaN(Number(answer)))
                        Variables.topEdge = answer;
                    this.display();
                });
                break;
            case '5':
                Window.valid_menu_id = 0;
                break;
            case '':
                Window.valid_menu_id = 0;
                break;
            default:
                console.log('Invalid option. Please try again.');
                this.display();
        }
    }

    /**
     * Display the menu with the current values of the function, coefficient, bottom edge, and top edge,
     * and prompt the user to select an option.
     */
    static display() {
        Window.clear();
        Window.valid_menu_id = 2;
        console.log(`\x1b[36m1.\x1b[0m Function: \x1b[32m${Variables.funcUse}\x1b[0m`);
        console.log(`\x1b[36m2.\x1b[0m Сoefficient: \x1b[32m${Variables.koeficient}\x1b[0m`);
        console.log(`\x1b[36m3.\x1b[0m Bottom Edge: \x1b[32m${Variables.bottomEdge}\x1b[0m`);
        console.log(`\x1b[36m4.\x1b[0m Top Edge: \x1b[32m${Variables.topEdge}\x1b[0m`);
        console.log('\x1b[36m5.\x1b[0m \x1b[32mDone\x1b[0m');
        this.askOption();
    }
}