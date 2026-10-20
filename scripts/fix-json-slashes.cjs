const fs = require('fs');
const path = require('path');

const files = [
  'src/data/interviewQuestions.js',
  'src/data/interviewAnswers.js',
  'src/data/interviewRoles.js',
  'public/interview-roles.json'
];

files.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    let inString = false;
    let stringChar = '';
    let escaped = false;
    let result = '';
    
    for (let i = 0; i < content.length; i++) {
      const char = content[i];
      
      if (!inString) {
        if (char === '"' || char === "'" || char === '`') {
          inString = true;
          stringChar = char;
          result += char;
        } else {
          result += char;
        }
      } else {
        if (escaped) {
          result += char;
          escaped = false;
        } else if (char === '\\') {
          result += char;
          escaped = true;
        } else if (char === stringChar) {
          inString = false;
          result += char;
        } else if (char === '/') {
          result += '\u2044';
        } else {
          result += char;
        }
      }
    }
    
    fs.writeFileSync(filePath, result);
    console.log(`Fixed slashes in ${file}`);
  }
});
console.log('Slash fix complete');
