import { Locator, Page, expect } from "@playwright/test"

export class LoteManager{

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Método para generar un nombre de lote aleatorio
    public async generarNombreLote(): Promise<string> {
        const longitud = 8; // Longitud del nombre del lote
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let nombreLote = '';
        for (let i = 0; i < longitud; i++) {
            const indice = Math.floor(Math.random() * caracteres.length);
            nombreLote += caracteres.charAt(indice);
        }

        // Navegar a la página de creación de lote
        await this.page.getByText('Lotes').first().click();
        await this.page.getByText('Crear').click();

        // Rellenar el campo N° lote con el nombre generado
        await this.page.getByLabel('No° lote').fill(nombreLote);
        

        return nombreLote;
    }


   // Método para seleccionar la fecha actual desde el calendario
   public async seleccionarFechaActual(): Promise<void> {
    // Obtener la fecha actual
    const fechaActual = new Date();

    // Hacer clic en el botón para abrir el calendario
    await this.page.getByLabel('Open calendar').click();

    // Seleccionar el día actual desde el calendario
    const dia = fechaActual.getDate();
    await this.page.getByText(dia.toString(), { exact: true }).click();

    }
}