// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark py-5 mt-5 border-top border-secondary">
      <div className="container text-center">
        <Zap className="text-success mb-3" size={32} fill="currentColor" />
        <h2 className="fw-black italic text-uppercase text-success mb-3">
          PITCHPLUSE
        </h2>

        <p className="text-secondary small fw-bold text-uppercase tracking-widest">
          © 2026 PitchPluse News. All Rights Reserved.
        </p>
        <p className="text-secondary x-small fw-bold text-uppercase tracking-widest opacity-75 mb-4">
          Human-Quality AI Journalism
        </p>

        <div className="d-flex justify-content-center gap-4 mt-3 small fw-bold text-uppercase tracking-widest opacity-50">
          <Link
            to="/"
            className="text-white text-decoration-none hover-success transition-colors"
          >
            Privacy
          </Link>
          <Link
            to="/"
            className="text-white text-decoration-none hover-success transition-colors"
          >
            Terms
          </Link>
          <Link
            to="/"
            className="text-white text-decoration-none hover-success transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
