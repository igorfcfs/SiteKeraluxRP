import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`flex items-center justify-center w-9 h-9 rounded-lg border transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
        className ||
        'border-slate-200 bg-slate-100/80 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-white/10'
      }`}
      aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
      title={theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4" aria-hidden />
      ) : (
        <Moon className="w-4 h-4" aria-hidden />
      )}
    </button>
  )
}
