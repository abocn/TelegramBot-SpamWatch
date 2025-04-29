import fs from 'fs';
import path from 'path';

const blocklistPath = path.join(__dirname, 'sw_blocklist.txt');

let blocklist: string[] = [];

const readBlocklist = () => {
  try {
    const data = fs.readFileSync(blocklistPath, 'utf8');
    blocklist = data.split('\n').map(id => id.trim()).filter(id => id !== '');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('WARN: SpamWatch blocklist file not found. Creating a new, blank one.\nUse your own SpamWatch API key and our generator to push the blocklist to the file.');
      fs.writeFileSync(blocklistPath, '');
    } else {
      console.error('WARN: Error reading SpamWatch blocklist:', error);
    }
  }
};

const isOnSpamWatch = (userId: string) => {
  return blocklist.includes(userId);
};

readBlocklist();

export { isOnSpamWatch };
