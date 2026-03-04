import axios from 'axios';

export class WeatherService {
  async getWeather(city: string) {
    const encodedCity = encodeURIComponent(city);
    const response = await axios.get(`https://wttr.in/${encodedCity}?format=j1`);
    return response.data;
  }
}
