const express = require('express');

// Import All Routes
const aiGeneratedTheoriesRoutes = require('./routes/aiGeneratedTheoryRoutes');
const activityLogsRoutes = require('./routes/activityLogRoutes');
const adminsRoutes = require('./routes/adminRoutes');
const commentsRoutes = require('./routes/commentRoutes');
const likesRoutes = require('./routes/likeRoutes');
const reportsRoutes = require('./routes/reportRoutes');
const sharesRoutes = require('./routes/shareRoutes');
const tagsRoutes = require('./routes/tagRoutes');
const theoriesRoutes = require('./routes/theoryRoutes');
const usersRoutes = require('./routes/userRoutes');

const router = express.Router();

// Use Routes
router.use('/theories', theoriesRoutes);
router.use('/ai-generated-theories', aiGeneratedTheoriesRoutes);
router.use('/activity-logs', activityLogsRoutes);
router.use('/admins', adminsRoutes);
router.use('/comments', commentsRoutes);
router.use('/likes', likesRoutes);
router.use('/reports', reportsRoutes);
router.use('/shares', sharesRoutes);
router.use('/tags', tagsRoutes);
router.use('/users', usersRoutes);

module.exports = router;
