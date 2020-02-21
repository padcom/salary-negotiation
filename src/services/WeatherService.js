import WeatherAPI from '../api/WeatherAPI';

export default class WeatherService {
  constructor(api = new WeatherAPI()) {
    this.api = api;
  }

  async getTemperatureForCity(city, units = 'metric') {
    try {
      const data = await this.api.getWeatherForCity(city, units);
      return data.temp;
    } catch (e) {
      throw new Error(`Unable to retrieve temperature for ${city}: ${e.message}`);
    }
  }
}
