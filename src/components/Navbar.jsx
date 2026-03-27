// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav
      className="bg-black text-white sticky-top border-bottom border-secondary py-4"
      style={{ zIndex: 1050 }}
    >
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          {/* Logo */}
          <Link
            to="/"
            className="d-flex align-items-center gap-2 text-decoration-none"
            onClick={() => setIsMenuOpen(false)}
          >
            <div
              className="bg-success p-2 rounded-1 d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px" }}
            >
              <Zap className="text-black fill-current" size={24} />
            </div>
            <span
              className="fw-black text-uppercase italic h3 mb-0 tracking-tighter"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              PITCHPLUSE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="d-none d-lg-flex align-items-center gap-4">
            <Link
              to="/category/transfer"
              className="text-white text-decoration-none text-uppercase fw-bold small tracking-widest hover-success"
            >
              Transfers
            </Link>
            <Link
              to="/category/match"
              className="text-white text-decoration-none text-uppercase fw-bold small tracking-widest hover-success"
            >
              Match News
            </Link>
            <Link
              to="/category/club"
              className="text-white text-decoration-none text-uppercase fw-bold small tracking-widest hover-success"
            >
              Club News
            </Link>
            <Link
              to="/category/rumors"
              className="text-white text-decoration-none text-uppercase fw-bold small tracking-widest hover-success"
            >
              Rumors
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="btn btn-link text-white p-0 d-lg-none border-0 shadow-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden d-lg-none"
            >
              <div className="pt-4 pb-2 d-flex flex-column gap-3">
                <Link
                  to="/category/transfer"
                  className="text-white text-decoration-none text-uppercase fw-black h4 italic"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Transfers
                </Link>
                <Link
                  to="/category/match"
                  className="text-white text-decoration-none text-uppercase fw-black h4 italic"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Match News
                </Link>
                <Link
                  to="/category/club"
                  className="text-white text-decoration-none text-uppercase fw-black h4 italic"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Club News
                </Link>
                <Link
                  to="/category/rumors"
                  className="text-white text-decoration-none text-uppercase fw-black h4 italic"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Rumors
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
