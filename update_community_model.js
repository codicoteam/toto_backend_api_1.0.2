const fs = require('fs');

console.log('Updating community model for three-way interaction...');

const communityModel = fs.readFileSync('./models/community_model.js', 'utf8');

// Check if model supports teachers
if (!communityModel.includes('teachers') && !communityModel.includes('teacherId')) {
    console.log('Community model needs update for teacher integration');
    
    console.log('\ní±‰ Add these fields to your community_model.js:');
    console.log(`
    // Three-way interaction support
    teachers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'createdByModel'
    },
    createdByModel: {
      type: String,
      required: true,
      enum: ['Admin', 'Teacher', 'Student']
    },
    `);
} else {
    console.log('âœ… Community model already supports teachers');
}
