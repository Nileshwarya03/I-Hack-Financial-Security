from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import csv
import json
from pymongo import MongoClient  # For MongoDB connection
from werkzeug.security import check_password_hash 
import datetime
import random
import string

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'csv', 'json'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Max 16 MB file size

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# SPAM DETECTION
@app.route('/api/spam-detection', methods=['POST'])
def spam_detection():
    data = request.get_json()

    # Extract the call metadata and transcript from the request body
    call_metadata = data.get('callMetadata')
    transcript = data.get('transcript')

    # Validate the required fields
    if not call_metadata or not transcript:
        return jsonify({"success": False, "message": "Missing required fields"}), 400

    try:
        # Placeholder logic for spam detection (you can replace this with your actual logic)
        if "scam" in transcript.lower():
            result = "Spam detected"
        else:
            result = "Legitimate call"

        return jsonify({"success": True, "result": result}), 200

    except Exception as error:
        print("Error in spam detection:", error)
        return jsonify({"success": False, "message": "Internal server error"}), 500

# DEEPFAKE DETECTION
@app.route('/api/deepfake-detection', methods=['POST'])
def deepfake_detection():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files['file']
    # Placeholder logic for deepfake detection
    return jsonify({"result": "Not a deepfake"}), 200

# FINANCIAL FRAUD DETECTION
@app.route('/api/fin-fraud-detection', methods=['POST'])
def detect_fraud():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Process the file and return the result
        if filename.endswith('.csv'):
            transactions = process_csv(filepath)
        elif filename.endswith('.json'):
            transactions = process_json(filepath)

        return jsonify({"result": transactions}), 200

    return jsonify({"error": "Invalid file type. Only CSV and JSON are allowed."}), 400

def process_csv(filepath):
    transactions = []
    with open(filepath, newline='') as csvfile:
        csvreader = csv.DictReader(csvfile)
        for row in csvreader:
            # Simple mock-up of fraud detection
            anomaly = "Fraudulent" if float(row['transaction_amount']) > 1000 else "Normal"
            transactions.append({
                "transaction_id": row['transaction_id'],
                "account_id": row['account_id'],
                "transaction_amount": row['transaction_amount'],
                "anomaly": anomaly
            })
    return transactions

def process_json(filepath):
    transactions = []
    with open(filepath, 'r') as jsonfile:
        data = json.load(jsonfile)
        for row in data:
            # Simple mock-up of fraud detection
            anomaly = "Fraudulent" if float(row['transaction_amount']) > 1000 else "Normal"
            transactions.append({
                "transaction_id": row['transaction_id'],
                "account_id": row['account_id'],
                "transaction_amount": row['transaction_amount'],
                "anomaly": anomaly
            })
    return transactions

# VKYC MONITORING
@app.route('/api/vkyc', methods=['POST'])
def vkyc():
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "Invalid request"}), 400
    
    action = data.get('action')
    frameData = data.get('frameData')
    customerId = data.get('customerId')

    if action == 'start':
        # Handle start action
        return jsonify({"message": "Start action processed"})
    
    elif action == 'stop':
        # Handle stop action
        return jsonify({"message": "Stop action processed"})
    
    elif action == 'process_frame':
        if not frameData:
            return jsonify({"error": "frameData is required for process_frame"}), 400
        # Simulating frame processing and liveness detection
        result = "alive"  # Example result of liveness detection
        confidence = 97.8  # Example confidence score

        return jsonify({
            "message": "Frame processed",
            "data": {
                "result": result,
                "confidence": confidence
            }
        })
    
    elif action == 'verify_identity':
        if not frameData or not customerId:
            return jsonify({"error": "frameData and customerId are required for verify_identity"}), 400
        # Simulating identity verification
        match = True  # Example result of identity verification
        confidence = 96.5  # Example confidence score
        
        return jsonify({
            "message": "Identity verified",
            "data": {
                "match": match,
                "confidence": confidence
            }
        })
    
    else:
        return jsonify({"error": "Invalid action"}), 400

# MongoDB connection
mongo_client = MongoClient("mongodb+srv://i-hack-fin-sec-user:iworkedhardonthisone0305@cluster0.cxzfg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = mongo_client["iHackDatabase"]  # Replace with your database name
users_collection = db["users"]  # Collection for user data

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# SIGNUP
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"success": False, "message": "Missing required fields"}), 400

    # Check if the user already exists
    if users_collection.find_one({"email": email}):
        return jsonify({"success": False, "message": "Email already registered"}), 400

    # Insert the new user
    new_user = {
        "username": username,
        "email": email,
        "password": password  # Store securely using a hashing method later
    }
    users_collection.insert_one(new_user)

    return jsonify({"success": True, "message": "User registered successfully"}), 201

# LOGIN
# @app.route('/api/login', methods=['POST'])
# def login():
#     data = request.get_json()

#     email = data.get("email")
#     password = data.get("password")

#     if not email or not password:
#         return jsonify({"success": False, "message": "Missing required fields"}), 400

#     # Check if user exists
#     user = users_collection.find_one({"email": email})
#     if user is None:
#         return jsonify({"success": False, "message": "User not found"}), 404

#     # Check if the password is correct
#     if user["password"] != password:
#         return jsonify({"success": False, "message": "Incorrect password"}), 401

#     return jsonify({"success": True, "message": "Login successful"}), 200

# # Generate a random token (for password reset link simulation)
# def generate_token():
#     return ''.join(random.choices(string.ascii_letters + string.digits, k=20))

from werkzeug.security import check_password_hash  # Import for checking hashed passwords

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"success": False, "message": "Missing required fields"}), 400

    # Check if user exists
    user = users_collection.find_one({"email": email})
    if user is None:
        return jsonify({"success": False, "message": "User not found"}), 404

    # Check if the password is correct using check_password_hash
    if not check_password_hash(user["password"], password):
        return jsonify({"success": False, "message": "Incorrect password"}), 401

    return jsonify({"success": True, "message": "Login successful"}), 200




# FORGOT PASSWORD
@app.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"success": False, "message": "Email is required!"}), 400

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"success": False, "message": "User not found!"}), 404
     
    def generate_token():
         return ''.join(random.choices(string.ascii_letters + string.digits, k=20))

    # Generate a reset token and set expiration time (e.g., 1 hour)
    reset_token = generate_token()
    expiration_time = datetime.datetime.utcnow() + datetime.timedelta(hours=1)

    # Update the user with the reset token and expiration time
    users_collection.update_one(
        {"email": email},
        {"$set": {"reset_token": reset_token, "reset_token_expiration": expiration_time}}
    )

    # Simulate sending the reset token to the user's email (in a real app, this would be done via email)
    return jsonify({"success": True, "message": "Password reset code sent to your email!"}), 200

# VERIFY CODE
@app.route('/api/verify-code', methods=['POST'])
def verify_code():
    data = request.get_json()
    email = data.get("email")
    code = data.get("code")

    if not email or not code:
        return jsonify({"success": False, "message": "Email and verification code are required!"}), 400

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"success": False, "message": "User not found!"}), 404

    reset_token = user.get("reset_token")
    reset_token_expiration = user.get("reset_token_expiration")

    if not reset_token or reset_token_expiration < datetime.datetime.utcnow():
        return jsonify({"success": False, "message": "Reset token expired!"}), 400

    if code != reset_token:
        return jsonify({"success": False, "message": "Invalid verification code!"}), 400

    return jsonify({"success": True, "message": "Verification successful!"}), 200

# SET PASSWORD
# @app.route('/api/set-password', methods=['POST'])
# def set_password():
#     data = request.get_json()
#     new_password = data.get("newPassword")
#     confirm_password = data.get("confirmPassword")

#     # Check if both fields are provided
#     if not new_password or not confirm_password:
#         return jsonify({"success": False, "message": "Both fields are required!"}), 400

#     # Check if passwords match
#     if new_password != confirm_password:
#         return jsonify({"success": False, "message": "Passwords do not match!"}), 400

#     # Hash the new password before storing it securely
#     hashed_password = generate_password_hash(new_password)

#     # Update the user's password (Assumes the user has been verified and reset token is valid)
#     users_collection.update_one(
#         {"reset_token": {"$exists": True}},  # Ensure reset_token exists for the user
#         {"$set": {"password": hashed_password, "reset_token": None, "reset_token_expiration": None}}
#     )

#     return jsonify({"success": True, "message": "Password updated successfully!"}), 200

from werkzeug.security import generate_password_hash  # For password hashing

@app.route('/api/set-password', methods=['POST'])
def set_password():
    data = request.get_json()
    new_password = data.get("newPassword")
    confirm_password = data.get("confirmPassword")

    # Check if both fields are provided
    if not new_password or not confirm_password:
        return jsonify({"success": False, "message": "Both fields are required!"}), 400

    # Check if passwords match
    if new_password != confirm_password:
        return jsonify({"success": False, "message": "Passwords do not match!"}), 400

    # Hash the new password before storing it securely
    hashed_password = generate_password_hash(new_password)

    # Update the user's password (Assumes the user has been verified and reset token is valid)
    users_collection.update_one(
        {"reset_token": {"$exists": True}},  # Ensure reset_token exists for the user
        {"$set": {"password": hashed_password, "reset_token": None, "reset_token_expiration": None}}
    )

    return jsonify({"success": True, "message": "Password updated successfully!"}), 200



if __name__ == '__main__':
    app.run(debug=True, port=5000)
