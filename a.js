const express = require('express');
const {DataTypes} = require('sequelize');
const { Sequelize } = require('sequelize');
const app = express();
const port = 7000
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const sequelize = new Sequelize(
  "Rumi",
  "postgres",
  "1",
  {
    dialect:'postgres',
    host:'localhost',
    port:'5432'
  }
)
   

const Samolet = sequelize.define('samolet', {
  nomer_samoleta:{type: DataTypes.INTEGER, primaryKey: true},
  model:{type: DataTypes.STRING, unique: true},
  data_izgotovlenie: {type:DataTypes.STRING},
  srok_akcpluatacii: {type:DataTypes.STRING},
  vmestimost: {type:DataTypes.STRING},
})

const Bileti = sequelize.define('bileti', {
    nomer_bileta:{type: DataTypes.INTEGER, primaryKey: true},
    kod_passazhira:{type: DataTypes.INTEGER, primaryKey: true},
    nomer_reysa: {type:DataTypes.STRING},
    cena_bileta: {type:DataTypes.STRING},
    posadochnoe_mesto: {type:DataTypes.STRING},
    kolichestvo_bagazha: {type:DataTypes.STRING},
    tip_bileta: {type:DataTypes.STRING},
  })

app.get('/add', async (req, res) => {
  const {  nomer_samoleta, model,data_izgotovlenie,srok_akcpluatacii,vmestimost } = req.body
  const samolet = await Samolet.create({   nomer_samoleta, model,data_izgotovlenie,srok_akcpluatacii,vmestimost })
  res.json(samolet)
})

app.get('/:id', async (req, res) => {
 const {nomer_bileta} = req.params 
 const bileti = Bileti.findByPk(nomer_bileta)
 res.json(bileti) 
})


const start = async (req, res) => {
  try{
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  }
  catch(e){
    console.log(e);
  }
}

start()