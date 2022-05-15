const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')
const warning2 = document.querySelector('.warning2')


const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=ce426e44831d5b5d8c278f8df4fa9c73'
const API_UNITS = '&units=metric'


const getWeather = () => {
    const city = input.value 
    const URL = API_LINK + city + API_KEY + API_UNITS

    if(input.value == ''){
        warning2.textContent = 'Wpisz nazwę miasta!'
    }else{

      axios.get(URL).then(res => {
        console.log(res.data)
        const temp = res.data.main.temp
        const hum = res.data.main.humidity
        const status = Object.assign ({}, ...res.data.weather)
      
        if(status.id >= 200 && status.id < 300){
        photo.setAttribute('src', './img/thunderstorm.png')
        }else if (status.id >= 300 && status.id < 400){
            photo.setAttribute('src', './img/drizzle.png')
        }else if (status.id >= 500 && status.id < 600){
            photo.setAttribute('src', './img/rain.png')
        }else if(status.id >= 600 && status.id < 700){
            photo.setAttribute('src', './img/ice.png')
        }else if (status.id >= 700 && status.id < 800){
            photo.setAttribute('src', './img/fog.png')
        }else if (status.id === 800){
            photo.setAttribute('src', './img/sun.png')
        }else if(status.id >= 801 && status.id < 900){
            photo.setAttribute('src', './img/cloud.png')
        }else{
            photo.setAttribute('src', './img/unknown.png')
        }
    
        cityName.textContent = res.data.name
        temperature.textContent = Math.floor(temp) + '°C'
        humidity.textContent = hum + '%'
        weather.textContent = status.main
        input.value = ''
        warning.textContent = ''
      
        }).catch(()=> warning.textContent = 'Wpisz poprawną nazwę miasta!') 
        input.value = ''
        warning.textContent = '' 
        cityName.textContent = ''
        temperature.textContent = ''
        humidity.textContent = ''
        weather.textContent = ''
        warning2.textContent = ''
        photo.setAttribute('src', './img/unknown.png')
    }
    
}


const enterKeyCheck = (e) => {
	if(e.key === 'Enter'){
		getWeather()
	}
}


input.addEventListener('keyup', enterKeyCheck)
button.addEventListener('click', getWeather)
