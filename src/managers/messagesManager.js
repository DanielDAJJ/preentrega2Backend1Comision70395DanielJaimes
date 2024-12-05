import fs from 'fs';

export class messageManager {
    constructor() {
        this.messages = [];
        this.path = './src/managers/data/messages.json';
    };
    async getMessages() {
        try {
            const file = await fs.promises.readFile(this.path, "utf-8");
            this.messages = JSON.parse(file) || [];
            return this.messages;
        } catch (error) {
            console.error("Error al leer el archivo de mensajes:", error);
            return [];
        }
    }

    async saveMessages(message) {
        try {
            const messages = await this.getMessages();
            messages.push(message);
            await fs.promises.writeFile(this.path, JSON.stringify(messages, null, 2));
            return messages;
        } catch (error) {
            console.error("Error al guardar los mensajes:", error);
            throw new Error("No se pudo guardar el mensaje");
        }
    }
}