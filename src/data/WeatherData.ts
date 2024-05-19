import { Weather } from '../types/Weather.ts';
import { WeatherType } from '../enums/WeatherType.ts';

export const WeatherData: Weather[] = [
  { id: WeatherType.CLEARSKIES, name: 'Clear Skies' },
  { id: WeatherType.FAIRSKIES, name: 'Fair Skies' },
  { id: WeatherType.CLOUDS, name: 'Clouds' },
  { id: WeatherType.FOG, name: 'Fog' },
  { id: WeatherType.WIND, name: 'Wind' },
  { id: WeatherType.GALES, name: 'Gales' },
  { id: WeatherType.RAIN, name: 'Rain' },
  { id: WeatherType.SHOWERS, name: 'Showers' },
  { id: WeatherType.THUNDER, name: 'Thunder' },
  { id: WeatherType.THUNDERSTORMS, name: 'Thunderstorms' },
  { id: WeatherType.DUSTSTORMS, name: 'Dust Storms' },
  { id: WeatherType.HEATWAVES, name: 'Heat Waves' },
  { id: WeatherType.SNOW, name: 'Snow' },
  { id: WeatherType.BLIZZARDS, name: 'Blizzards' },
  { id: WeatherType.GLOOM, name: 'Gloom' },
];

export const WeathersById = WeatherData.reduce(
  (r, w) => {
    r[w.id] = w.name;
    return r;
  },
  {} as Record<WeatherType, string>
);
