import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MembersTable from './MembersTable';
import StatsCards from './StatsCards';
import '../../styles/admin/admin.css';

function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch dashboard stats
                const statsResponse = await fetch('http://localhost:5000/api/admin/dashboard/stats', {
                    credentials: 'include'
                });
                
                if (statsResponse.status === 401) {
                    navigate('/admin/login');
                    return;
                }
                
                const statsData = await statsResponse.json();
                setStats(statsData);

                // Fetch members
                const membersResponse = await fetch('http://localhost:5000/api/admin/members', {
                    credentials: 'include'
                });
                const membersData = await membersResponse.json();
                setMembers(membersData.members);

                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = async () => {
        await fetch('http://localhost:5000/api/admin/logout', {
            method: 'POST',
            credentials: 'include'
        });
        navigate('/admin/login');
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="admin-dashboard">
            <header className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </header>

            <StatsCards stats={stats} />
            <MembersTable members={members} />
        </div>
    );
}

export default AdminDashboard;