const PortfolioItem = require('../models/portfolioItem'); // Update the path to your model

// Controller to handle Create operation
exports.createPortfolioItem = async (req, res) => {
    try {
        const newItem = new PortfolioItem(req.body);
        const savedItem = await newItem.save();
        // temporarily
        res.status(201).json({message: 'createPortfolioItem(): success'});

        // res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to handle Read operation for all items
exports.getPortfolioItems = async (req, res) => {
    try {
        const items = await PortfolioItem.find();
        // temporarily
        res.status(201).json({message: 'getPortfolioItems(): success'});

        // res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to handle Read operation for a single item
exports.getPortfolioItem = async (req, res) => {
    try {
        const item = await PortfolioItem.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Not found' });
        // temporarily
        res.status(201).json({message: 'getPortfolioItem(): success'});

        // res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to handle Update operation
exports.updatePortfolioItem = async (req, res) => {
    try {
        const updatedItem = await PortfolioItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Not found' });
        // temporarily
        res.status(201).json({message: 'updatePortfolioItem(): success'});

        // res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to handle Delete operation
exports.deletePortfolioItem = async (req, res) => {
    try {
        const deletedItem = await PortfolioItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Not found' });
        // temporarily
        res.status(201).json({message: 'deletePortfolioItem(): success'});

        // res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
