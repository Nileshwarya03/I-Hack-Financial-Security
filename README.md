# I-Hack Financial Security

## Project Overview
The **I-Hack Financial Security** project was developed as part of the prestigious i-Hack hackathon, organized by IIT Bombay's E-Cell. This project aims to tackle pressing issues in financial security, such as spam call detection, deepfake fraud prevention, and VKYC exploitation, using innovative solutions.

---

## Problem Statement
Spam calls, deepfake technologies, and VKYC exploitation have become significant threats to financial services, leading to monetary losses and eroding trust in digital systems. The project focuses on:
- **Spam Call Detection and Prevention**
- **Deepfake Fraud Detection**
- **VKYC Exploitation Detection**
- **Financial Fraud Detection**

---

## Solution Highlights
This project provides:
- **Spam Detection**: Identifies and filters out fraudulent or spam calls, to ensure users are protected from unwanted or potentially harmful calls.
- **Deepfake Detection**: Analyzes video and image to detect manipulated or artificial content, such as deepfakes, helping safeguard users from deceptive videos used in scams or frauds.
- **Financial Fraud Analysis**:Monitors and detects unusual or suspicious financial transactions to prevent frauds with user .
- **vKYC monitoring**: Utilizes video-based KYC (Know Your Customer) processes to verify user identities through webcam or mobile camera recordings. The system ensures that the video feed matches the expected behavior and checks for any anomalies.

---

## Technologies Used

### Frontend
- React.js
- CSS
- JavaScript

### Backend
- Python (Flask)
- APIs: Custom-built APIs for frontend-backend integration

### Database
- MongoDB Atlas: For storing user data

### Tools
- Postman: API testing 
- GitHub: Version control
- Canva: Presentation 

---

## Features
1. **Dashboard** - Central hub for users to view alerts, statistics, and summaries of their security status.
2. **Sidebar Navigations** - Easy access to different sections of the app, including spam detection, deepfake detection, financial fraud detection, and VKYC monitoring, as well as settings and reports.
3. **Spam Detection** - Detects spam calls using  to safeguard users from fraudulent calls.
4. **Deepfake Detection** - Analyzes videos and images to identify manipulated or deepfake content, protecting users from misleading or fraudulent media.
5. **Financial Fraud Detection** - Real-time monitoring of financial transactions to detect and alert users of suspicious activities, preventing fraud.
6. **VKYV Monitoring** - Secures video-based KYC processes by verifying user identities through live camera recordings and detecting anomalies to prevent fraud.
7. **Alerts** - Real-time notifications of potential security threats or fraudulent activities, ensuring users are promptly informed.(static)
8. **Reports** - Generates detailed reports of detected frauds,alerts, and system actiities for tracking and auditing purposes(static)
9. **Settings** - Allows user to customize app preferences, manage account setting, and configure notifications for tailored experience(static)

***Note:*** *The View Alerts, View Reports, and Account Settings sections are carefully designed and presented as static elements, reflecting the attention to detail and thoughtfulness that went into their structure and user experience.*


---

## How to Run the Project

### Prerequisites
- Python installed (v3.7 or above)
- MongoDB Atlas account
- Node.js installed (for frontend dependencies)


### Steps

#### Backend Setup
1. Clone the repository:
   - git clone <repository-url>
   - cd <project-folder-name>

   
2. Navigate to the backend folder:
   - cd backend

3. Install dependencies:
   - pip install -r requirements.txt
   
4. Run the Flask server:
   - python app.py

# your backend is connected successfully if you see a message like,
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!


*Running the Backend*:
After running python app.py, the backend server will start, enabling communication between the frontend and the database. The server will handle API requests for features such as spam detection, deepfake detection, financial fraud detection, and VKYC monitoring, providing real-time responses to the application.
   



#### Frontend Setup
1. Navigate to the frontend folder:
   - cd frontend-demo
   
2. Install dependencies:
   - npm install
   
3. Start the React development server:
   - npm start

# your frontend is connected successfully if you see a message like,
  webpack compiled successfully

  and localhost:3000 will open in your browser 
  if not, then Open your browser and navigate to `http://localhost:3000`.

---

# Note on Email Verification step 
Due to certain issues, the verification code for password reset is not being sent via email. However, the reset token can still be accessed in the backend under the user's information. To reset the password, please copy the reset token from the backend and paste it manually



## Folder Structure
```
I-Hack-Financial-Security/
├── backend/
│   ├── app.py
│   └── __pycache__/
│
├── frontend-demo/
│   ├── node_modules/
│   ├── public/
|   |      assets     
│   ├── src/
|   |      app.js
|   |      pages/
|
├── .gitignore
├── package-lock.josn
├── package.json
└── README.md


---

## Author
**Nileshwarya R Roonwal** 
This project was developed and completed by me (Nileshwarya R Roonwal), showcasing my dedication and passion for creating a secure and innovative solution.

## Team/Solo 
This is a solo project done by Nileshwarya R Roonwal.

---

## Acknowledgments
- **IIT Bombay E-Cell** for organizing i-Hack.
- **All the open-source libraries and tools** used, which contributed to the functionality and success of this project.

---

##Presentation

A detailed presentation made using Canva is available, which provides an overview of the project, its features, and the technologies used. The PPT is intended to give a clear summary of the project's objectives and outcomes.

---

## NOTE

This project was developed solely by Nileshwarya R Roonwal, using my own knowledge and skills. I dedicated significant effort to exploring various resources to deepen my understanding and enhance the project's development. It was a solo endeavor, and there were no team contributions. The project commenced on 14 January 2025 and was completed on 22 January 2025.
