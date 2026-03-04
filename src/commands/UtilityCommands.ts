import { WeatherService } from '../services/WeatherService';
import { UtilityService } from '../services/UtilityService';

export class UtilityCommands {
  private weatherService: WeatherService;
  private utilityService: UtilityService;

  constructor() {
    this.weatherService = new WeatherService();
    this.utilityService = new UtilityService();
  }

  async weather(city: string): Promise<void> {
    try {
      const data = await this.weatherService.getWeather(city);
      const current = data.current_condition[0];
      const area = data.nearest_area[0];
      
      console.log(`Weather for ${area.areaName[0].value}, ${area.country[0].value}:`);
      console.log(`Condition:   ${current.weatherDesc[0].value}`);
      console.log(`Temperature: ${current.temp_C}C / ${current.temp_F}F`);
      console.log(`Humidity:    ${current.humidity}%`);
      console.log(`Wind:        ${current.windspeedKmph} km/h`);
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  }

  async joke(): Promise<void> {
    try {
      const data = await this.utilityService.getJoke();
      console.log(data.setup);
      console.log(`-> ${data.punchline}`);
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  }

  async ip(): Promise<void> {
    try {
      const data = await this.utilityService.getIP();
      console.log(`IP:       ${data.ip}`);
      console.log(`City:     ${data.city}`);
      console.log(`Region:   ${data.region}`);
      console.log(`Country:  ${data.country_name}`);
      console.log(`Timezone: ${data.timezone}`);
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  }

  async quote(): Promise<void> {
    try {
      const data = await this.utilityService.getPokemon();
      console.log(`Name: ${data.name}`);
      console.log(`Height: ${data.height}`);
      console.log(`Weight: ${data.weight}`);
      console.log(`Abilities: ${data.abilities.map((a: any) => a.ability.name).join(', ')}`);
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  }

  uuid(count: number = 1): void {
    const uuids = this.utilityService.generateUUID(count);
    uuids.forEach(uuid => console.log(uuid));
  }

  password(length: number = 16): void {
    const password = this.utilityService.generatePassword(length);
    console.log(password);
  }

  hash(text: string, algorithm: string = 'sha256'): void {
    try {
      const hash = this.utilityService.hashText(text, algorithm);
      console.log(`${algorithm}: ${hash}`);
    } catch (error: any) {
      const message = error && error.message ? error.message : String(error);
      console.error(`Error hashing text with algorithm "${algorithm}": ${message}`);
      process.exitCode = 1;
    }
  }
}
