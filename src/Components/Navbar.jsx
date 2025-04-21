import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        padding: "12px 24px",
        borderBottom: "1px solid #ccc",
        backgroundColor: "#f8f9fa",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Link
        to="/"
        style={{
          marginRight: "20px",
          textDecoration: "none",
          color: "#333",
          fontWeight: "500",
          fontSize: "16px",
        }}
      >
        Home
      </Link>
      <Link
        to="/history"
        style={{
          textDecoration: "none",
          color: "#333",
          fontWeight: "500",
          fontSize: "16px",
        }}
      >
        History
      </Link>
    </nav>
  );
};

export default Navbar;
