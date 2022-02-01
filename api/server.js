const {urlencoded} = require('body-parser')
const express= require('express')
const multer= require('multer')
const path= require('path')
const storage = require('./config/uploads')
const app= express()
const database = require('./models')


app.use(express.static('public'))

const upload= multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  }
}).fields(
  [
    {
      name: 'images',
      maxCount: 3
    }
  ]
)

app.post('/pets', upload, async (req, res)=> {
  
  try{
  const data = { name: req.body.name, phone: req.body.phone}
  const user = await database.Users.create(data)
  if(!user) {
    return res.status(400).json({mensagem: "Opa você informou algo que não consigo entender"})
  } else {
    const reqImages = req.files.images
    const images = reqImages.map(image => { return {name: image.filename, user_id: user.id}})  
    await database.Images.bulkCreate(images)
    const newProfile = await database.Users.findOne({ include: 'Profile' })
    console.log()  
    res.status(201).json(newProfile)
  }
  }catch (err) {
    console.log(err)
  }
  
})




//const up = require('')

app.use(express.json())
app.use(urlencoded({extended: true}))

app.use('uploads', express.static(path.join(__dirname, '.', 'uploads')));
app.listen(3434, ()=>{
  console.log("api it's on!!")
})
