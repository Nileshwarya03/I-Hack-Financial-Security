# spam_detection.py

import re
import numpy as np
import pandas as pd

# Example function for detecting spam in a call transcript based on keyword matching
def detect_spam_in_transcript(transcript):
    # List of common scam or phishing keywords (extend as needed)
    phishing_keywords = ["urgent", "immediate action", "bank account", "verify your details", "sensitive information"]
    
    # Convert transcript to lowercase to make it case insensitive
    transcript = transcript.lower()
    
    # Check if any phishing keyword is found in the transcript
    for keyword in phishing_keywords:
        if keyword in transcript:
            return True  # Suspicious transcript detected

    return False  # No suspicious keywords found


# Example function to analyze call metadata for suspicious activity
def analyze_call_metadata(call_metadata):
    """
    call_metadata: Dictionary containing metadata of a call (e.g., frequency, duration, caller ID).
    """
    # Example thresholds for suspicious behavior (these values are for illustration and can be fine-tuned)
    suspicious_frequency_threshold = 10  # If the same number calls more than 10 times a day
    suspicious_duration_threshold = 300  # If the call duration exceeds 5 minutes (in seconds)
    
    # Check frequency and duration for suspicious patterns
    if call_metadata['call_frequency'] > suspicious_frequency_threshold:
        return True  # Too many calls from the same number
    
    if call_metadata['call_duration'] > suspicious_duration_threshold:
        return True  # Call is too long (potential scam behavior)
    
    return False  # No suspicious metadata


# Main function to check if a call is spam
def check_if_spam(call_metadata, transcript):
    if analyze_call_metadata(call_metadata):
        return "Spam: Suspicious Call Metadata Detected"
    
    if detect_spam_in_transcript(transcript):
        return "Spam: Suspicious Transcript Detected"
    
    return "Not Spam"

# Example call and transcript (replace with real data in practice)
example_call_metadata = {
    "caller_id": "1234567890",
    "call_duration": 350,  # in seconds
    "call_frequency": 12  # Calls per day from the same number
}

example_transcript = """
    Hello, this is an urgent message from your bank. Please verify your account details immediately.
    Failure to do so will result in your account being suspended. Please provide sensitive information.
"""

# Check if the example call is spam
result = check_if_spam(example_call_metadata, example_transcript)
print(result)  # Output: "Spam: Suspicious Transcript Detected"
