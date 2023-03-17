import {Controls} from "./controls.js";
import {Menu} from "./menu.js";


export class Application {
    /**
     * Runs the application by creating a new instance of the Controls class and displaying the menu
     */
    static run() {
    	if (!process.stdout.isTTY) {
  			console.log('that is not a tty terminal');
  			process.exit(0);
		}
        new Controls();
        Menu.display();
    }
}
