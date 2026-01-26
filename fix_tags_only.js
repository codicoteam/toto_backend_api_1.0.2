const fs = require('fs');
const path = require('path');

console.log('Fixing Swagger tags...\n');

// Define standardized tags
const tagMapping = {
  'admin_router.js': 'Admin',
  'student_router.js': 'Student', 
  'teacher_router.js': 'Teacher',
  'subject_router.js': 'Subject',
  'topic_in_subject.js': 'Topic',
  'topic_content_router.js': 'Topic Content',
  'content_system_router.js': 'Content',
  'comment_content_router.js': 'Comment',
  'comment_topic_content_router.js': 'Comment Topic',
  'end_lesson_question_router.js': 'Lesson Question',
  'community_router.js': 'Community',
  'message_community_router.js': 'Message',
  'wallet_router.js': 'Wallet',
  'exam_router.js': 'Exam',
  'library_book_router.js': 'Library',
  'payment_router.js': 'Payment',
  'record_exam_router.js': 'Record Exam',
  'dashboard_router.js': 'Dashboard',
  'student_topic_progress_router.js': 'Progress',
  'admin_student_chat_router.js': 'Chat',
  'homeBanner_routes.js': 'Banner'
};

const routersDir = './routers';
const files = fs.readdirSync(routersDir).filter(f => f.endsWith('.js') && !f.includes('backup'));

files.forEach(file => {
  const standardTag = tagMapping[file] || file.replace(/_/g, ' ').replace('.js', '').replace(/\b\w/g, l => l.toUpperCase());
  
  console.log(`Processing ${file} -> "${standardTag}"`);
  
  const filePath = path.join(routersDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove any existing tags section
  content = content.replace(/\n\s*\*\s*tags:\s*\n\s*\*\s*-\s*name:\s*["']?[^"'\n]+["']?[^}]*}/g, '');
  content = content.replace(/\n\s*\*\s*tags:\s*\n\s*\*\s*name:\s*["']?[^"'\n]+["']?\s*\n\s*\*\s*description:[^}]*}/g, '');
  
  // Add standardized tag at the beginning of @swagger block
  if (content.includes('@swagger')) {
    const tagSection = `\n * tags:\n *   name: ${standardTag}\n *   description: ${standardTag} management`;
    content = content.replace(/(\*\s*@swagger\s*\n)/, `$1 *${tagSection}\n`);
    fs.writeFileSync(filePath, content);
    console.log(`  ‚úÖ Tag added: "${standardTag}"`);
  } else {
    console.log(`  ‚ö†Ô∏è  No @swagger block found`);
  }
});

console.log('\n‚úÖ All tags standardized!');
console.log('\nÌ±â Restart the server to see changes:');
console.log('  1. Press Ctrl+C to stop current server');
console.log('  2. Run: npm start');
