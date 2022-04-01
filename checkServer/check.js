// var fs = require('fs')
// var path = require('path')

// var filepath = `/Users/manqingchen/Downloads/micro-notice-release/`;
// var ret = []
// var sList = ['test','debug']

// const filter = (f) =>{
//   let ext = path.extname(f)
//   if (f.startsWith('.')||(ext==='.zip')||(ext!=='.js')) {
//     return false
//   }else{
//     return true
//   }
// }


// const searchFile = (f,r) =>{
//   const data = fs.readFileSync(f,'utf-8')
//   let find = false

//   sList.map((item,j)=>{
//     let sRet = { key: item, list:[] }
//     data.split(/\r?\n/).forEach((line,i) =>  {
//       if (line.includes(sList[j])) {
//         r.find = true
//         let fLine = line.replace(new RegExp(sList[j], 'g'),`<i>${sList[j]}</i>`)
//         sRet.list.push({id:i, line: fLine })
//       }
//     })
//     r.list.push(sRet);
//   })
  
// }

// const scan = (fp) => {
//   const files = fs.readdirSync(fp);
//   files.map((item,i)=>{
//     let fullPath = `${fp}${item}`
//     let r = { file:item, path:fullPath, list: [], find:false }
//     let stat = fs.lstatSync(fullPath)

//     // 如果是文件进行搜索
//     if (!stat.isDirectory() && filter(item) ) {
//       searchFile(`${fp}${item}`,r)
//       if (r.find) {
//         ret.push(r)
//       }
//     } else if (stat.isDirectory()) {
//       scan(`${fullPath}/`)
//     }
//   })
// }


// scan(filepath)


// ret.map((item,i)=>{
//   item.list.map((keyItem,j)=>{
//     if (keyItem.list.length>0) {
//       console.log(item.file)
//       console.log(keyItem.key)
//       keyItem.list.map((o,j)=>{
//         console.log(`${o.id}:${o.line}`)
//       })
//     }
//   })
  
// })




var fs = require('fs')
var path = require('path')

var filepath = `/Users/manqingchen/Downloads/micro-notice-release/`;
var _ret = []
var sList = ['test','debug']

const filter = (f) =>{
  let ext = path.extname(f)
  if (f.startsWith('.')||(ext==='.zip')||(ext!=='.js')) {
    return false
  }else{
    return true
  }
}


const searchFile = (f,r,key) =>{
  const data = fs.readFileSync(f,'utf-8')
  data.split(/\r?\n/).forEach((line,i) =>  {
    if (line.includes(key)) {
      r.find = true
      let fLine = line.replace(new RegExp(key, 'g'),`<i>${key}</i>`)
      r.list.push({id:i, line: fLine })
    }
  })
}

const scan = (fp,ret) => {
  const files = fs.readdirSync(fp);
  files.map((item,i)=>{
    let fullPath = `${fp}${item}`
    let r = { file:item, path:fullPath, list: [], find:false }
    let stat = fs.lstatSync(fullPath)

    // 如果是文件进行搜索
    if (!stat.isDirectory() && filter(item) ) {
      searchFile(`${fp}${item}`,r,ret.key)
      if (r.find) {
        ret.list.push(r)
      }
    } else if (stat.isDirectory()) {
      scan(`${fullPath}/`,ret)
    }
  })
}

sList.map((keyItem,q)=>{
  let ret = {key:keyItem, list:[]}
  scan(filepath,ret)
  _ret.push(ret)
})


console.log(JSON.stringify(_ret))

// _ret.map((item,i)=>{
//   console.log(item.key)
//   item.list.map((o,j)=>{
//     console.log(o.file)
//     o.list.map((o,j)=>{
//       console.log(`${o.id}:${o.line}`)
//     })

//   })
// })