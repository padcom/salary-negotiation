const API_KEY = '354411043b7a5321f9e6470538e56805';
const API_ROOT = 'http://api.openweathermap.org/data/2.5/weather';

export default class WeatherAPI {
  constructor(root = API_ROOT, key = API_KEY) {
    this.root = root;
    this.key = key;
  }

  async getWeatherForCity(city, units = 'metric') {
    console.log('1');
    const response = await fetch(`${this.root}?q=${city}&appid=${this.key}&units=${units}`);
    console.log('2', response);
    const data = await response.json();
    console.log('3', data);

    return data.main;
  }
}
