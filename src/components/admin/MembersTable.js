import { useState } from 'react';
import '../../styles/admin/admin.css';

function MembersTable({ members }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMembers = members.filter(member =>
        member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.plan && member.plan.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="members-table-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            <table className="members-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Plan</th>
                        <th>Join Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMembers.map((member) => (
                        <tr key={member.id}>
                            <td>{member.full_name}</td>
                            <td>{member.email}</td>
                            <td>{member.plan || '-'}</td>
                            <td>{new Date(member.join_date).toLocaleDateString()}</td>
                            <td>
                                <span className={`status-badge ${member.status.toLowerCase()}`}>
                                    {member.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MembersTable;