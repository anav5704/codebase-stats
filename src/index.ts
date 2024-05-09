#!/usr/bin/env node

import { readdirSync, statSync } from "fs"
import { basename, join } from "path"
import Table from "cli-table3"
import figlet from "figlet"

//---------------------------------- CONST AND VARIABLES ----------------------------------//

const codebaseName = basename(process.cwd())
const ignorePaths = ["node_modules"]

let fileCount = 0
let directoryCount = 0

const calculateFileFolderCount = (path: string) => {
    const currentPath: string[] = readdirSync(path)

    currentPath.forEach((fileOrDirectory) => {
        const filePath = join(path, fileOrDirectory)

        // TODO: add better  checks
        if (!fileOrDirectory.startsWith(".") && !ignorePaths.includes(fileOrDirectory)) {
            if (statSync(filePath).isDirectory()) {
                calculateFileFolderCount(filePath)
                directoryCount++
            }
            else {
                fileCount++
            }
        }
    })
}

calculateFileFolderCount(process.cwd())

var table = new Table({
    colWidths: [30, 30],
})

table.push(
    ['Codebase name', codebaseName],
    ['Directory count', directoryCount],
    ['File count', fileCount],
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


