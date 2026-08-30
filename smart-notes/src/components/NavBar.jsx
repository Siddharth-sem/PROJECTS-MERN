import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Link to={"/login"}>Login</Link>
      <Link to={"/dashboard"}>Dashboard</Link>
      <Link to={"/register"}>Register</Link>
      <Link to={"/editor"}>NoteEditor</Link>
    </nav>
  )
}

export default NavBar
