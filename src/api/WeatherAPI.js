const API_KEY = '354411043b7a5321f9e6470538e56805';
const API_ROOT = 'http://api.openweathermap.org/data/2.5/weather';

export default class WeatherAPI {
  constructor(root = API_ROOT, key = API_KEY) {
    this.root = root;
    this.key = key;
  }

  async getDataForCity(city, units = 'metric') {
    const response = await fetch(`${this.root}?q=${city}&appid=${this.key}&units=${units}`);
    return response.json();
  }
}
