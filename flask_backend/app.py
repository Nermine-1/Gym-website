from flask import Flask, request, jsonify, session
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import hashlib
from functools import wraps

app = Flask(__name__)
# Apply a more specific CORS configuration
CORS(
    app,
    supports_credentials=True,
    resources={
        r"/api/*": {
            "origins": [
                "http://localhost:3000"
            ],  # Adjust if your frontend is on a different port
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "expose_headers": ["Content-Type"],
        }
    },
)
app.secret_key = "your-very-secure-secret-key"  # Change this!
app.config["SESSION_COOKIE_NAME"] = "gym_admin_session"
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SECURE"] = False  # Set to True in production with HTTPS
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
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
        if not session.get("admin_logged_in"):
            return jsonify({"error": "Unauthorized access. Admin login required."}), 401
        return f(*args, **kwargs)

    return decorated_function


# Admin authentication routes
@app.route("/api/admin/login", methods=["POST"])
def admin_login():
    data = request.json
    if data is None:
        return (
            jsonify({"error": "Invalid JSON or Content-Type not application/json"}),
            415,
        )

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM admins WHERE username = %s AND password = %s",
            (username, hash_password(password)),
        )
        admin = cursor.fetchone()
        conn.close()  # Close connection

        if admin:
            session["admin_logged_in"] = True
            session["admin_username"] = username
            return jsonify(
                {
                    "message": "Admin login successful",
                    "admin_username": session.get("admin_username"),
                }
            )
        else:
            return jsonify({"error": "Invalid admin credentials"}), 401
    except Error as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/admin/register", methods=["POST"])
def admin_register():
    data = request.json
    new_username = data["username"]
    new_password = data["password"]

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO admins (username, password) VALUES (%s, %s)",
            (new_username, hash_password(new_password)),
        )
        conn.commit()

        return jsonify({"message": "Admin created successfully"}), 201

    except Error as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json
    email = data["email"]
    full_name = data["fullName"]
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
            # Ensure 'id' is included in the user dictionary
            return jsonify(
                {
                    "message": "Login successful",
                    "user": {
                        "id": user["id"],
                        "full_name": user["full_name"],
                        "email": user["email"],
                    },
                }
            )
        else:
            return jsonify({"error": "Invalid email or password"}), 401
    except Error as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/register", methods=["POST"])
def register_plan():
    data = request.json
    if data is None:
        return (
            jsonify({"error": "Invalid JSON or Content-Type not application/json"}),
            415,
        )

    # Ensure user_id is present, otherwise it's a bad request or needs login
    user_id = data.get("user_id")
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

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


# Renamed and modified is_admin to return a boolean and handle session
def is_admin_check(username, password):
    if not username or not password:  # Added check for empty credentials
        return False
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM admins WHERE username = %s AND password = %s",
            (username, hash_password(password)),
        )
        admin = cursor.fetchone()
        conn.close()  # Close connection

        if admin:
            session["admin_logged_in"] = True
            session["admin_username"] = username
            return True  # Return boolean True
        return False  # Return boolean False
    except Error as e:
        # Log the error for server-side debugging
        print(f"Database error in is_admin_check: {e}")
        return False  # Return False on error


@app.route(
    "/api/admin/authenticate", methods=["POST"]
)  # Example direct admin login route
def authenticate_admin():
    data = request.json
    if data is None:
        return (
            jsonify({"error": "Invalid JSON or Content-Type not application/json"}),
            415,
        )

    username = data.get("username")
    password = data.get("password")

    if is_admin_check(username, password):
        return jsonify(
            {
                "message": "Admin login successful",
                "admin_username": session.get("admin_username"),
            }
        )
    else:
        return jsonify({"error": "Invalid admin credentials"}), 401


@app.route("/api/admin/logout", methods=["POST"])
@admin_login_required
def admin_logout():
    session.pop("admin_logged_in", None)
    session.pop("admin_username", None)
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
        total_members = cursor.fetchone()["total"]

        # Active subscriptions
        cursor.execute("SELECT COUNT(DISTINCT user_id) as active FROM registrations")
        active_subscriptions = cursor.fetchone()["active"]

        # Total revenue
        cursor.execute("SELECT SUM(price) as revenue FROM registrations")
        total_revenue = cursor.fetchone()["revenue"] or 0

        # Recent registrations
        cursor.execute(
            """
            SELECT r.*, u.full_name 
            FROM registrations r
            JOIN users u ON r.user_id = u.id
            ORDER BY r.date DESC
            LIMIT 5
        """
        )
        recent_registrations = cursor.fetchall()

        return jsonify(
            {
                "total_members": int(total_members),
                "active_subscriptions": active_subscriptions,
                "total_revenue": float(total_revenue),
                "recent_registrations": recent_registrations,
            }
        )
    except Error as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/admin/members", methods=["GET"])
@admin_login_required
def get_all_members():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT u.id, u.full_name, u.email, 
               COALESCE(r.plan, '-') as plan, 
               COALESCE(r.price, '-') as price, 
               COALESCE(r.date, '-') as join_date
            FROM users u
            LEFT JOIN registrations r ON u.id = r.user_id
            ORDER BY COALESCE(r.date, '-') DESC
        """
        )
        members = cursor.fetchall()

        return jsonify({"members": members})
    except Error as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/admin/members/<member_id>", methods=["DELETE"])
def delete_member(member_id):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        # First, delete any registrations associated with the user
        cursor.execute("DELETE FROM registrations WHERE user_id = %s", (member_id,))

        # Then, delete the user
        cursor.execute("DELETE FROM users WHERE id = %s", (member_id,))
        conn.commit()
        if cursor.rowcount > 0:
            return jsonify({"message": "Member deleted successfully"}), 200
        else:
            return jsonify({"error": "Member not found"}), 404
    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()


@app.route("/api/admin/members/<member_id>/subscription", methods=["DELETE"])
def cancel_member_subscription(member_id):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        # Delete the registration for the user
        # Assuming a user can have at most one active registration for simplicity
        # If multiple registrations are possible, you might need a registration_id
        cursor.execute("DELETE FROM registrations WHERE user_id = %s", (member_id,))
        conn.commit()
        if cursor.rowcount > 0:
            return (
                jsonify({"message": "Subscription cancelled successfully"}),
                200,
            )
        else:
            # This could mean the user had no active subscription or user_id was not found
            return (
                jsonify(
                    {
                        "error": "No active subscription found for this member or member not found"
                    }
                ),
                404,
            )
    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()


if __name__ == "__main__":
    app.run(debug=True)
