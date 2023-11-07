// controllers/clientController.js
const Client = require('../models/Client');

const getClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add more controller methods (createClient, updateClient, deleteClient, etc.)

module.exports = {
    getClient,
  // export other methods
};
