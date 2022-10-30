#! /usr/bin/env node
const { program } = require('commander')
const path = require('path')
const removeFolder = require('./removeFolder')
const renameFolder = require('./renameFolder')
const createFolder = require('./createFolder');


program
    .command('createFolder <folderName>')
    .description('Create new folder')
    .action(createFolder)

program
    .command('removeFolder <folderName>' )
    .description('Remove folder')
    .action(removeFolder)

program
    .command('renameFolder <oldFolderName> <newFolderName>' )
    .description('Rename folder')
    .action(renameFolder)

program.parse()