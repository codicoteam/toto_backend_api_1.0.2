#!/bin/bash

echo "í¿—ï¸  Creating ALL missing models..."

# List of all possible models based on your controllers
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
created=0

for model in "${models[@]}"; do
    # Check if model exists in any form
    if [ ! -f "models/${model}.js" ] && [ ! -f "models/${model}_model.js" ] && [ ! -f "models/${model}_schema.js" ]; then
        echo "í³¦ Creating: ${model}_model.js"
        
        # Create the model
        cat > "models/${model}_model.js" << MODEL_TEMPLATE
const mongoose = require('mongoose');

const ${model}Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdBy: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        userType: {
            type: String,
            enum: ['student', 'teacher', 'admin'],
            required: true
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    // Additional fields can be added based on specific needs
    metadata: {
        type: Object,
        default: {}
    }
}, {
    timestamps: true
});

// Add indexes if needed
${model}Schema.index({ name: 1 });
${model}Schema.index({ 'createdBy.userId': 1 });
${model}Schema.index({ isActive: 1 });

module.exports = mongoose.model('${model^}', ${model}Schema);
MODEL_TEMPLATE
        
        ((created++))
    else
        echo "âœ… Already exists: ${model}"
    fi
done

echo ""
echo "í¾‰ Created $created new models!"
echo "Total models available: $(ls models/*.js 2>/dev/null | wc -l)"
