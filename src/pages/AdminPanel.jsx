import React from "react";
import {
  TrendingUp,
  Trash2,
  RefreshCw,
  Bell,
  Zap,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";

const AdminPanel = ({
  articles = [],
  pendingNews = [],
  notifications = [],
  settings = { autoMode: false },
  onDelete,
  onToggleAutomation,
  onRefreshDiscovery,
  isProcessing,
}) => {
  // Safety wrapper for formatting dates to prevent "Invalid Date" crashes
  const safeFormat = (dateString) => {
    try {
      return dateString ? format(new Date(dateString), "HH:mm") : "--:--";
    } catch (e) {
      return "00:00";
    }
  };

  return (
    <div className="container py-5">
      {/* --- HEADER & CONTROLS --- */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4 mb-5">
        <div>
          <h1 className="display-4 fw-black text-uppercase italic tracking-tighter mb-1">
            Admin Automation <span className="text-success">CENTER</span>
          </h1>
          {/* Pulse animation applied when isProcessing is true */}
          <p
            className={`text-uppercase fw-bold tracking-widest small mb-0 ${isProcessing ? "status-active" : "text-secondary"}`}
          >
            System Status:{" "}
            {isProcessing ? "SCANNING SATELLITE FEEDS..." : "IDLE"}
          </p>
        </div>

        <div className="d-flex gap-3">
          <button
            onClick={onRefreshDiscovery}
            disabled={isProcessing}
            className="btn btn-outline-secondary rounded-0 fw-black text-uppercase px-4 d-flex align-items-center gap-2"
          >
            <RefreshCw
              size={18}
              className={isProcessing ? "animate-spin" : ""}
            />
            Refresh Queue
          </button>
          <button
            onClick={onToggleAutomation}
            className={`btn ${settings.autoMode ? "btn-success text-black" : "btn-outline-success"} rounded-0 fw-black text-uppercase px-4 d-flex align-items-center gap-2`}
          >
            <Zap size={18} fill={settings.autoMode ? "currentColor" : "none"} />
            {settings.autoMode ? "AUTOMATION ON" : "ENABLE AUTO"}
          </button>
        </div>
      </div>

      <div className="row g-4">
        {/* --- LEFT COLUMN: PENDING QUEUE --- */}
        <div className="col-lg-8">
          <div className="bg-dark border border-secondary p-4 h-100">
            <div className="d-flex align-items-center gap-2 mb-4">
              <TrendingUp className="text-success" size={20} />
              <h3 className="fw-black text-uppercase italic mb-0 h4">
                Intelligence Queue
              </h3>
            </div>

            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle">
                <thead>
                  <tr className="text-secondary x-small fw-black text-uppercase tracking-widest border-bottom border-secondary">
                    <th>Source</th>
                    <th>News Title</th>
                    <th className="text-center">Score</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingNews?.map((item) => (
                    <tr
                      key={item.id}
                      className="border-bottom border-secondary-subtle"
                    >
                      <td className="small fw-bold text-success">
                        {item.source}
                      </td>
                      <td>
                        <div className="fw-bold text-uppercase small">
                          {item.title}
                        </div>
                        <div className="x-small text-secondary">
                          {safeFormat(item.discoveredAt)} • {item.status}
                        </div>
                      </td>
                      <td className="text-center">
                        <span
                          className={`badge rounded-0 ${item.score > 80 ? "bg-danger" : "bg-secondary"}`}
                        >
                          {item.score}
                        </span>
                      </td>
                      <td className="text-end">
                        <button className="btn btn-link text-white p-0 me-2">
                          <ExternalLink size={16} />
                        </button>
                        <button className="btn btn-link text-danger p-0">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {pendingNews.length === 0 && !isProcessing && (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-5 text-secondary fw-bold text-uppercase"
                      >
                        Queue is empty. Scanning for news...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: IMPACT ALERTS --- */}
        <div className="col-lg-4">
          <div className="bg-dark border border-secondary p-4">
            <div className="d-flex align-items-center gap-2 mb-4">
              <Bell className="text-success" size={20} />
              <h3 className="fw-black text-uppercase italic mb-0 h4">
                Impact Alerts
              </h3>
            </div>

            <div className="d-flex flex-column gap-3">
              {notifications?.map((note) => (
                <div
                  key={note.id}
                  className="p-3 border-start border-success bg-black border-2"
                >
                  <div className="d-flex justify-content-between mb-2">
                    <span className="x-small fw-black text-success text-uppercase tracking-widest">
                      {note.player}
                    </span>
                    <span className="x-small text-secondary">
                      {note.timestamp}
                    </span>
                  </div>
                  <h6 className="fw-black text-uppercase small mb-2">
                    {note.title}
                  </h6>
                  <p
                    className="x-small text-secondary mb-0"
                    style={{ lineHeight: "1.4" }}
                  >
                    {note.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- RECENTLY PUBLISHED (Live Articles) --- */}
      <div className="mt-5">
        <h3 className="fw-black text-uppercase italic mb-4">Live Database</h3>
        <div className="row g-3">
          {(articles || []).slice(0, 4).map((article) => (
            <div key={article.id} className="col-md-3">
              <div className="bg-dark p-3 border border-secondary d-flex justify-content-between align-items-center h-100">
                <div className="text-truncate me-2">
                  <div className="fw-bold text-uppercase x-small text-truncate">
                    {article.title}
                  </div>
                  <div className="x-small text-secondary">
                    ID: {article.id?.toString().slice(0, 8)}
                  </div>
                </div>
                <button
                  onClick={() => onDelete(article.id)}
                  className="btn btn-link text-danger p-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
