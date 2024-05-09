#!/usr/bin/env node

import { readdirSync, readFileSync, statSync } from "fs"
import { basename, join } from "path"
import Table from "cli-table3"
import figlet from "figlet"

//---------------------------------- CONST AND VARIABLES ----------------------------------//

const codebaseName = basename(process.cwd())
const ignorePaths = ["node_modules", "package.json", "package-lock.json"]

let dirCount = 0
let fileCount = 0
let linesOfCode = 0

const countDirFileLines = (path: string) => {
    const currentPath: string[] = readdirSync(path)

    currentPath.forEach((fileOrDirectory) => {
        const filePath = join(path, fileOrDirectory)

        // TODO: add better  checks
        if (!fileOrDirectory.startsWith(".") && !ignorePaths.includes(fileOrDirectory)) {
            if (statSync(filePath).isDirectory()) {
                countDirFileLines(filePath)
                dirCount++
            }
            else {
                const fileContents = readFileSync(filePath, "utf8").toString()
                linesOfCode += fileContents.split('\n').length
                fileCount++
            }
        }
    })
}

countDirFileLines(process.cwd())

var table = new Table({
    colWidths: [30, 30],
})

table.push(
    ['Codebase name', codebaseName],
    ['Directories', dirCount],
    ['Files', fileCount],
    ['Lines of Code', linesOfCode],
)

//----------------------------------- PRINT STATISTICS -----------------------------------//

figlet.text(
    "Codebase Stats",
    {
        font: "Small Slant",
        horizontalLayout: "default",
        verticalLayout: "default",
        whitespaceBreak: true,
        width: 200,
    },
    function (err, data) {
        if (err) {
            console.log("Something went wrong...")
            console.dir(err)
            return
        }
        console.log(data)
        console.log(table.toString())
    }
)


