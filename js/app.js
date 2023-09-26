const cityForm = document.querySelector('[data-js="change-location"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer = document
  .querySelector('[data-js="city-temperature"]')
const cityCard = document.querySelector('[data-js="city-card"]')
let timeImg = document.querySelector('[data-js="time"]')
let timeIconContainer = document.querySelector('[data-js="time-icon"]')

const getWeatherInfo = async inputValue => {
  const [{ Key, LocalizedName }] = await getCityData(inputValue)
  const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] = await
    getCityWeather(Key)

  return [LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon]
}

const setWeatherConditionsIntoDOM = (LocalizedName, WeatherText, Temperature) => {
  cityNameContainer.textContent = LocalizedName
  cityWeatherContainer.textContent = WeatherText
  cityTemperatureContainer.textContent = Temperature.Metric.Value
}

const setWeatherIconsIntoDOM = (IsDayTime, WeatherIcon) => {
  IsDayTime 
    ? timeImg.src = './src/day.svg' 
    : timeImg.src = './src/night.svg'
  const timeIcon = `<img src="./src/icons/${WeatherIcon}.svg" />`
  timeIconContainer.innerHTML = timeIcon
}

const displayWeatherCard = cityCard => {
  if (cityCard.classList.contains('d-none')) {
    cityCard.classList.remove('d-none')
  }
}

const handleFormData = async inputValue => {
  const [LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon] = 
    await getWeatherInfo(inputValue)

  setWeatherConditionsIntoDOM(LocalizedName, WeatherText, Temperature)
  setWeatherIconsIntoDOM(IsDayTime, WeatherIcon)
  displayWeatherCard(cityCard)
}

const handleFormSubmit = event => {
  event.preventDefault()
  const inputValue = event.target.city.value

  handleFormData(inputValue)
  
  cityForm.reset()
}

cityForm.addEventListener('submit', handleFormSubmit)
