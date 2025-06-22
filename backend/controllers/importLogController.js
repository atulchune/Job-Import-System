import ImportLog from '../models/ImportLog.js';

export const getImportLogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default records per page
        const skip = (page - 1) * limit;
        const [logs, total] = await Promise.all([
            ImportLog.find().sort({ timestamp: -1 }).skip(skip).limit(limit),
            ImportLog.countDocuments()
        ]);
        res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalRecords: total,
            perPage: limit,
            data: logs,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch logs', error: error.message });
    }
};
