const fs = require('fs');

console.log('Checking wallet model for topic content relationship...');

// First check current wallet model
const walletModel = fs.readFileSync('./models/wallet_model.js', 'utf8');
console.log('Current wallet model has topic reference:', walletModel.includes('topicContent') || walletModel.includes('topic_content'));

// Check if we need to update it
if (!walletModel.includes('topicContent') && !walletModel.includes('topic_content')) {
    console.log('Wallet model needs update for topic content relationship');
    
    // Add to wallet model (you'll need to manually update this)
    console.log('\ní±‰ Add this to your wallet_model.js schema:');
    console.log(`
    // For tracking purchases
    purchasedContents: [{
      topicContent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TopicContent",
      },
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
      amount: Number,
      purchaseDate: {
        type: Date,
        default: Date.now,
      },
      transactionId: String,
    }],
    `);
} else {
    console.log('âœ… Wallet model already has topic content relationship');
}
