# Cineb-API

A Node.js REST API for accessing Cineb movie and TV show data.

## Features

- 🎬 Movie and TV show data access
- 🚀 Fast and lightweight Express.js server
- 🔒 CORS support for cross-origin requests
- ⚙️ Environment-based configuration
- 📝 Clean and organized code structure

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Rojankarki5656/Cineb-API.git
cd Cineb-API
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit the `.env` file with your configuration (optional, defaults are provided).

## Running the Application

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the PORT specified in your .env file).

## API Endpoints

### Health Check
- **GET** `/` - Check if the API is running
  ```json
  {
    "success": true,
    "message": "Cineb API is running",
    "version": "1.0.0",
    "endpoints": {
      "health": "/",
      "api": "/api"
    }
  }
  ```

### API Base
- **GET** `/api` - API information endpoint

## Project Structure

```
Cineb-API/
├── src/
│   ├── config/          # Configuration files
│   │   └── config.js    # Main configuration
│   ├── controllers/     # Route controllers
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Utility functions
│   ├── app.js           # Express app setup
│   └── index.js         # Server entry point
├── .env.example         # Example environment variables
├── .gitignore           # Git ignore rules
├── package.json         # Project dependencies
└── README.md            # Project documentation
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment (development/production) | development |
| `API_BASE_URL` | Base URL for Cineb | https://cineb.net |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in ms | 900000 (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |
| `CORS_ORIGIN` | CORS allowed origins | * |

## Configuration

The application uses a centralized configuration system located in `src/config/config.js`. This file loads environment variables and provides defaults for all configuration options.

## Development

To contribute to this project:

1. Create a new branch for your feature
2. Make your changes
3. Test your changes locally
4. Submit a pull request

## License

ISC

## Author

Rojan Karki
