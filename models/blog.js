//FIcRZ0o8kIVizqMR
//mongodb://lusonbds23:FIcRZ0o8kIVizqMR@ac-b0es4iz-shard-00-00.m3vfbdk.mongodb.net:27017,ac-b0es4iz-shard-00-01.m3vfbdk.mongodb.net:27017,ac-b0es4iz-shard-00-02.m3vfbdk.mongodb.net:27017/?ssl=true&replicaSet=atlas-1cter2-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blogbOOk
const mongoose=require('mongoose')
const schema= mongoose.Schema;
const blogschema= new schema({
  title:{
    type:String,
    require:true
  },
  snippet:{
    type:String,
    require:true
  },
  body:{
    type:String,
    require:true
  }
},{timestamps:true})

const Blog = mongoose.model('Blog',blogschema)

module.exports=Blog;