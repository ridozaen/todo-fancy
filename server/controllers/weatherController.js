const axios = require('axios');
module.exports = {
    currentWeatherLoc : (req,res)=>{
        axios.get('http://ip-api.com/json')
        .then(response=>{
            console.log(response.data)
            let city = response.data.city
            let country = response.data.country
            let latitude = response.data.lat
            let longitude = response.data.lon
            let weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.API_KEY}`
            console.log(weatherUrl)
            axios.get(`${weatherUrl}`)
            .then(response=>{
                console.log('response: ',response.data);
                res.status(200).json({result:response.data, city, country})
            })
            .catch(err=>{
                res.status(400).json({error : err.response.data})
            })
        })
        .catch(err=>{
            res.status(500).json({ error: err.response.data})
        })
    }
}