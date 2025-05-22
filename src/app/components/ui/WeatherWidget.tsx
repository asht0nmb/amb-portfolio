'use client';

import { useState, useEffect } from 'react';
import { 
  WiDaySunny, WiNightClear,
  WiDayCloudy, WiNightAltCloudy,
  WiCloudy,
  WiDayFog, WiNightFog,
  WiDayRain, WiNightRain,
  WiDaySnow, WiNightSnow,
  WiDayThunderstorm, WiNightThunderstorm,
  WiDayShowers, WiNightShowers,
  WiDaySleet, WiNightSleet,
} from 'react-icons/wi';

interface WeatherData {
  weatherCode: number;
  isDay: boolean;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let isActive = true;

    const getWeather = async (latitude: number, longitude: number) => {
      if (!isActive) return;
      
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code,is_day`
        );
        if (!response.ok) {
          throw new Error('Weather data unavailable');
        }
        const data = await response.json();
        
        if (!isActive) return;

        setWeather({
          weatherCode: data.current.weather_code,
          isDay: data.current.is_day === 1
        });
        setError(null);
      } catch (error) {
        if (!isActive) return;
        setError('Weather unavailable');
        console.error('Error fetching weather:', error);
      } finally {
        if (!isActive) return;
        setLoading(false);
      }
    };

    // Default to Seattle coordinates if geolocation fails
    const fallbackToDefault = () => {
      if (!isActive) return;
      getWeather(47.6062, -122.3321); // Seattle coordinates
    };

    // Start with fallback data immediately
    fallbackToDefault();

    // Then try to get actual location
    if (navigator.geolocation) {
      const timeoutId = setTimeout(fallbackToDefault, 10000); // Fallback after 10s if geolocation is slow

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutId);
          if (!isActive) return;
          getWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          clearTimeout(timeoutId);
          if (!isActive) return;
          console.error('Geolocation error:', error.message);
          // Already showing fallback data, no need to call fallback again
        },
        {
          timeout: 15000,          // 15 second timeout
          maximumAge: 300000,      // 5 minute cache
          enableHighAccuracy: false // Don't need high accuracy for weather
        }
      );
    }

    // Refresh weather data every 30 minutes
    const refreshInterval = setInterval(() => {
      if (!isActive) return;
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => getWeather(position.coords.latitude, position.coords.longitude),
          () => fallbackToDefault()
        );
      } else {
        fallbackToDefault();
      }
    }, 1800000); // 30 minutes

    return () => {
      isActive = false;
      clearInterval(refreshInterval);
    };
  }, [isMounted]);

  const getWeatherIcon = (code: number, isDay: boolean) => {
    // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
    if (code === 0) { // Clear sky
      return isDay ? <WiDaySunny className="w-5 h-5" /> : <WiNightClear className="w-5 h-5" />;
    } else if (code <= 2) { // Partly cloudy
      return isDay ? <WiDayCloudy className="w-5 h-5" /> : <WiNightAltCloudy className="w-5 h-5" />;
    } else if (code <= 49) { // Cloudy, foggy
      if (code >= 45) { // Foggy (45-48)
        return isDay ? <WiDayFog className="w-5 h-5" /> : <WiNightFog className="w-5 h-5" />;
      }
      return <WiCloudy className="w-5 h-5" />; // Cloudy is the same for day/night
    } else if (code <= 69) { // Drizzle (50-59) and Rain (60-69)
      if (code <= 59) { // Drizzle
        return isDay ? <WiDayShowers className="w-5 h-5" /> : <WiNightShowers className="w-5 h-5" />;
      }
      return isDay ? <WiDayRain className="w-5 h-5" /> : <WiNightRain className="w-5 h-5" />;
    } else if (code <= 79) { // Snow (70-79)
      return isDay ? <WiDaySnow className="w-5 h-5" /> : <WiNightSnow className="w-5 h-5" />;
    } else if (code <= 84) { // Rain showers
      return isDay ? <WiDayShowers className="w-5 h-5" /> : <WiNightShowers className="w-5 h-5" />;
    } else if (code <= 94) { // Snow/rain showers (85-94)
      if (code <= 89) { // Snow showers
        return isDay ? <WiDaySnow className="w-5 h-5" /> : <WiNightSnow className="w-5 h-5" />;
      }
      return isDay ? <WiDaySleet className="w-5 h-5" /> : <WiNightSleet className="w-5 h-5" />; // Mixed precipitation
    } else { // Thunderstorm (95-99)
      return isDay ? <WiDayThunderstorm className="w-5 h-5" /> : <WiNightThunderstorm className="w-5 h-5" />;
    }
  };

  if (!isMounted || loading) {
    return null;
  }

  if (error) {
    return null; // Silently fail if there's an error
  }

  if (!weather) {
    return null;
  }

  console.log('Current weather code:', weather.weatherCode, 'Is Day:', weather.isDay);
  
  return (
    <div className="text-neutral-800">
      {getWeatherIcon(weather.weatherCode, weather.isDay)}
    </div>
  );
} 