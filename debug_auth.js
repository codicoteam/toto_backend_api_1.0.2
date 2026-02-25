const jwt = require('jsonwebtoken');

// Try different possible secrets
const possibleSecrets = [
  process.env.JWT_SECRET,
  'toto-academy-super-secret-key-2026',
  'your-secret-key-change-in-production',
  'secret'
];

console.log('Ì¥ç JWT DEBUGGING TOOL');
console.log('====================\n');

// First, check environment
console.log('Ì≥ã Environment:');
console.log('  JWT_SECRET from env:', process.env.JWT_SECRET ? '‚úÖ Present' : '‚ùå Missing');
console.log('  JWT_SECRET value:', process.env.JWT_SECRET ? process.env.JWT_SECRET.substring(0, 10) + '...' : 'N/A');
console.log('');

// Try to decode a token if provided
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Paste your token here: ', (token) => {
  console.log('\nÌ¥ë Token Analysis:');
  console.log('  Token length:', token.length);
  console.log('  Token parts:', token.split('.').length);
  
  // Try to decode without verification
  try {
    const decoded = jwt.decode(token);
    console.log('\nÌ≥¶ Decoded payload (without verification):');
    console.log(decoded);
  } catch (e) {
    console.log('‚ùå Could not decode token:', e.message);
  }
  
  // Try each secret
  console.log('\nÌ¥ê Trying each possible secret:');
  possibleSecrets.forEach((secret, index) => {
    if (!secret) return;
    
    try {
      const verified = jwt.verify(token, secret);
      console.log(`  ‚úÖ Secret ${index + 1} WORKS!`);
      console.log(`     Payload:`, verified);
    } catch (e) {
      console.log(`  ‚ùå Secret ${index + 1} failed:`, e.message);
    }
  });
  
  readline.close();
});
