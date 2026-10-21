import { NavLink, Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="app">
      <header className="app-header">
        <p className="app-title">Task Tracker</p>
        <nav aria-label="Основная навигация">
          <NavLink to="/tasks" end>
            Задачи
          </NavLink>
          <NavLink to="/tasks/new">Создать</NavLink>
        </nav>
        <p className="app-note">
          Данные временно хранятся только в памяти открытого приложения. После
          обновления страницы список восстанавливается из демонстрационного набора.
        </p>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
