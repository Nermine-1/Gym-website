from flask import Flask, request, jsonify, session
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import hashlib
from functools import wraps

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000"],  # Your React app's origin
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"],
        "expose_headers": ["Content-Type"],
    }
})
app.secret_key = 'your-very-secure-secret-key'  # Change this!
app.config['SESSION_COOKIE_NAME'] = 'gym_admin_session'
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SECURE'] = False  # Set to True in production with HTTPS
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "gym_website",
}

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# Admin login required decorator
def admin_login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('admin_logged_in'):
            return jsonify({"error": "Unauthorized access. Admin login required."}), 401
        return f(*args, **kwargs)
    return decorated_function

# Admin authentication routes
@app.route("/api/admin/login", methods=["POST"])
def admin_login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM admins WHERE username = %s AND password = %s",
            (username, hash_password(password)),
        )
        admin = cursor.fetchone()

        if admin:
            session['admin_logged_in'] = True
            session['admin_username'] = username
            return jsonify({"message": "Admin login successful"})
        return jsonify({"error": "Invalid admin credentials"}), 401
    except Error as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/admin/logout", methods=["POST"])
@admin_login_required
def admin_logout():
    session.pop('admin_logged_in', None)
    session.pop('admin_username', None)
    return jsonify({"message": "Admin logged out successfully"})

# Admin dashboard routes
@app.route("/api/admin/dashboard/stats", methods=["GET"])
@admin_login_required
def get_dashboard_stats():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        
        # Total members
        cursor.execute("SELECT COUNT(*) as total FROM users")
        total_members = cursor.fetchone()['total']
        
        # Active subscriptions
        cursor.execute("SELECT COUNT(DISTINCT user_id) as active FROM registrations")
        active_subscriptions = cursor.fetchone()['active']
        
        # Total revenue
        cursor.execute("SELECT SUM(price) as revenue FROM registrations")
        total_revenue = cursor.fetchone()['revenue'] or 0
        
        # Recent registrations
        cursor.execute("""
            SELECT r.*, u.full_name 
            FROM registrations r
            JOIN users u ON r.user_id = u.id
            ORDER BY r.date DESC
            LIMIT 5
        """)
        recent_registrations = cursor.fetchall()
        
        return jsonify({
            "total_members": total_members,
            "active_subscriptions": active_subscriptions,
            "total_revenue": float(total_revenue),
            "recent_registrations": recent_registrations
        })
    except Error as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/admin/members", methods=["GET"])
@admin_login_required
def get_all_members():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("""
            SELECT u.id, u.full_name, u.email, 
                   r.plan, r.price, r.date as join_date,
                   CASE WHEN r.user_id IS NOT NULL THEN 'Active' ELSE 'Inactive' END as status
            FROM users u
            LEFT JOIN registrations r ON u.id = r.user_id
            ORDER BY r.date DESC
        """)
        members = cursor.fetchall()
        
        return jsonify({"members": members})
    except Error as e:
        return jsonify({"error": str(e)}), 500

# Keep your existing routes (signup, login, register, etc.)
# ... [your existing routes remain unchanged]

if __name__ == "__main__":
    app.run(debug=True)