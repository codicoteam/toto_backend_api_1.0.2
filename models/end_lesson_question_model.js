// end_lesson_question Model
const mongoose = require('mongoose');

const endLessonQuestionSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true 
  },
  description: { 
    type: String,
    required: true 
  },
  topicContentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TopicContent',
    required: false
  },
  options: [{
    type: String
  }],
  correctAnswer: {
    type: String
  },
  questionType: {
    type: String,
    enum: ['multiple_choice', 'true_false', 'short_answer'],
    default: 'multiple_choice'
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  points: {
    type: Number,
    default: 10
  },
  status: { 
    type: String, 
    enum: ['active', 'inactive'],
    default: 'active' 
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('EndLessonQuestion', endLessonQuestionSchema);
