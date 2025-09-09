const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

async function buildJS() {
  console.log('Building JavaScript files...');
  
  const srcDir = path.join(__dirname, '..', 'src');
  const distDir = path.join(__dirname, '..', 'dist');
  
  // Ensure dist directory exists
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  try {
    // Read the extended JS file
    const extendedJS = fs.readFileSync(path.join(srcDir, 'cookieconsent-extended.js'), 'utf8');
    
    // Create unminified version
    fs.writeFileSync(path.join(distDir, 'cookieconsent.js'), extendedJS);
    console.log('✓ Created cookieconsent.js');
    
    // Create minified version
    const minified = await minify(extendedJS, {
      compress: {
        drop_console: false,
        drop_debugger: true,
        pure_funcs: ['console.log']
      },
      mangle: {
        reserved: ['cookieconsent']
      },
      format: {
        comments: /^!/
      }
    });
    
    if (minified.error) {
      throw minified.error;
    }
    
    fs.writeFileSync(path.join(distDir, 'cookieconsent.min.js'), minified.code);
    console.log('✓ Created cookieconsent.min.js');
    
    // Create combined version (original + extended)
    const originalJS = fs.readFileSync(path.join(srcDir, 'cookieconsent-original.js'), 'utf8');
    const combined = originalJS + '\n\n' + extendedJS;
    
    fs.writeFileSync(path.join(distDir, 'cookieconsent-combined.js'), combined);
    console.log('✓ Created cookieconsent-combined.js');
    
    const combinedMinified = await minify(combined, {
      compress: {
        drop_console: false,
        drop_debugger: true,
        pure_funcs: ['console.log']
      },
      mangle: {
        reserved: ['cookieconsent']
      },
      format: {
        comments: /^!/
      }
    });
    
    if (combinedMinified.error) {
      throw combinedMinified.error;
    }
    
    fs.writeFileSync(path.join(distDir, 'cookieconsent-combined.min.js'), combinedMinified.code);
    console.log('✓ Created cookieconsent-combined.min.js');
    
    console.log('JavaScript build completed successfully!');
    
  } catch (error) {
    console.error('Error building JavaScript:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  buildJS();
}

module.exports = buildJS;