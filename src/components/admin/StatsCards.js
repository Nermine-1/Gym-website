import "../../styles/admin/admin.css";

function StatsCards({ stats }) {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>Total Members</h3>
        <p>{stats?.total_members || 0}</p>
      </div>
      <div className="stat-card">
        <h3>Active Subscriptions</h3>
        <p>{stats?.active_subscriptions || 0}</p>
      </div>
      <div className="stat-card">
        <h3>Total Revenue</h3>
        <p>{stats?.total_revenue || "0.00"}DT</p>
      </div>
    </div>
  );
}

export default StatsCards;
