#!/usr/bin/env node

import { readdirSync, readFileSync, statSync } from "fs"
import { basename, join } from "path"
import { isValid } from "./is-valid"
import Table from "cli-table3"
import figlet from "figlet"

//---------------------------------- CONST AND VARIABLES ----------------------------------//

const codebaseName = basename(process.cwd())

let dirCount = 0
let fileCount = 0
let linesOfCode = 0

const countStats = (path: string) => {
    const currentPath: string[] = readdirSync(path)

    currentPath.forEach((fileOrDirectory) => {
        const filePath = join(path, fileOrDirectory)

        if (isValid(fileOrDirectory)) {
            if (statSync(filePath).isDirectory()) {
                countStats(filePath)
                dirCount++
            }
            else if (statSync(filePath).isFile()) {
                const fileContents = readFileSync(filePath, "utf8").toString()
                linesOfCode += fileContents.split('\n').length
                fileCount++
            }
        }
    })
}

countStats(process.cwd())

var table = new Table({
    colWidths: [30, 30],
})

table.push(
    ['Name', codebaseName],
    ['Lines of Code', linesOfCode],
    ['Files', fileCount],
    ['Directories', dirCount],
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


