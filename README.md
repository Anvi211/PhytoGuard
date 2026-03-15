🌿 PhytoGuard – AI-Powered Precision Agriculture System

Modern agriculture faces several challenges such as late detection of crop diseases, excessive pesticide usage, and inefficient irrigation practices. In many cases, farmers rely on manual observation or estimation rather than real-time data, which often results in delayed action and resource wastage.

These challenges can lead to:

Excessive chemical pesticide usage

Water wastage due to improper irrigation

Reduced crop yield

Increased operational costs for farmers

To address these issues, we developed PhytoGuard, an AI-powered precision agriculture system designed to enable intelligent crop monitoring and automated responses using AI, IoT, and cloud technologies.

🏆 Achievement:
This project was awarded 1st Prize at Tejas 2K26 (CSE Department Level).

🌱 Our Solution – PhytoGuard

PhytoGuard combines computer vision, IoT sensors, and cloud services to monitor crop health, detect diseases early, and automate farming actions such as pesticide spraying and irrigation.

The system continuously collects data from the field, processes it using AI models, and provides real-time insights to farmers.

⚙️ Key Features
📸 Real-Time Image Capture

An ESP32-CAM module captures images of plants directly from the field at regular intervals. These images provide real-time visual data for disease detection.

☁️ Cloud-Based Processing

Captured images are securely uploaded to Cloudinary, enabling cloud storage and easy access for AI model inference.

🎯 AI-Powered Disease Detection

A trained YOLO (You Only Look Once) object detection model analyzes plant images and identifies diseased regions using bounding boxes and confidence scores, enabling accurate and fast disease detection.

🧪 Precision Pesticide Spraying

Instead of spraying pesticides across the entire field, PhytoGuard performs targeted pesticide spraying only on infected areas detected by the AI model.
This significantly reduces:

Chemical overuse

Environmental impact

Cost of pesticides

💧 Smart Irrigation System

Soil moisture sensors continuously monitor the soil moisture level.
When moisture falls below a predefined threshold, the system automatically triggers irrigation, ensuring efficient water usage and optimal plant growth.

📩 Real-Time Farmer Notifications

Using Twilio, farmers receive instant alerts regarding:

Pest or disease detection

Low soil moisture levels

System activity updates

This ensures farmers can respond quickly even when they are not physically present in the field.

📊 Real-Time Monitoring Dashboard

A centralized dashboard built using React provides farmers with real-time insights including:

Disease detection results

Soil moisture readings

System activity status

Historical monitoring data

This enables data-driven decision-making for better farm management.

🤖 AI-Based Recommendations

An integrated Router API analyzes detection results and sensor data to generate actionable farming recommendations, helping farmers make informed decisions about crop management.

🧠 System Architecture

PhytoGuard integrates AI, IoT devices, and cloud services to build a complete smart agriculture ecosystem:

Field devices capture plant images and soil data.

Images are uploaded to the cloud.

The YOLO model detects plant diseases.

IoT systems trigger pesticide spraying or irrigation when required.

Farmers receive alerts and can monitor everything through the dashboard.

🛠️ Technology Stack

ESP32-CAM

YOLO Object Detection

Cloudinary

Firebase

React

Twilio

Router API

IoT Sensors (Soil Moisture Sensor, Pump System)

🚀 Impact

PhytoGuard helps farmers move towards precision agriculture by:

Detecting crop diseases early and accurately

Reducing pesticide overuse

Optimizing water consumption

Providing real-time insights and alerts

Improving crop yield and sustainability
