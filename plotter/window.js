/**
 * Class that represents the application window
 */
export class Window {
    static valid_menu_id;

    /**
     * Clears the console screen
     */
    static clear() {
        console.clear();
    }

    /**
     * Formats and outputs an array of columns in a table format
     *
     * @param {Array<Array<string>>} datable - array of columns with form [ ['1 row', '2 row'], ['1 row', '2 row'] ]
     * @param {number} tables_in_row - number of rows
     */
    static formating_output(datable, tables_in_row) {
        this.clear();
        const {stdout} = process;
        const columnTerminal = stdout.getWindowSize()[0];

        const all_tables = datable.length;
        const all_tables_rows = Math.ceil(all_tables / tables_in_row);
        const columns_for_datas = columnTerminal - tables_in_row - 1;
        let columns_for_table = [];
        let max_letters_table = [];
        let coefc_tables = [];
        for (let i = 0; i < datable.length; i++) {
            let max = 0;
            for (let j = 0; j < datable[i].length; j++) {
                max = Math.max(max, datable[i][j].replace(/\x1b\[\d+m/g, '').length);
            }
            max_letters_table.push(max);
        }
        for (let i = 0; i < tables_in_row; i++) {
            let max = 0;
            for (let j = 0; j < all_tables_rows; j++) {
                if (max_letters_table[i + j * tables_in_row] !== undefined)
                    max = Math.max(max, max_letters_table[i + j * tables_in_row])
            }
            coefc_tables.push(max)
        }
        for (let i = 0; i < coefc_tables.length; i++) {
            columns_for_table.push(Math.floor(coefc_tables[i] * columns_for_datas) / coefc_tables.reduce((partialSum, a) => partialSum + a, 0))
        }


        let height_of_rows = [];
        for (let i = 0; i < all_tables_rows; i++) {
            let max = 0;
            for (let j = 0; j < tables_in_row; j++) {
                if (datable[j + i * tables_in_row] !== undefined)
                    max = Math.max(max, datable[j + i * tables_in_row].length)
            }
            height_of_rows.push(max);
        }
        const all_rows = height_of_rows.reduce((partialSum, a) => partialSum + a, 0) + all_tables_rows + 1;
        let flag_rows_table = 0;
        let flag_rows = 0;
        for (let i = 0; i < all_rows; i++) {
            let result_string = "";
            switch (i) {
                case 0:
                    result_string += "╔";
                    for (let j = 0; j < tables_in_row; j++) {
                        result_string += "═".repeat(columns_for_table[j]);
                        if (j !== tables_in_row - 1)
                            result_string += "╦";
                    }
                    result_string += "╗";
                    break;
                case all_rows - 1:
                    result_string += "╚";
                    for (let j = 0; j < tables_in_row; j++) {
                        result_string += "═".repeat(columns_for_table[j]);
                        if (j !== tables_in_row - 1)
                            result_string += "╩";
                    }
                    result_string += "╝";
                    break;
                case height_of_rows[flag_rows_table] + 1:
                    result_string += "╠";
                    for (let j = 0; j < tables_in_row; j++) {
                        result_string += "═".repeat(columns_for_table[j]);
                        if (j !== tables_in_row - 1)
                            result_string += "╬";
                    }
                    result_string += "╣";
                    flag_rows_table++;
                    flag_rows = 0;
                    break;
                default:
                    result_string += "║";
                    for (let j = 0; j < tables_in_row; j++) {
                        if (datable[j + flag_rows_table * tables_in_row] === undefined)
                            continue;
                        if (datable[j + flag_rows_table * tables_in_row][flag_rows] === undefined)
                            datable[j + flag_rows_table * tables_in_row][flag_rows] = " ";
                        result_string += datable[j + flag_rows_table * tables_in_row][flag_rows];
                        result_string += " ".repeat((columns_for_table[j] - datable[j + flag_rows_table * tables_in_row][flag_rows].replace(/\x1b\[\d+m/g, '').length));
                        result_string += "║";
                    }
                    flag_rows++;
                    break;
            }
            console.log(result_string)
        }
    }
}