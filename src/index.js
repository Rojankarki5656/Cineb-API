const app = require('./app');
const config = require('./config/config');

// Start server
const server = app.listen(config.port, () => {
  console.log(`
╔═══════════════════════════════════════════════╗
║          Cineb API Server Started            ║
╠═══════════════════════════════════════════════╣
║  Port: ${config.port.toString().padEnd(39)}║
║  Environment: ${config.nodeEnv.padEnd(31)}║
║  Base URL: ${config.apiBaseUrl.padEnd(32)}║
╚═══════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

module.exports = server;
