import * as ExcelJS from 'exceljs';

export async function readExcel(filePath: string, sheetName: string, columnName: string): Promise<string[]> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    // Obtener la hoja especificada
    const worksheet = workbook.getWorksheet(sheetName);

    // Verificar si la hoja existe
    if (!worksheet) {
        throw new Error(`No se encontró la hoja ${sheetName} en el archivo Excel.`);
    }

    // Obtener la columna especificada
    const column = worksheet.getColumn(columnName);

    // Verificar si la columna existe
    if (!column) {
        throw new Error(`No se encontró la columna ${columnName} en la hoja ${sheetName}.`);
    }

    const data: string[] = [];
    for (const cell of column.values) {
        if (cell) {
            data.push(cell.toString());
        }
    }

    return data;
}

export async function getExcelData(filePath: string) {
    const descripcionDatos = await readExcel(filePath, 'HojaPrueba', 'A');
    const nivelDatos = await readExcel(filePath, 'HojaPrueba', 'B');
    const dropdownDatos = await readExcel(filePath, 'HojaPrueba', 'C'); // Asume que la columna C contiene los valores del dropdown

    const randomIndexDescripcion = Math.floor(Math.random() * descripcionDatos.length);
    const descripcion = descripcionDatos[randomIndexDescripcion];

    const randomIndexNivel = Math.floor(Math.random() * nivelDatos.length);
    const nivel = nivelDatos[randomIndexNivel];

    const randomIndexDropdown = Math.floor(Math.random() * dropdownDatos.length);
    const dropdownValue = dropdownDatos[randomIndexDropdown];

    return { descripcion, nivel, dropdownValue };
}