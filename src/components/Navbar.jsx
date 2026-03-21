import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Newspaper, Menu, X, LayoutDashboard, Search } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Transfers", path: "/category/transfer" },
    { name: "Match News", path: "/category/match" },
    { name: "Club News", path: "/category/club-news" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-secondary sticky-top py-3">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <div className="bg-success p-2 rounded-circle d-flex align-items-center justify-content-center">
            <Newspaper size={24} className="text-black" />
          </div>
          <span className="fw-black text-uppercase italic tracking-tighter fs-4">
            Pitch<span className="text-success">AI</span>
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Links */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-4">
            {navLinks.map((link) => (
              <li key={link.name} className="nav-item">
                <Link
                  to={link.path}
                  className={`nav-link fw-bold text-uppercase tracking-widest small ${
                    location.pathname === link.path
                      ? "text-success"
                      : "text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <button className="btn text-white p-0">
              <Search size={20} />
            </button>
            <Link
              to="/admin"
              className="btn btn-outline-success btn-sm rounded-0 fw-black text-uppercase px-3"
            >
              <LayoutDashboard size={16} className="me-2" />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
