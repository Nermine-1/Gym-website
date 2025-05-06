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
    admin_username = data.get("admin_username")
    admin_password = data.get("admin_password")

    if not is_admin({"username": admin_username, "password": admin_password}):
        return jsonify({"error": "Unauthorized access. Admin only."}), 403

    new_username = data.get("new_username")
    new_password = data.get("new_password")

    if not new_username or not new_password:
        return (
            jsonify({"error": "Username and password for the new admin are required"}),
            400,
        )

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM admins WHERE username = %s", (new_username,))
        existing_admin = cursor.fetchone()

        if existing_admin:
            return jsonify({"error": "Username already exists"}), 400

        hashed_password = hash_password(new_password)

        cursor.execute(
            "INSERT INTO admins (username, password) VALUES (%s, %s)",
            (new_username, hashed_password),
        )
        conn.commit()

        return jsonify({"message": "Admin created successfully"}), 201

    except Error as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json
    email = data["email"]
    full_name = data["full_name"]
    password = hash_password(data["password"])

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO users (email, full_name, password) VALUES (%s, %s, %s)",
            (email, full_name, password),
        )
        conn.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except Error as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data["email"]
    password = hash_password(data["password"])

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM users WHERE email = %s AND password = %s", (email, password)
        )
        user = cursor.fetchone()
        if user:
            return jsonify({"message": "Login successful", "user": user})
        else:
            return jsonify({"error": "Invalid email or password"}), 401
    except Error as e:
        return jsonify({"error": str(e)}), 500

#eeee
@app.route("/api/register", methods=["POST"])
def register_plan():
    data = request.json
    user_id = data["user_id"]
    name = data["name"]
    email = data["email"]
    contact = data["contact"]
    date = data["date"]
    plan = data["plan"]
    price = data["price"]

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO registrations (user_id, name, email, contact, date, plan, price)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """,
            (user_id, name, email, contact, date, plan, price),
        )
        conn.commit()
        return jsonify({"message": "Plan registered successfully"}), 201
    except Error as e:
        return jsonify({"error": str(e)}), 500


def is_admin(request_data):
    username = request_data.get("username")
    password = request_data.get("password")

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