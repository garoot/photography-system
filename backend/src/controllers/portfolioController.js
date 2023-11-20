const PortfolioItem = require('../models/portfolioItem');
const VideoItem = require('../models/VideoItem');

const fs = require('fs');

// Helper function to delete a file
const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Failed to delete file:", err);
        }
    });
};

// Controller to handle Create operation
exports.createPortfolioItem = async (req, res) => {
    try {
        let filePath = req.file ? req.file.path.replace(/\\/g, '/') : req.body.url;
        console.log('Attempting to save file to:', filePath);
// Rest of your code to save the file

        // Check the type from the request body and adjust the file path if necessary
        // if (req.body.type === 'video') {
        //     filePath = filePath.replace('backend/public', 'backend/public/videos');
        // } else {
        filePath = filePath.replace('backend/public', '');
        // }

        let newItemData = {
            ...req.body,
            url: filePath
        };

        const newItem = new PortfolioItem(newItemData);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        if (req.file) deleteFile(req.file.path);
        res.status(400).json({ message: error.message });
    }
};

exports.createVideoItem = async (req, res) => {
    try {
        let videoPath, thumbnailPath;

        if (req.files.video && req.files.thumbnail) {
            videoPath = req.files.video[0].path.replace(/\\/g, '/');
            thumbnailPath = req.files.thumbnail[0].path.replace(/\\/g, '/');
        } else {
            throw new Error('Both video and thumbnail files are required');
        }

        videoPath = videoPath.replace('backend/public', '');
        thumbnailPath = thumbnailPath.replace('backend/public', '');


        let newVideoData = {
            title: req.body.title,
            videoUrl: videoPath,
            thumbnailUrl: thumbnailPath,
            description: req.body.description
        };

        const newVideo = new VideoItem(newVideoData);
        await newVideo.save();
        res.status(201).json(newVideo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Controller to handle Read operation for all items
exports.getPortfolioItems = async (req, res) => {
    try {
        const items = await PortfolioItem.find();

        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to handle Read operation for a single item
exports.getPortfolioItem = async (req, res) => {
    try {
        const item = await PortfolioItem.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Not found' });

        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to handle Update operation
exports.updatePortfolioItem = async (req, res) => {
    try {
        let updateData = req.body;
        if (req.file) {
            // If a new file is uploaded, delete the old one and update the URL
            const oldItem = await PortfolioItem.findById(req.params.id);
            if (oldItem && oldItem.url) deleteFile(oldItem.url);
            updateData.url = req.file.path;
        }

        const updatedItem = await PortfolioItem.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Not found' });

        res.json(updatedItem);
    } catch (error) {
        if (req.file) deleteFile(req.file.path);
        res.status(400).json({ message: error.message });
    }
};

// Controller to handle Delete operation
exports.deletePortfolioItem = async (req, res) => {
    try {
        const item = await PortfolioItem.findById(req.params.id);
        if (item && item.url) {
            // Delete the associated file
            deleteFile(item.url);
        }

        await PortfolioItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to handle Delete operation
exports.deleteAllPortfolioItems = async (req, res) => {
    try {
        // Find all portfolio items
        const items = await PortfolioItem.find();

        // Iterate over each item and delete associated files if necessary
        for (const item of items) {
            if (item.url) {
                deleteFile(item.url);
            }
        }

        // Delete all items from the database
        await PortfolioItem.deleteMany({});

        res.json({ message: 'All items deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
