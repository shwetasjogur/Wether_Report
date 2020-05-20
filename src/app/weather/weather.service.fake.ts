import { Observable, of } from 'rxjs';
import { IWeatherService } from '../weather/weather.service';
import { ICurrentWeather } from '../icurrent-weather';

export class WeatherServiceFake implements IWeatherService {
  private fakeWeather: ICurrentWeather = {
    City: 'Bursa',
    Country: 'TR',
    Date: 1485789600,
    Image: '',
    Temperature: 280.32,
    Description: 'light intensity drizzle'
  };

  public getCurrentWeather (City: string, Country: string): Observable<ICurrentWeather> {
    return of (this.fakeWeather)
  }
}
