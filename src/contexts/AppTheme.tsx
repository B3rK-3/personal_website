import { createContext, useCallback, useMemo, useState } from 'react'

type WeatherSceneKind = 'sunny' | 'partly-sunny' | 'rain'

type MockWeatherScenario = {
  id: string
  label: string
  current: {
    is_day: 0 | 1
    shortwave_radiation: number
    cloud_cover: number
    precipitation: number
    visibility: number
    weather_code: number
  }
}

const MOCK_WEATHER_SCENARIOS = [
  {
    id: 'sunny-noon',
    label: 'Sunny noon',
    current: {
      is_day: 1,
      shortwave_radiation: 820,
      cloud_cover: 4,
      precipitation: 0,
      visibility: 20000,
      weather_code: 0,
    },
  },
  {
    id: 'cloudy-day',
    label: 'Cloudy day',
    current: {
      is_day: 1,
      shortwave_radiation: 360,
      cloud_cover: 82,
      precipitation: 0,
      visibility: 16000,
      weather_code: 3,
    },
  },
  {
    id: 'rainy-day',
    label: 'Rainy day',
    current: {
      is_day: 1,
      shortwave_radiation: 180,
      cloud_cover: 96,
      precipitation: 1.8,
      visibility: 9000,
      weather_code: 61,
    },
  },
  {
    id: 'foggy-day',
    label: 'Foggy day',
    current: {
      is_day: 1,
      shortwave_radiation: 240,
      cloud_cover: 74,
      precipitation: 0,
      visibility: 1800,
      weather_code: 45,
    },
  },
  {
    id: 'stormy-day',
    label: 'Stormy day',
    current: {
      is_day: 1,
      shortwave_radiation: 90,
      cloud_cover: 100,
      precipitation: 5.2,
      visibility: 4500,
      weather_code: 95,
    },
  },
  {
    id: 'night',
    label: 'Night',
    current: {
      is_day: 0,
      shortwave_radiation: 0,
      cloud_cover: 30,
      precipitation: 0,
      visibility: 18000,
      weather_code: 1,
    },
  },
] satisfies Array<MockWeatherScenario>

const MOCK_WEATHER_SCENARIO_IDS = MOCK_WEATHER_SCENARIOS.map(
  (scenario) => scenario.id,
)

type AppTheme = {
  dark: boolean
  themeAmount: number
  toggle: () => void
  bg: string
  text: string
  sub: string
  card: string
  border: string
  weatherScene: WeatherSceneKind
  weatherScenarioId: string
  weatherScenarioLabel: string
  weatherScenarios: Array<Pick<MockWeatherScenario, 'id' | 'label'>>
  setWeatherScenario: (scenarioId: string) => void
}

const lightTheme = {
  bg: '#f1e9da',
  text: '#1a1a2e',
  sub: '#666666',
  card: '#ffffff',
  border: '#ccc3b3',
}

const darkTheme = {
  bg: '#2e294e',
  text: '#f1e9da',
  sub: '#b6b5b5',
  card: '#4f4b6c',
  border: '#555555',
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value))
}

function mixChannel(from: number, to: number, amount: number) {
  return Math.round(from + (to - from) * amount)
}

function hexToRgb(hex: string) {
  const value = hex.replace('#', '')
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  }
}

function mixHex(from: string, to: string, amount: number) {
  const start = hexToRgb(from)
  const end = hexToRgb(to)
  return `rgb(${mixChannel(start.r, end.r, amount)}, ${mixChannel(
    start.g,
    end.g,
    amount,
  )}, ${mixChannel(start.b, end.b, amount)})`
}

function getWeatherThemeAmount(current: MockWeatherScenario['current']) {
  if (current.is_day === 0) return 1

  const radiationDarkness = 1 - clamp01(current.shortwave_radiation / 800)
  const cloudDarkness = clamp01(current.cloud_cover / 100) * 0.28
  const rainDarkness = clamp01(current.precipitation / 3) * 0.18
  const fogDarkness = clamp01((10000 - current.visibility) / 10000) * 0.18

  return clamp01(
    0.08 + radiationDarkness * 0.45 + cloudDarkness + rainDarkness + fogDarkness,
  )
}

function getWeatherScene(current: MockWeatherScenario['current']): WeatherSceneKind {
  if (current.precipitation > 0 || current.weather_code >= 51) return 'rain'
  if (current.cloud_cover > 35) return 'partly-sunny'
  return 'sunny'
}

const defaultTheme: AppTheme = {
  dark: false,
  themeAmount: 0,
  toggle: () => {},
  ...lightTheme,
  weatherScene: 'sunny',
  weatherScenarioId: MOCK_WEATHER_SCENARIOS[0].id,
  weatherScenarioLabel: MOCK_WEATHER_SCENARIOS[0].label,
  weatherScenarios: MOCK_WEATHER_SCENARIOS.map(({ id, label }) => ({ id, label })),
  setWeatherScenario: () => {},
}

export const AppThemeContext = createContext<AppTheme>(defaultTheme)

export function useAppTheme() {
  const [weatherScenarioId, setWeatherScenarioId] = useState(() => {
    if (typeof window === 'undefined') return MOCK_WEATHER_SCENARIOS[0].id
    const storedScenario = localStorage.getItem('app-weather-scenario')
    return storedScenario &&
      MOCK_WEATHER_SCENARIO_IDS.includes(storedScenario)
      ? storedScenario
      : MOCK_WEATHER_SCENARIOS[0].id
  })

  const weatherScenario =
    MOCK_WEATHER_SCENARIOS.find((scenario) => scenario.id === weatherScenarioId) ??
    MOCK_WEATHER_SCENARIOS[0]

  const setWeatherScenario = useCallback((scenarioId: string) => {
    if (!MOCK_WEATHER_SCENARIO_IDS.includes(scenarioId)) return
    setWeatherScenarioId(scenarioId)
    localStorage.setItem('app-weather-scenario', scenarioId)
  }, [])

  const themeAmount = getWeatherThemeAmount(weatherScenario.current)
  const dark = themeAmount >= 0.65

  const toggle = useCallback(() => {
    setWeatherScenario(dark ? 'sunny-noon' : 'night')
  }, [dark, setWeatherScenario])

  return useMemo(
    () => ({
      dark,
      themeAmount,
      toggle,
      bg: mixHex(lightTheme.bg, darkTheme.bg, themeAmount),
      text: mixHex(lightTheme.text, darkTheme.text, themeAmount),
      sub: mixHex(lightTheme.sub, darkTheme.sub, themeAmount),
      card: mixHex(lightTheme.card, darkTheme.card, themeAmount),
      border: mixHex(lightTheme.border, darkTheme.border, themeAmount),
      weatherScene: getWeatherScene(weatherScenario.current),
      weatherScenarioId: weatherScenario.id,
      weatherScenarioLabel: weatherScenario.label,
      weatherScenarios: MOCK_WEATHER_SCENARIOS.map(({ id, label }) => ({
        id,
        label,
      })),
      setWeatherScenario,
    }),
    [dark, setWeatherScenario, themeAmount, toggle, weatherScenario],
  )
}
