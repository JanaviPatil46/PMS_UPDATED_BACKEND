const express = require('express');
const { createClient, getClientsByAccount ,folderTemplate,getFoldersByAccountId} = require('../controller/clientController');

const router = express.Router();

// Create a new client
router.post('/clients', createClient);

// Get all clients for a specific account
router.get('/clients/account/:accountId', getClientsByAccount);
router.post('/accountfoldertemp', folderTemplate);
router.get('/folders/:accountId', getFoldersByAccountId);

module.exports = router;
