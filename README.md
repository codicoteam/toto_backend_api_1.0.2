# Toto Academy Backend API

Backend API for Toto Academy - An educational platform.

## API Documentation

### Local Development
- **Swagger UI**: http://localhost:3000/api-docs
- **API Base URL**: http://localhost:3000/api/v1

### Production
- **Production URL**: https://toto-backend-api-1-0-2.onrender.com
- **Swagger UI**: https://toto-backend-api-1-0-2.onrender.com/api-docs
- **API Base URL**: https://toto-backend-api-1-0-2.onrender.com/api/v1

## Available Endpoints

### Authentication & Users
- `POST /api/v1/student/register` - Register new student
- `POST /api/v1/student/login` - Student login
- `POST /api/v1/teacher/register` - Register new teacher
- `POST /api/v1/teacher/login` - Teacher login

### Content Management
- `GET /api/v1/subject` - Get all subjects
- `GET /api/v1/topic` - Get all topics
- `GET /api/v1/topic-content` - Get topic content
- `GET /api/v1/exam` - Get exams

### Payment & Wallet
- `GET /api/v1/wallet` - Get wallet information
- `POST /api/v1/payment/initialize` - Initialize payment
- `POST /api/v1/payment/verify` - Verify payment

## Local Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file from `.env.example`
4. Start development server: `npm run dev`

## Deployment

This project is deployed on Render. The deployment is automatically triggered when changes are pushed to the main branch.

## Health Check

- **Endpoint**: `/health`
- **Method**: GET
- **Response**: API status information

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Swagger for API documentation
- CORS for cross-origin requests

## License

ISC
