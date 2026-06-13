export const config = {
  port: 3001,
  jwtSecret: process.env.JWT_SECRET || 'dehbi-drive-academy-secret-key-change-in-production',
  admin: {
    username: process.env.ADMIN_USERNAME || 'admin',
    // Default password: admin123 (change after first login)
    password: process.env.ADMIN_PASSWORD || 'admin123'
  }
};
