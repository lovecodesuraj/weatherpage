const path = require('path');
const express = require('express');//it actually returns just a function
const hbs = require('hbs');
const app=express();

const port=process.env.PORT||3000;
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

app.set('view engine','hbs')

const pathName=path.join(__dirname,'../public')

const viewsPath = path.join(__dirname, '../template/views')
app.set('views', viewsPath)

const partialsPath = path.join(__dirname, '../template/partials')
hbs.registerPartials(partialsPath)

app.use(express.static(pathName));

app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather Page',
    name:' Suraj Chaudhary'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About Page',
    name:' Suraj Chaudhary'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    title:'Help Page',
    help:'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    name:' Suraj Chaudhary'
  })
})



app.get('/weather',(req,res)=>{

const address=req.query.address;
  if(!req.query.address){
  return  res.send({
      error:'You must provide an address'
    })
  }
  geocode(address,(error,{latitude,longitude,location}={})=>{
  if (error) {
  return res.send({error:error})
  }
  forecast( latitude, longitude, (error, forecastdata) => {
    if (error) {
     return res.send({error:error})
    }
    res.send({
      location:location,
      forecast:forecastdata
    })
  })
  })
})

app.get('/products',(req,res)=>{
  res.send({
    product:[],
  })
})

app.get('/help/*',(req,res)=>{
  res.render('error',{
    title: '404 help Page',
    name:' Suraj Chaudhary',
  })
})


app.get('*',(req,res)=>{
  res.render('error',{
    title:'404 Page',
    name:' Suraj Chaudhary',
    Error: 'Page not found'
  })
})




app.listen(port,()=>{            
  console.log('the server is running');
})
