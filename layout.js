import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
            Not having an account?  <Link class="button-81" to="/signup">Signup</Link>
        </ul>
      </nav>
      <Outlet />
    </>
  )
};
export default Layout;