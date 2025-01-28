# API Monitoring Application

## Overview

This application is designed to monitor APIs by scheduling periodic checks across four geographical regions. It captures critical metrics such as:

- **TLS/SSL handshake time**
- **TCP connection time**
- **DNS resolution time**
- **Total data transfer**
- **SSL certificate expiration**
- **Domain expiration**

When an incident occurs, the system captures a screenshot (if possible), logs the failure message, and notifies the **Alert Service**. Once the service is restored, the system triggers a "resolve incident" action to update the incident status and notify the user.

## Features

- **Distributed API Checks**: Workers in four geographical regions handle API monitoring using Kafka to ensure high availability and low latency.
- **Incident Detection and Reporting**: Automatic detection of incidents, failure recording, and screenshot capture.
- **Alert Service Integration**: Uses gRPC to notify the Alert Service about incidents and resolutions.
- **Performance Metrics**: Logs metrics like TLS handshake, TCP connection time, and DNS resolution for detailed analysis.
- **Redis Caching**: Speeds up data retrieval and minimizes redundant processing.
- **Domain and SSL Monitoring**: Tracks SSL certificate and domain expiration dates.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Express.js
- **Worker Communication**: Kafka for distributed messaging
- **Database**: PostgreSQL for persistent storage
- **Caching**: Redis
- **gRPC**: For communication between services
- **Screenshot Handling**: Puppeteer for capturing API response screenshots
- **Monorepo**: TurboRepo for efficient code management across the project

## System Flow

1. **API Monitoring**: Workers check APIs based on schedules distributed via Kafka.
2. **Metrics Logging**: Workers record performance metrics during each API check.
3. **Incident Detection**: If an API fails, the worker captures a screenshot and triggers the Alert Service.
4. **Resolution Detection**: When the API is back online, the worker triggers a resolve incident notification.
5. **Alert Service Actions**: Handles incident recording and user notifications.

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/api-monitoring.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start services:
   - **Frontend**: Run `npm start` in the `client` directory.
   - **Backend**: Run `npm start` in the `server` directory.
   - **Workers**: Start the worker scripts for each region.
4. Configure Kafka and Redis as required.
5. Ensure gRPC endpoints are running for the Alert Service.

## Future Enhancements

- Add advanced visualizations for metrics in the frontend.
- Implement machine learning for anomaly detection in API performance.
- Add support for additional regions dynamically.

---

### Contribution

Feel free to contribute to this project by creating issues or submitting pull requests. Let's build a robust monitoring system together!

### License

This project is licensed under the MIT License. See the LICENSE file for details.

