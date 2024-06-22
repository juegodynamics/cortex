import * as fs from "fs";
import * as path from "path";
import * as htmlparser2 from "htmlparser2";
import * as css from "css";
import { Buffer } from "buffer";

type resolveFn<InT, OutT extends InT> = (input: InT) => input is OutT;
const makeResolver =
    <InT, OutT extends InT>(condition: boolean): resolveFn<InT, OutT> =>
    (input: InT): input is OutT =>
        condition;

/**
 * Extracts and saves icons from a style element to a specified directory.
 * @param htmlContent - The HTML content containing the style element.
 * @param outputDir - The directory to save the extracted icons.
 */
export async function extractAndSaveIcons(
    htmlContent: string,
    outputDir: string
) {
    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Parse the HTML content to extract the style element content
    let styleContent = "";
    let inStyle = false;

    const parser = new htmlparser2.Parser(
        {
            onopentag(name, attributes) {
                if (name === "style") {
                    inStyle = true;
                }
            },
            ontext(text) {
                if (inStyle) {
                    styleContent += text;
                }
            },
            onclosetag(tagname) {
                if (tagname === "style") {
                    inStyle = false;
                }
            },
        },
        { decodeEntities: true }
    );
    parser.write(htmlContent);
    parser.end();

    // Parse the CSS rules to find background-image URLs
    const cssParsed = css.parse(styleContent);
    const rules = cssParsed.stylesheet?.rules || [];

    rules.forEach((rule) => {
        if (makeResolver<typeof rule, css.Rule>(rule.type === "rule")(rule)) {
            rule.declarations?.forEach((declaration) => {
                if (
                    makeResolver<typeof declaration, css.Declaration>(
                        declaration.type === "declaration"
                    )(declaration) &&
                    declaration.property === "background-image"
                ) {
                    const regex = /url\((data:image\/png;base64,[^)]+)\)/;
                    const match = regex.exec(declaration.value as string);
                    if (match && match[1]) {
                        const base64Data = match[1].replace(
                            /^data:image\/png;base64,/,
                            ""
                        );
                        const buffer = Buffer.from(base64Data, "base64");
                        const iconName =
                            (rule.selectors || [])
                                .join("_")
                                .replace(/[^\w\-]/g, "") + ".png";
                        const outputPath = path.join(outputDir, iconName);
                        fs.writeFileSync(outputPath, buffer);
                        console.log(`Saved icon: ${outputPath}`);
                    }
                }
            });
        }
    });
}

console.log(`Beginning extraction`);

extractAndSaveIcons(
    fs.readFileSync("./src/scripts/icon/iconTest.html", { encoding: "utf-8" }),
    "./src/scripts/icon/test"
).then(() => {
    console.log(`Finished extraction`);
});
