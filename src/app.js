const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname + '/../templates/views');
const partialsPath = path.join(__dirname + '/../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Frank Kiisa'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'This is some helpful text',
        name: 'Frank Kiisa'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Frank Kiisa'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Something went wrong with the address. Please try again!'
        })
    }

    geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
        if(err) {
            return res.send({ error: err })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article page not found!',
        name: 'Frank Kiisa'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found!',
        name: 'Frank Kiisa'
    })
})

app.listen(3000, () => {
    console.log('The server is running on port 3000');    
});