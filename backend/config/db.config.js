
const dbuser = process.env.DB_USER || 'Admin';
const dbsecret = process.env.DB_SECRET || 'QMyx8CKlXvX4dJk0';
const dbname = process.env.DB_NAME || 'myFirstDatabase';
const dbserver = process.env.DB_SERVER || 'cluster0.cobyw.mongodb.net';
const dbprotocol = process.env.DB_PROTOCOL || 'mongodb+srv';

module.exports = {
  url: `${dbprotocol}://${dbuser}:${encodeURIComponent(
    dbsecret
  )}@${dbserver}/${dbname}?retryWrites=true&w=majority`,
};
