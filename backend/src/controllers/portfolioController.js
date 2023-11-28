const PortfolioItem = require('../models/portfolioItem');
const VideoItem = require('../models/VideoItem');

const fs = require('fs');
const path = require('path');


const baseDir = path.join(__dirname, '../../'); // Adjust this path as per your directory structure
const sanitizeFilePath = (filePath) => {
    // Remove double quotes if present
    return filePath.replace(/"/g, '');
};

const deleteFile = (filePath) => {
    const sanitizedFilePath = sanitizeFilePath(filePath);
    const absoluteFilePath = path.join(baseDir, sanitizedFilePath);
    console.log(absoluteFilePath)

    if (fs.existsSync(absoluteFilePath)) {
        try {
            fs.unlinkSync(absoluteFilePath);
            console.log(`File deleted successfully: ${absoluteFilePath}`);
        } catch (err) {
            console.error(`Failed to delete file: ${absoluteFilePath}`, err);
        }
    } else {
        console.warn(`File not found, cannot delete: ${absoluteFilePath}`);
    }
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

exports.getVideoItems = async (req, res) => {
    try {
        const videoItems = await VideoItem.find({}); // Retrieves all video items

        res.json(videoItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVideoItem = async (req, res) => {
    try {
        const videoItemId = req.params.id; // Get the ID from the request parameters
        const videoItem = await VideoItem.findById(videoItemId); // Retrieve the specific video item by ID

        if (!videoItem) {
            return res.status(404).json({ message: 'Video item not found' });
        }

        res.json(videoItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to handle Read operation for all items
exports.getPortfolioItems = async (req, res) => {
    try {
        // const items = await PortfolioItem.find();
        const items = await PortfolioItem.find({ type: 'image' });

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
        console.log("item updated successfully...")
        res.json(updatedItem);
    } catch (error) {
        if (req.file) deleteFile(req.file.path);
        res.status(400).json({ message: error.message });
    }
};
const mongoose = require('mongoose');

exports.bulkUpdatePortfolioItems = async (req, res) => {
    try {
        const uploadedImages = req.files || []; // Use an empty array if no files are uploaded
        const updates = req.body.updates ? JSON.parse(req.body.updates) : [];
        if (updates.length === 0) {
            return res.status(400).json({ message: "No 'updates' provided" });
        }
        // Process new uploads
        for (const file of uploadedImages) {
            const newItem = new PortfolioItem({
                type: 'image',
                url: file.path.replace('backend/public', ''),
                // Add other fields as necessary
            });
            await newItem.save();
        }

        // Process updates and deletions
        for (const update of updates) {
            if (!mongoose.Types.ObjectId.isValid(update.id)) {
                throw new Error(`Invalid ID: ${update.id}`);
            }

            switch (update.action) {
                case 'update':
                    const updatedItem = await PortfolioItem.findByIdAndUpdate(update.id, update.data, { new: true });
                    if (!updatedItem) {
                        throw new Error(`Update failed for item with ID ${update.id}`);
                    }
                    break;
                case 'delete':
                    const deletedItem = await PortfolioItem.findByIdAndDelete(update.id);
                    if (!deletedItem) {
                        throw new Error(`Delete failed for item with ID ${update.id}`);
                    }
                    console.log(update)
                    deleteFile(JSON.stringify(update.url));
                    break;
                default:
                    throw new Error(`Unknown action: ${update.action}`);
            }
        }

        res.status(200).json({ message: "Bulk update successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
