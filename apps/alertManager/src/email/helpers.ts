import { readFileSync } from "fs";
import { join } from "path";

/**
 * Replaces placeholders in the HTML string with actual data.
 *
 * @param html - The HTML string with placeholders (e.g., {{placeholder}}).
 * @param data - An object containing keys and their corresponding values for replacement.
 * @returns The updated HTML string with placeholders replaced.
 */
export function replacePlaceholders(html: string, data: Record<string, string>): string {
    return html.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
        if (key in data) {
            return data[key];
        } else {
            throw new Error(`No value provided for placeholder: {{${key}}}`);
        }
    });
}


/**
 * Reads an HTML file from the specified folder and returns its content as a UTF-8 string.
 * 
 * @param fileName - The name of the HTML file (e.g., 'example.html').
 * @param folder - The folder where the HTML files are located. Defaults to 'templates'.
 * @returns The content of the HTML file as a UTF-8 string.
 */
export function readHtmlFile(fileName: string, folder: string = "../templates"): string {
    const filePath = join(folder, fileName);
    try {
        const content = readFileSync(filePath, { encoding: "utf8" });
        return content;
    } catch (error) {
        if(error instanceof Error) 
            throw new Error(`Error reading file: ${error.message}`);
        else
            throw new Error('Unexpected Error in readHtmlfile function');
    }
}
