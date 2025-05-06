import { useState } from "react";
import "../../styles/admin/admin.css";
import { useNavigate } from "react-router-dom";

function MembersTable({ members, onActionComplete }) {
  // Added onActionComplete prop
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = members.filter(
    (member) =>
      member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.plan &&
        member.plan.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const navigate = useNavigate(); // Added for navigation

  const handleDelete = async (memberId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this member and all their data?"
      )
    ) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/admin/members/${memberId}`,
          {
            method: "DELETE",
            credentials: "include", // Added for cookie-based auth
            // Add headers here if needed, e.g., for authorization
            // headers: {
            //   'Authorization': `Bearer ${yourAuthToken}`,
            // },
          }
        );
        if (response.ok) {
          console.log("Member deleted successfully:", memberId);
          navigate("."); // Navigate to current route to refresh data
        } else {
          const errorData = await response.json();
          console.error(
            "Failed to delete member:",
            errorData.error || response.statusText
          );
          alert(
            `Failed to delete member: ${errorData.error || response.statusText}`
          );
        }
      } catch (error) {
        console.error("Error deleting member:", error);
        alert(`Error deleting member: ${error.message}`);
      }
    }
  };

  const handleCancelSubscription = async (memberId) => {
    if (
      window.confirm(
        "Are you sure you want to cancel this member's subscription?"
      )
    ) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/admin/members/${memberId}/subscription`,
          {
            method: "DELETE",
            credentials: "include", // Added for cookie-based auth
            // Add headers here if needed
          }
        );
        if (response.ok) {
          console.log(
            "Subscription cancelled successfully for member:",
            memberId
          );
          navigate("."); // Navigate to current route to refresh data
        } else {
          const errorData = await response.json();
          console.error(
            "Failed to cancel subscription:",
            errorData.error || response.statusText
          );
          alert(
            `Failed to cancel subscription: ${
              errorData.error || response.statusText
            }`
          );
        }
      } catch (error) {
        console.error("Error cancelling subscription:", error);
        alert(`Error cancelling subscription: ${error.message}`);
      }
    }
  };

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

      {filteredMembers.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <table className="members-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Plan</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => {
              const joinDateObj = new Date(member.join_date);
              const isValidDate =
                member.join_date && !isNaN(joinDateObj.getTime());
              return (
                <tr key={member.id}>
                  <td>{member.full_name}</td>
                  <td>{member.email}</td>
                  <td>{member.plan || "-"}</td>
                  <td>
                    {isValidDate ? joinDateObj.toLocaleDateString() : "-"}
                  </td>
                  <td className="actions-cell">
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="action-button delete-button"
                      title="Delete Member"
                    >
                      <span role="img" aria-label="delete">
                        🗑️
                      </span>{" "}
                      {/* Delete Icon */}
                    </button>
                    {member.plan && member.plan !== "-" && (
                      <button
                        onClick={() => handleCancelSubscription(member.id)}
                        className="action-button cancel-subscription-button"
                        title="Cancel Subscription"
                      >
                        <span role="img" aria-label="cancel subscription">
                          🚫
                        </span>{" "}
                        {/* Cancel Icon */}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MembersTable;
