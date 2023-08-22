
const express = require('express')
const https = require("https")
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function (req,res) {
res.sendFile(__dirname + '/index.html')    
})


app.post("/weatherReport", function (req, res) {

    const apikey = "c4d1d3848d3eda8938e793a2230bfc1e"
    const query = req.body.cityName
    const unit = "metric"
    const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit+""

    https.get(weatherURL, function (response) {
        response.on('data',function name(data) {
          const WeatherObject = JSON.parse(data)
            console.log(WeatherObject)
            const temperature =  WeatherObject.main.temp
            const humidity = WeatherObject.main.humidity
            const weatherDescrpt = WeatherObject.weather[0].description
            const weatherIcon = WeatherObject.weather[0].icon
        const weatherUrl = "https://openweathermap.org/img/wn/"+ weatherIcon+"@2x.png"
            
            res.write(`<body style="background-color:black; color: white;  font-family: 'Lobster', cursive; ">
            <h1>Here is today's weather for ${query}</h1> \n
            <h1>The temperature is currently at ${temperature} degrees celcius</h1> \n
            <h1>And having its humidity levels at ${humidity}</h1> \n
            <h1>so its ${weatherDescrpt} today</h1> \n
            <img src="${weatherUrl}">
            </body>`)

            // res.write(`<h1>Here is today's weather for ${query}</h1>`)
            // res.write(`<h1>The temperature is currently at ${temperature} degrees celcius</h1>`)
            // res.write(`<h1>And having its humidity levels at ${humidity}</h1>`)
            // res.write(`<h1>so its ${weatherDescrpt} today</h1>`)
            // res.write(`<img src="${weatherUrl}">`)
        })
    })
})


app.listen(process.env.PORT || 3000,function (params) {
    console.log('Server has started on port 3000')
})