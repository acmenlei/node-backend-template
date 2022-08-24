const express = require("express"),
  multiparty = require("multiparty"),
  fse = require("fs-extra"),
  path = require("path"),
  fs = require("fs"),
  router = express.Router();

const UPLOAD_DIR = path.resolve(__dirname, '../', "upload")

router.post("/upload", async function (req, res) {
  const form = new multiparty.Form({ uploadDir: 'temp' });
  form.parse(req);
  /**
   * name 前端formData append的key
   * chunk 前端formData append的value
   */
  form.on('file', async function (name, chunk) {
    // 存放切片的目录 filename.index.ext (存放在/public/upload/originalFilename)
    const chunkDir = `${UPLOAD_DIR}/${chunk.originalFilename.split(".")[0]}`
    if (!fse.existsSync(chunkDir)) {
      await fse.mkdirs(chunkDir)
    }
    // 按照索引编号index再次命名
    const dPath = path.join(chunkDir, chunk.originalFilename.split(".")[1])
    // 将上传的文件移动到我们的新目录下
    await fse.move(chunk.path, dPath, { overwrite: true })
    // 给出提示
    res.json({ code: 200, msg: "上传成功！" })
  })
})

router.post("/merge", async function (req, res) {
  const { name, length } = req.body;
  const fname = name.split(".")[0];
  // 拿到资源目录的所有切片
  let chunkDir = path.join(UPLOAD_DIR, fname);
  let chunks = await fse.readdir(chunkDir)

  const LAST_FILE_NAME = path.join(UPLOAD_DIR, name);

  chunks.sort((a, b) => a - b).map(chunk => {
    fs.appendFileSync(LAST_FILE_NAME, fs.readFileSync(`${chunkDir}/${chunk}`));
  })

  // 删除临时文件
  fse.removeSync(chunkDir);

  return res.json({ code: 200, msg: "merge ok!!!", url: `http://localhost:9001/upload/${name}` })
})


module.exports = router;