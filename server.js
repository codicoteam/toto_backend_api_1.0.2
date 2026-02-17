const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env
dotenv.config();

// Database connection
const connectDB = require("./configs/db_config");
connectDB();

// Swagger setup
const setupSwagger = require("./configs/swagger_config");

// Import routers
const adminRouter = require('./routers/admin_router');
const chatRouter = require('./routers/chat_router');
const comment_contentRouter = require('./routers/comment_content_router');
const comment_topic_contentRouter = require('./routers/comment_topic_content_router');
const communityRouter = require('./routers/community_router');
const content_systemRouter = require('./routers/content_system_router');
const dashboardRouter = require('./routers/dashboard_router');
const end_lesson_questionRouter = require('./routers/end_lesson_question_router');
const examRouter = require('./routers/exam_router');
const home_bannerRouter = require('./routers/home_banner_router');
const library_bookRouter = require('./routers/library_book_router');
const message_communityRouter = require('./routers/message_community_router');
const paymentRouter = require('./routers/payment_router');
const record_examRouter = require('./routers/record_exam_router');
const studentRouter = require('./routers/student_router');
const student_topic_progressRouter = require('./routers/student_topic_progress_router');
const subjectRouter = require('./routers/subject_router');
const teacherRouter = require('./routers/teacher_router');
const teacher_student_chatRouter = require('./routers/teacher_student_chat_router');
const topic_contentRouter = require('./routers/topic_content_router');
const topic_in_subjectRouter = require('./routers/topic_in_subject_router');
const topicRouter = require('./routers/topic_router');
const walletRouter = require('./routers/wallet_router');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Swagger
setupSwagger(app);

// API Routes
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/comment-content', comment_contentRouter);
app.use('/api/v1/comment-topic-content', comment_topic_contentRouter);
app.use('/api/v1/community', communityRouter);
app.use('/api/v1/content-system', content_systemRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/end-lesson-question', end_lesson_questionRouter);
app.use('/api/v1/exam', examRouter);
app.use('/api/v1/home-banner', home_bannerRouter);
app.use('/api/v1/library-book', library_bookRouter);
app.use('/api/v1/message-community', message_communityRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1/record-exam', record_examRouter);
app.use('/api/v1/student', studentRouter);
app.use('/api/v1/student-topic-progress', student_topic_progressRouter);
app.use('/api/v1/subject', subjectRouter);
app.use('/api/v1/teacher', teacherRouter);
app.use('/api/v1/teacher-student-chat', teacher_student_chatRouter);
app.use('/api/v1/topic-content', topic_contentRouter);
app.use('/api/v1/topic-in-subject', topic_in_subjectRouter);
app.use('/api/v1/topic', topicRouter);
app.use('/api/v1/wallet', walletRouter);

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Toto Academy API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err.stack || err);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`‚úÖ Server running on port ${PORT}`);
  console.log(`Ì≥ò API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`Ìºç Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
