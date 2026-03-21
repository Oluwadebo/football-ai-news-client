import React from "react";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black py-5 mt-5 border-top border-secondary">
      <div className="container text-center">
        {/* Icon Logo */}
        <div className="d-flex justify-content-center mb-4">
          <div className="bg-success p-3 rounded-circle shadow-lg">
            <Zap className="text-black" size={32} fill="currentColor" />
          </div>
        </div>

        {/* Brand Name */}
        <h3 className="fw-black text-uppercase italic tracking-tighter mb-4 text-white">
          Pitch<span className="text-success">AI</span> News
        </h3>

        {/* Copyright */}
        <p className="text-secondary small fw-bold text-uppercase tracking-widest mb-4">
          © {new Date().getFullYear()} PitchAI News Network. Human-Quality AI
          Journalism.
        </p>

        {/* Links */}
        <div className="d-flex justify-content-center gap-4 small fw-bold text-uppercase tracking-widest opacity-50">
          <Link
            to="/"
            className="text-white text-decoration-none hover-success"
          >
            Privacy
          </Link>
          <Link
            to="/"
            className="text-white text-decoration-none hover-success"
          >
            Terms
          </Link>
          <Link
            to="/"
            className="text-white text-decoration-none hover-success"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
