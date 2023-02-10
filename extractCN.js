var fs = require('fs')
var path = require('path')//解析需要遍历的文件夹
var filePath = path.resolve('./pages')
let reg = /[\u4e00-\u9fa5\w\d]/g
let newObj = []

function array_unique(arr) {
    const newArr = []
    for(var i = 0 ;i<arr.length;i++) {
        newArr.push(...arr[i])
    }
    return newArr.filter(function(e,i,self){
        return self.indexOf(e) === i 
    })
}
//调用文件遍历方法
fileDisplay(filePath)
//文件遍历方法
function fileDisplay(filePath){
    const outpath = './build/cns.html'
    fs.unlink(outpath,function () {})
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename)
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror, stats){
                    if(eror){
                        console.warn('获取文件stats失败')
                    }else{
                        // 
                        var isFile = stats.isFile()//是文件
                        var isDir = stats.isDirectory()//是文件夹
                        if(isFile){
                            var content = fs.readFileSync(filedir, 'utf-8')
                            if(content.match(reg)){
                                newObj.push(content.match(reg))
                            }
                        }
                        if(isDir){
                            fileDisplay(filedir)//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            })
            fs.readFile('./build/cn.html', (err, data) => {
                newObj = array_unique(newObj)
                const bob = String(data.toString().replace(/\{\{someVal\}\}/, String(newObj)))
                fs.writeFile(outpath,bob,{encoding:'utf-8'},function (err){
                    if (err) {
                        console.log('写入失败')
                    }else{
                        console.log('成功') 
                    }
                })
            })
        }
    })

}