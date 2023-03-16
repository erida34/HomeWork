import {Controls} from "./controls.js";
import {Menu} from "./menu.js";


export class Application {
    /**
     * Runs the application by creating a new instance of the Controls class and displaying the menu
     */
    static run() {
        new Controls();
        Menu.display();
    }
}