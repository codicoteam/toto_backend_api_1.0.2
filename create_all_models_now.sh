#!/bin/bash

echo "í¿—ï¸  Creating ALL models at once..."

models=(
    "admin"
    "chat"
    "comment_content"
    "comment_topic_content"
    "community"
    "content_system"
    "dashboard"
    "end_lesson_question"
    "exam"
    "home_banner"
    "library_book"
    "message_community"
    "payment"
    "record_exam"
    "student"
    "student_topic_progress"
    "subject"
    "teacher"
    "teacher_student_chat"
    "topic_content"
    "topic_in_subject"
    "topic"
    "wallet"
)

mkdir -p models

for model in "${models[@]}"; do
    model_file="models/${model}_model.js"
    
    # Skip if already exists in any form
    if [ -f "$model_file" ] || [ -f "models/${model}.js" ] || [ -f "models/${model}_schema.js" ]; then
        echo "âœ… $model already exists"
        continue
    fi
    
    echo "í³¦ Creating: $model"
    
    # Create model file
    cat > "$model_file" << MODEL
const mongoose = require('mongoose');

const ${model}Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    createdBy: {
        userId: mongoose.Schema.Types.ObjectId,
        userType: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp on save
${model}Schema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('${model^}', ${model}Schema);
MODEL
done

echo ""
echo "í¾‰ Created $(ls models/*.js 2>/dev/null | wc -l) models!"
