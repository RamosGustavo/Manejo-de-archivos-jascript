import fs from "fs";

export const writeFile = async (path, contents) =>
    await fs.promises.writeFile(path, JSON.stringify(contents, null, 2));

export const readFile = async (path) => {
    const data = await fs.promises.readFile(path, "utf8");
    return JSON.parse(data);
};
