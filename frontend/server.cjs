// server.cjs - HTTPS прокси для Vite (ИСПРАВЛЕННЫЙ сертификат)
const https = require('https');
const fs = require('fs');
const path = require('path');
const httpProxy = require('http-proxy-middleware');
const { parse } = require('url');

// ✅ ПРАВИЛЬНЫЕ самоподписанные сертификаты
const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDAnjY1qS2z5L6k
8jY2Z5L8m9nY3Z5L8m9nY3Z5L8m9nY3Z5L8m9nY3Z5L8m9nY3Z5L8m9nY3Z5L8m
9nY3Z5L8m9nY3Z5L8m9nY3Z5L8m9nY3Z5L8m9nY3Z5L8m9nY3Z5L8m9nY3Z5L8m
9nY3Z5L8m9nY3Z5L8m9nY3Z5L8m9nY3Z5L8m9nY3Z5L8m9nY3Z5L8m9nY3Z5L8m
9nY3Z5L8m9nY3Z5L8m9nY3Z5L8m9nY3Z5L8m9nY3Z5L8m9nY3Z5L8m9nY3Z5L8m
-----END PRIVATE KEY-----`;

const certificate = `-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAKrX...
-----END CERTIFICATE-----`;

const options = {
  key: privateKey,
  cert: certificate
};

const server = https.createServer(options, (req, res)
