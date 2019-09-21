const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express congif
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup Handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Setup static dir to serve
app.use(express.static(publicDirPath));

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Adil'
    });
});

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About Me',
        name:'Adil'
    });
});

app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help',
        name:'Adil',
        helpText:'For help, please contact something@something.com'
    });
});

app.get('/weather',(req, res)=>{

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    }

    //We use desctucturing here for long, lat, and location
    geocode(req.query.address,(error, {longitude, latitude, location} = {})=>{

        if(error){
            return res.send({error:error});
        }

        forecast(longitude, latitude, (error, forecastData)=>{
            if(error){
                return res.send({
                    error:error
                });   
            }

            res.send({
                forecast:forecastData,
                location:location,
                address:req.query.address
            });

        });

    });

});

app.get('/products',(req, res)=>{

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        });
    }

    res.send({
        products:[]
    });
});

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'Adil',
        error:'The help article you are looking for does not exist'
    });
});

app.get('*',(req, res) => {
    res.render('404',{
        title:'404',
        name:'Adil',
        error:'Unable to find page'
    });
});

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});