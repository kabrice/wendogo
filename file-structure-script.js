// scripts/generate-structure.js
const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function generateStructure() {
  const date = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `project-structure-${date}`;
  
  // Define patterns to ignore - this will match any path containing these words
  const ignorePatterns = [
    '*DS_Store*',
    '*static*',
    '*server*',
    '*.next*',
    '*public*',
    '*files*',
    '*assets*',
    '*node_modules*',
    '*.git*',
    '*build*',
    '*dist*'
  ];

  const ignoreString = ignorePatterns.join('|');
  
  try {
    // Try using tree command with ignore patterns
    try {
      const { stdout } = await exec(`tree -a -I "${ignoreString}" --dirsfirst`);
      const output = `Project Structure\nGenerated on: ${new Date().toLocaleString()}\n\n${stdout}`;
      
      // Write files
      fs.writeFileSync(`${fileName}.txt`, output);
      fs.writeFileSync(`${fileName}.md`, '# Project Structure\n\n```\n' + stdout + '\n```');
      
      console.log('Structure files generated successfully!');
      console.log(`Files created:\n1. ${fileName}.txt\n2. ${fileName}.md`);
    } catch (treeError) {
      // Fallback to find command if tree isn't available
      const findCommand = `find . \\( ${ignorePatterns.map(pattern => `-path "${pattern}"`).join(' -o -path ')} \\) -prune -o -print`;
      
      const { stdout } = await exec(findCommand);
      const structure = stdout
        .split('\n')
        .filter(Boolean)
        .filter(line => !ignorePatterns.some(pattern => 
          line.toLowerCase().includes(pattern.replace(/\*/g, '').toLowerCase())
        ))
        .sort()
        .map(line => line.replace('./', ''))
        .join('\n');
      
      const output = `Project Structure\nGenerated on: ${new Date().toLocaleString()}\n\n${structure}`;
      
      // Write files
      fs.writeFileSync(`${fileName}.txt`, output);
      fs.writeFileSync(`${fileName}.md`, '# Project Structure\n\n```\n' + structure + '\n```');
      
      console.log('Structure files generated successfully! (using find command)');
      console.log(`Files created:\n1. ${fileName}.txt\n2. ${fileName}.md`);
    }
  } catch (error) {
    console.error('Error generating structure:');
    console.error(error.message);
  }
}

generateStructure().catch(console.error);
