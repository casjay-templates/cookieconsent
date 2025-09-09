const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

async function buildCSS() {
  console.log('Building CSS files...');
  
  const srcDir = path.join(__dirname, '..', 'src');
  const distDir = path.join(__dirname, '..', 'dist');
  
  // Ensure dist directory exists
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  try {
    // Read the extended CSS file
    const extendedCSS = fs.readFileSync(path.join(srcDir, 'cookieconsent-extended.css'), 'utf8');
    
    // Process CSS with PostCSS
    const processor = postcss([
      autoprefixer({
        overrideBrowserslist: ['> 1%', 'last 2 versions', 'ie >= 11']
      })
    ]);
    
    const result = await processor.process(extendedCSS, {
      from: path.join(srcDir, 'cookieconsent-extended.css'),
      to: path.join(distDir, 'cookieconsent.css')
    });
    
    // Write unminified version
    fs.writeFileSync(path.join(distDir, 'cookieconsent.css'), result.css);
    console.log('✓ Created cookieconsent.css');
    
    // Create minified version
    const minifyProcessor = postcss([
      autoprefixer({
        overrideBrowserslist: ['> 1%', 'last 2 versions', 'ie >= 11']
      }),
      cssnano({
        preset: ['default', {
          discardComments: {
            removeAllButFirst: true
          }
        }]
      })
    ]);
    
    const minifiedResult = await minifyProcessor.process(extendedCSS, {
      from: path.join(srcDir, 'cookieconsent-extended.css'),
      to: path.join(distDir, 'cookieconsent.min.css')
    });
    
    fs.writeFileSync(path.join(distDir, 'cookieconsent.min.css'), minifiedResult.css);
    console.log('✓ Created cookieconsent.min.css');
    
    // Create combined version (original + extended)
    const originalCSS = fs.readFileSync(path.join(srcDir, 'cookieconsent-original.css'), 'utf8');
    const combined = originalCSS + '\n\n' + extendedCSS;
    
    const combinedResult = await processor.process(combined, {
      from: undefined,
      to: path.join(distDir, 'cookieconsent-combined.css')
    });
    
    fs.writeFileSync(path.join(distDir, 'cookieconsent-combined.css'), combinedResult.css);
    console.log('✓ Created cookieconsent-combined.css');
    
    const combinedMinifiedResult = await minifyProcessor.process(combined, {
      from: undefined,
      to: path.join(distDir, 'cookieconsent-combined.min.css')
    });
    
    fs.writeFileSync(path.join(distDir, 'cookieconsent-combined.min.css'), combinedMinifiedResult.css);
    console.log('✓ Created cookieconsent-combined.min.css');
    
    console.log('CSS build completed successfully!');
    
  } catch (error) {
    console.error('Error building CSS:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  buildCSS();
}

module.exports = buildCSS;