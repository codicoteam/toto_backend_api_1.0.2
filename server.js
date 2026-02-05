const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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


// Use routers
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


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
});
