# 🏆 CAF 2025/2026 Backend API

![CAF](https://img.shields.io/badge/CAF-2025--2026-green)
![Node.js](https://img.shields.io/badge/Node.js-v18+-brightgreen)
![Express](https://img.shields.io/badge/Express-v4.18-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v14+-blue)

Complete REST API for managing the Africa Cup of Nations 2025/2026 tournament.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)
- [Deployment](#deployment)
- [Team Members](#team-members)

## ✨ Features

- 🔐 JWT-based authentication with role-based access control
- ⚽ Complete CRUD operations for Teams, Players, and Matches
- 🔒 Password hashing with Bcrypt
- 📊 PostgreSQL database with Sequelize ORM
- ✅ Data validation and error handling
- 🌐 CORS enabled for cross-origin requests
- 📚 Well-documented API endpoints

## 🛠️ Tech Stack

- **Runtime**: Node.js v18+
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: Bcryptjs
- **Environment Variables**: Dotenv
- **CORS**: cors

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/marouaneakrich/CAF-API-Management.git
cd CAF-API-Management
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Setup
Create a `.env` file in the root directory:
```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=caf_db
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_super_secret_jwt_key_min_32_characters
JWT_EXPIRE=7d

CLIENT_URL=http://localhost:3000
```

### Step 4: Create Database
```bash
# Using psql
psql -U postgres
CREATE DATABASE caf_db;
\q

# Or using createdb command
createdb caf_db
```

### Step 5: Run the Application
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 🔗 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/profile` | Get user profile | Private |

### Team Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/teams` | Get all teams | Public |
| GET | `/api/teams/:id` | Get team by ID | Public |
| POST | `/api/teams` | Create new team | Admin |
| PUT | `/api/teams/:id` | Update team | Admin |
| DELETE | `/api/teams/:id` | Delete team | Admin |

### Player Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/players` | Get all players | Public |
| GET | `/api/players/team/:teamId` | Get players by team | Public |
| GET | `/api/players/:id` | Get player by ID | Public |
| POST | `/api/players` | Create new player | Admin |
| PUT | `/api/players/:id` | Update player | Admin |
| DELETE | `/api/players/:id` | Delete player | Admin |

### Match Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/matches` | Get all matches | Public |
| GET | `/api/matches/upcoming` | Get upcoming matches | Public |
| GET | `/api/matches/:id` | Get match by ID | Public |
| POST | `/api/matches` | Create new match | Admin |
| PUT | `/api/matches/:id` | Update match | Admin |
| DELETE | `/api/matches/:id` | Delete match | Admin |

## UML Class Diagram

![CAF API UML Class Diagram](./assets/images/uml_class_diagram.svg)
[📥 Download UML Diagram](./assets/uml_class_diagram.drawio)

## 📊 CAF API Presentation

[📥 Download the Presentation (PDF)](./assets/CAF_API_Presentation.pdf)


## 📝 Request Examples

### Register User
```json
POST /api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@caf.com",
  "password": "admin123",
  "role": "admin"
}
```

### Login
```json
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@caf.com",
  "password": "admin123"
}
```

### Create Team (Protected - Admin Only)
```json
POST /api/teams
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "Egypt",
  "country": "Egypt",
  "flag_url": "https://example.com/flags/egypt.png",
  "coach": "Rui Vitória",
  "group": "A"
}
```

### Create Player (Protected - Admin Only)
```json
POST /api/players
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "Mohamed Salah",
  "position": "Forward",
  "number": 10,
  "age": 31,
  "team_id": 1
}
```

### Create Match (Protected - Admin Only)
```json
POST /api/matches
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "team_home_id": 1,
  "team_away_id": 2,
  "match_date": "2026-01-15T18:00:00Z",
  "stadium": "Cairo International Stadium",
  "status": "scheduled"
}
```

## 🧪 Testing with Postman

### Import Collection
1. Open Postman
2. Click "Import"
3. Upload the `CAF_API.postman_collection.json` file
4. Import the environment variables from `CAF_ENV.postman_environment.json`

### Testing Flow
1. **Register** an admin user
2. **Login** to get JWT token
3. Copy the token from response
4. Set token in Postman environment variables or Authorization header
5. Test protected endpoints (Teams, Players, Matches)

### Authentication Header Format
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🚀 Deployment

### Deploy to Render

1. Create account on [Render.com](https://render.com)
2. Create new PostgreSQL database
3. Create new Web Service
4. Connect GitHub repository
5. Set environment variables
6. Deploy!

### Environment Variables for Production
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your_production_secret_key
PORT=10000
```

### Deploy to Railway

1. Create account on [Railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Add PostgreSQL plugin
4. Set environment variables
5. Deploy automatically on push

## 📊 Database Schema

### Users Table
- id (PK)
- username (UNIQUE)
- email (UNIQUE)
- password (hashed)
- role (ENUM: 'admin', 'user')
- created_at
- updated_at

### Teams Table
- id (PK)
- name (UNIQUE)
- country
- flag_url
- coach
- group
- created_at
- updated_at

### Players Table
- id (PK)
- name
- position
- number
- age
- team_id (FK)
- created_at
- updated_at

### Matches Table
- id (PK)
- team_home_id (FK)
- team_away_id (FK)
- score_home
- score_away
- match_date
- stadium
- status (ENUM: 'scheduled', 'live', 'finished')
- created_at
- updated_at

## 👥 Team Members

| Name | Role | Responsibilities |
|------|------|------------------|
| Developer 1 | Architecture & Database | UML, Models, Migrations |
| Developer 2 | Authentication & Security | JWT, Bcrypt, Middleware |
| Developer 3 | Teams & Players | CRUD Operations |
| Developer 4 | Matches & Documentation | API Docs, Deployment |

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support,
create an issue in the repository.

---