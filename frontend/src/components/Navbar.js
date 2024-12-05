import { Link } from 'react-router-dom'
import HamburgerMenu from './HamburgerMenu.js'

const Navbar = () => {


  return (
    <header>
      <div className="container">
        
      {<HamburgerMenu />}
        <Link to="/">
          <h1>Food Genie</h1>
        </Link>
        <nav>
            <div className="nav-right">
              
            </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar