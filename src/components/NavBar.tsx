import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="site-nav" aria-label="ניווט ראשי">
      <NavLink to="/" end className="nav-brand">
        <span>Glow</span> Guide
      </NavLink>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? 'nav-link nav-link-active' : 'nav-link'
        }
      >
        כל המוצרים
      </NavLink>
      <NavLink
        to="/routine"
        className={({ isActive }) =>
          isActive ? 'nav-link nav-link-active' : 'nav-link'
        }
      >
        השגרה שלי
      </NavLink>
      <NavLink
        to="/ingredients"
        className={({ isActive }) =>
          isActive ? 'nav-link nav-link-active' : 'nav-link'
        }
      >
        בודקת רכיבים
      </NavLink>
    </nav>
  )
}

export default NavBar
