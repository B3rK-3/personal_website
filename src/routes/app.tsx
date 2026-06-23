import {
  Link,
  Outlet,
  createFileRoute,
  useLocation,
} from '@tanstack/react-router'
import { AppThemeContext, useAppTheme } from '../contexts/AppTheme'
import { WeatherScene } from '../components/WeatherScene'

export const Route = createFileRoute('/app')({
  component: AppLayout,
})
function AppLayout() {
  const theme = useAppTheme()
  const location = useLocation()
  const isIndex = location.pathname === '/app'
  const isThoughtPost = location.pathname.startsWith('/app/thoughts/post/')
  const backTo = isThoughtPost ? '/app/thoughts' : '/app'

  return (
    <AppThemeContext.Provider value={theme}>
      <div
        style={{
          backgroundColor: theme.bg,
          backgroundImage: `linear-gradient(color-mix(in srgb, ${theme.bg} 48%, transparent), color-mix(in srgb, ${theme.bg} 48%, transparent)), url('/bg.avif')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          color: theme.text,
        }}
        className="relative min-h-screen overflow-hidden transition-colors duration-300"
      >
        <WeatherScene weather={theme.weatherScene} />
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col px-3 py-4 font-sans sm:px-6 sm:py-10 lg:py-16">
          <div
            className="flex flex-1 flex-col rounded-[24px] border px-5 py-6 shadow-[0_24px_90px_rgba(26,26,46,0.18)] backdrop-blur-md sm:rounded-[32px] sm:px-8 sm:py-8"
            style={{
              backgroundColor: `color-mix(in srgb, ${theme.card} 88%, transparent)`,
              borderColor: theme.border,
            }}
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1">Welcome!</h1>
              <h2 className="text-xl">Eren Berke Dogan</h2>
              <p className="pt-4">
                <strong>about me:</strong> SWE @ Betterment. building stuff that scales. trying to grow on{' '}
                <a
                  href="https://x.com/numunebir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center opacity-40 hover:opacity-100 transition-opacity"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {' '}so give me a follow - I post cool stuff (sometimes).
              </p>
            </div>
            {/* <div
              className="mt-6 flex flex-col gap-2 rounded-2xl border px-4 py-3 text-sm sm:max-w-xs"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.card,
              }}
            >
              <label className="font-semibold" htmlFor="weather-scenario">
                mock weather
              </label>
              <select
                id="weather-scenario"
                value={theme.weatherScenarioId}
                onChange={(event) => theme.setWeatherScenario(event.target.value)}
                className="rounded-lg border px-3 py-2 outline-none transition-colors"
                style={{
                  borderColor: theme.border,
                  backgroundColor: theme.bg,
                  color: theme.text,
                }}
              >
                {theme.weatherScenarios.map((scenario) => (
                  <option key={scenario.id} value={scenario.id}>
                    {scenario.label}
                  </option>
                ))}
              </select>
              <div style={{ color: theme.sub }}>
                theme darkness: {Math.round(theme.themeAmount * 100)}%
              </div>
            </div> */}
            {!isIndex && (
              <Link
                to={backTo}
                className="inline-block pt-3 text-lg underline underline-offset-4 opacity-40 hover:opacity-100 transition-opacity"
              >
                ← back
              </Link>
            )}
            <div className={isIndex ? 'pt-[100px]' : ''}>
              <Outlet />
            </div>
          </div>
        </div>
        <p className="fixed bottom-6 left-0 right-0 z-10 text-center text-sm italic font-light opacity-30">
          Comparison is the thief of joy
        </p>
      </div>
    </AppThemeContext.Provider>
  )
}
