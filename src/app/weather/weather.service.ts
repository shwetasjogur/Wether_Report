import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICurrentWeather } from '../icurrent-weather';

export interface IWeatherService {
  getCurrentWeather(City: string, Country: string): Observable<ICurrentWeather>;
}
interface ICurrentWeatherData {
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
  };
  sys: {
    country: string;
  };
  dt: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements IWeatherService {
  constructor(private httpClient: HttpClient) {}

  private transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
    return {
      City: data.name,
      Country: data.sys.country,
      Date: data.dt * 1000,
      Image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      Temperature: this.convertKelvinToFahrenheit(data.main.temp),
      Description: data.weather[0].description
    };
  }

  private convertKelvinToFahrenheit(kelvin: number): number {
    return (kelvin * 9) / 5 - 459.67;
  }

  getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
    return this.httpClient
      .get<ICurrentWeatherData>(
        `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?` +
          `q=${city},${country}&appid=${environment.appId}`
      )
      .pipe(map(data => this.transformToICurrentWeather(data)));
  }
}
