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
              <Link to="/">Home</Link>
              <Link to="/">Recipies</Link>
            </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar