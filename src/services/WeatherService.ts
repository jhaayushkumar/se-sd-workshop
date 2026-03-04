import axios from 'axios';

export class WeatherService {
  async getWeather(city: string) {
    const response = await axios.get(`https://wttr.in/${city}?format=j1`);
    return response.data;
  }
}
