#! /usr/bin/env node
const { program } = require('commander')
// Unused import
const path = require('path')
const removeFolder = require('./removeFolder')
const renameFolder = require('./renameFolder')
const createFolder = require('./createFolder');
const getList = require('./getList')


program
    .command('cr <folderName>')
    .description('Create new folder')
    .action(createFolder)

program
    .command('rm <folderName>')
    .description('Remove folder')
    .action(removeFolder)

program
    .command('rn <oldFolderName> <newFolderName>')
    .description('Rename folder')
    .action(renameFolder)

program
    .command('list')
    .description('Get current upload/dowload folder list')
    .action(getList)

program.parse()