
const dirTree = require('directory-tree');
const path = require('path');
const _ = require('lodash')
const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

isRelevantFolder = (i) => !i.match(/^\.|node_modules/);
const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
  readdirSync(source).map(name => join(source, name)).filter(isDirectory)

const foldersList = getDirectories('./').filter(isRelevantFolder);

const nav =  foldersList.map(name => {
  return {
    text: _.startCase(name),
    link: `/${name}/`
  }
})

const sidebar = {}

nav.forEach((i) => {
  let mdFiles = dirTree(path.join(__dirname, `..${i.link}`), {extensions:/\.md/})

  sidebar[i.link] = mdFiles.children.map(children => {
    return path.parse(children.name).name !== 'README' ? path.parse(children.name).name : ''
  })
})

module.exports = {
  title: 'Frontend Craft Docs',
  themeConfig: {
    nav,
    sidebar,
  }
}