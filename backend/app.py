from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import csv
import json

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'csv', 'json'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Max 16 MB file size

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Spam Detection Endpoint
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

# Deepfake Detection Endpoint
@app.route('/api/deepfake-detection', methods=['POST'])
def deepfake_detection():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files['file']
    # Placeholder logic for deepfake detection
    return jsonify({"result": "Not a deepfake"}), 200

# Financial-fraud Detection Endpoint
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

# VKYC monitoring Endpoint
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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
