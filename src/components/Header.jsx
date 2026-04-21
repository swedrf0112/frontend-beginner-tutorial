import { NavLink } from 'react-router-dom'
import { pageLinks } from '../data/content'

function navClass({ isActive }) {
  return isActive
    ? 'text-sky-700 dark:text-sky-300'
    : 'text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white'
}

export function Header({ content, language, setLanguage, theme, setTheme }) {
  const isEnglish = language === 'en'
  const isDark = theme === 'dark'
  const languageLeftClass = isEnglish
    ? 'text-slate-500 dark:text-slate-500'
    : 'text-slate-950 dark:text-slate-950'
  const languageRightClass = isEnglish ? 'text-white dark:text-slate-950' : 'text-slate-500 dark:text-slate-500'
  const themeLeftClass = isDark
    ? 'text-slate-500 dark:text-slate-500'
    : 'text-slate-950 dark:text-slate-950'
  const themeRightClass = isDark ? 'text-white dark:text-slate-950' : 'text-slate-500 dark:text-slate-500'

  return (
    <>
      <div className="border-b border-slate-200/80 bg-white/70 text-xs text-slate-500 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70 dark:text-slate-400">
        <div className="site-frame flex items-center justify-between py-3">
          <span>{content.topbar}</span>
          <span>English / 繁中 / 简中 / 日本語</span>
        </div>
      </div>

      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/85">
        <div className="site-frame grid grid-cols-1 gap-4 py-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <div className="text-[34px] font-extrabold tracking-wide text-red-800">Asteron</div>

          <nav className="flex flex-wrap gap-2 text-sm font-semibold">
            {pageLinks.map((link) => (
              <div key={link.path} className="nav-dropdown group relative">
                <NavLink
                  to={link.path}
                  className={(navState) =>
                    `${navClass(navState)} flex items-center gap-2 rounded-full px-3 py-2`
                  }
                >
                  {link.label[language]}
                  <span className="text-[10px] transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180">
                    ▾
                  </span>
                </NavLink>
                <div className="nav-dropdown-panel">
                  <div className="nav-dropdown-title">{link.dropdownTitle[language]}</div>
                  <div className="grid gap-2">
                    {link.items.map((item) => (
                      <div key={item.title.zh} className="nav-dropdown-item">
                        <div className="font-semibold text-slate-800 dark:text-slate-100">{item.title[language]}</div>
                        <div className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                          {item.desc[language]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3 justify-self-start lg:justify-self-end">
            <button
              type="button"
              aria-label="toggle language"
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="toggle-pill"
            >
              <span className={`toggle-knob ${isEnglish ? 'translate-x-[30px]' : 'translate-x-0'}`} />
              <span className={`toggle-label ${languageLeftClass}`}>中文</span>
              <span className={`toggle-label ${languageRightClass}`}>EN</span>
            </button>
            <button
              type="button"
              aria-label="toggle theme"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="toggle-pill"
            >
              <span className={`toggle-knob ${isDark ? 'translate-x-[30px]' : 'translate-x-0'}`} />
              <span className={`toggle-label ${themeLeftClass}`}>Light</span>
              <span className={`toggle-label ${themeRightClass}`}>Dark</span>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
