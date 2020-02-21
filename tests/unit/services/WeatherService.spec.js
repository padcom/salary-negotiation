import WeatherService from '../../../src/services/WeatherService';

class MockWeatherAPI {
  constructor(temperatures) {
    this.temperatures = temperatures;
  }

  getDataForCity(city) {
    return {
      main: {
        temp: this.temperatures[city],
      },
    };
  }
}

describe('WeatherService', () => {
  it('will return temperature from weather data', async () => {
    const TEMPERATURE = 12.3;
    const CITY = 'London, uk';
    const service = new WeatherService(new MockWeatherAPI({
      [CITY]: TEMPERATURE,
    }));
    expect(await service.getTemperatureForCity(CITY)).toEqual(TEMPERATURE);
  });
});
