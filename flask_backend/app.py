from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import hashlib

app = Flask(__name__)
CORS(app)

db_config = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "gym_website",
}


def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()


@app.route("/api/admin", methods=["POST"])
def create_admin():

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
            (username, password),
        )
        admin = cursor.fetchone()

        if admin:
            return True
        return False
    except Error as e:
        return False


@app.route("/api/users", methods=["GET"])
def get_users():
    data = request.json
    if not is_admin(data):
        return jsonify({"error": "Unauthorized access. Admin only."}), 403

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, email, full_name FROM users")
        users = cursor.fetchall()
        return jsonify({"users": users})
    except Error as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/users/with_membership", methods=["GET"])
def get_users_with_membership():
    data = request.json
    if not is_admin(data):
        return jsonify({"error": "Unauthorized access. Admin only."}), 403

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT u.id, u.email, u.full_name, r.name AS plan, r.price
            FROM users u
            LEFT JOIN registrations r ON u.id = r.user_id
        """
        )
        users_with_membership = cursor.fetchall()
        return jsonify({"users_with_membership": users_with_membership})
    except Error as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
