
const dirTree = require('directory-tree');
const path = require('path');
const _ = require('lodash')
const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

isRelevantFolder = (i) => !i.name.match(/^\.|node_modules/) && i.type === 'directory';

const foldersList = dirTree(path.join(__dirname, '../'), {extensions:/\.md/}).children.filter(isRelevantFolder)


const nav =  foldersList.map(folder => {
  return {
    text: _.startCase(folder.name),
    link: `/${folder.name}/`
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
  base: '/vuepress-test/',
  themeConfig: {
    home: true,
    nav,
    sidebar,
  }
}