var express = require('express');
var fs = require('fs');
var path = require('path')
var formidable = require('formidable')
var router = express.Router()
var dayjs = require('dayjs')
var unzip = require('unzip')

var root = path.resolve(__dirname,'../')
var clone =(e)=> {
  return JSON.parse(JSON.stringify(e))
}

const PROJ_DIR = 'data/project/'

const filter = (f) =>{
  let ext = path.extname(f)
  if (f.startsWith('.')||(ext==='.zip')||(ext!=='.js')) {
    return false
  }else{
    return true
  }
}

const searchFile = (f,r,key,params) =>{
  const data = fs.readFileSync(f,'utf-8')
  data.split(/\r?\n/).forEach((line,i) =>  {

    var pat = (params)? new RegExp(`\\b${key}\\b`, 'g') : new RegExp(`${key}`, 'g')
    
    if (line.match(pat)!== null) {
      r.find = true
      let fLine = line.replace(new RegExp(key, 'g'),`<i>${key}</i>`)
      r.list.push({id:i, line: fLine })
    }
  })
}

const scan = (fp,ret,params) => {
  const files = fs.readdirSync(fp);
  files.map((item,i)=>{
    let fullPath = `${fp}${item}`
    let r = { file:item, path:fullPath, list: [], find:false }
    let stat = fs.lstatSync(fullPath)

    // 如果是文件进行搜索
    if (!stat.isDirectory() && filter(item) ) {
      searchFile(`${fp}${item}`,r,ret.key,params)
      if (r.find) {
        ret.list.push(r)
      }
    } else if (stat.isDirectory()) {
      scan(`${fullPath}/`,ret,params)
    }
  })
}


router.post('/analysis', function (req, res,next) {
  let filepath  = PROJ_DIR
  let {sList,whole} = req.body
  var _ret = []

  // console.log(whole,'whole')
  

  sList.map((keyItem,q)=>{
    let ret = {key:keyItem, list:[]}
    scan(filepath,ret,whole)
    _ret.push(ret)
  })

  res.status(200).json({
    code: 200,
    msg: '上传照片成功',
    data: _ret
  })
})


// 上传文件
router.post('/upload', function (req, res,next) {
  const form = formidable({uploadDir: `${__dirname}/../data`});
 

  form.on('fileBegin', function (name, file) {

    file.filepath = `data/${dayjs().format('YYYYMMDDhhmmss')}.zip`
  })
 
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    let projPath = files.file.filepath

    fs.readdirSync(PROJ_DIR).forEach(f => fs.rmSync(`${PROJ_DIR}/${f}`, { recursive: true, force: true }));

    // fs.rmSync(PROJ_DIR, { recursive: true, force: true });
    fs.createReadStream(projPath).pipe(unzip.Extract({ path: PROJ_DIR }));

    res.status(200).json({
      code: 200,
      msg: '上传照片成功',
      data: {path: projPath}
    })
  });
})


module.exports = router