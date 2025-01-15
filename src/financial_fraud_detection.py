import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

# Step 1: Data Preparation - Sample transaction data (you can replace this with real data)
data = {
    'transaction_id': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    'account_id': ['A1', 'A2', 'A3', 'A1', 'A2', 'A3', 'A1', 'A2', 'A3', 'A1'],
    'transaction_amount': [100, 200, 50, 300, 1000, 25, 200, 600, 5000, 10],
    'transaction_time': ['2025-01-10 12:00', '2025-01-10 12:05', '2025-01-10 12:10', 
                         '2025-01-10 12:15', '2025-01-10 12:20', '2025-01-10 12:25', 
                         '2025-01-10 12:30', '2025-01-10 12:35', '2025-01-10 12:40', '2025-01-10 12:45'],
    'location': ['NY', 'NY', 'LA', 'NY', 'LA', 'NY', 'NY', 'NY', 'LA', 'NY']
}

# Convert data to pandas DataFrame
df = pd.DataFrame(data)

# Step 2: Feature Engineering (Transaction amount, time, and location)
# Convert transaction time to numerical data (e.g., minute of the day or hour)
df['transaction_time'] = pd.to_datetime(df['transaction_time'])
df['transaction_hour'] = df['transaction_time'].dt.hour
df['transaction_minute'] = df['transaction_time'].dt.minute

# Encoding location into numeric values (e.g., using simple mapping)
df['location_code'] = df['location'].map({'NY': 1, 'LA': 2})

# Select features for anomaly detection
features = ['transaction_amount', 'transaction_hour', 'transaction_minute', 'location_code']
X = df[features]

# Step 3: Normalize the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Step 4: Anomaly Detection using Isolation Forest
model = IsolationForest(contamination=0.2)  # Set contamination level (percentage of outliers)
model.fit(X_scaled)

# Predict anomalies (-1 for outliers, 1 for inliers)
df['anomaly'] = model.predict(X_scaled)
df['anomaly'] = df['anomaly'].map({1: 'Normal', -1: 'Suspicious'})

# Step 5: Display Results
print("Transaction Anomalies Detected:")
print(df[['transaction_id', 'account_id', 'transaction_amount', 'anomaly']])

# Step 6: Visualization (optional)
# Visualize transaction amounts with their anomaly status
plt.figure(figsize=(10, 6))
plt.scatter(df['transaction_id'], df['transaction_amount'], c=(df['anomaly'] == 'Suspicious'), cmap='coolwarm', marker='o')
plt.title('Financial Fraud Detection - Anomaly Detection')
plt.xlabel('Transaction ID')
plt.ylabel('Transaction Amount')
plt.show()
