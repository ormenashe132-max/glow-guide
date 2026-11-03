import { NavLink } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
  return (
    <nav aria-label="ניווט ראשי">
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
      >
        כל המוצרים
      </NavLink>
    </nav>
  )
}

export default NavBar
