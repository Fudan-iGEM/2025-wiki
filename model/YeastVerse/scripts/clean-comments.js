import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import strip from 'strip-comments';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const ignoreDirs = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  '.next',
  '.cache',
  '.vscode',
  '.idea',
  '.husky',
  'coverage'
]);
const extsJs = new Set(['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs']);
const extsCss = new Set(['.css', '.scss', '.sass']);
const extsHtml = new Set(['.html', '.htm']);
const extsYaml = new Set(['.yml', '.yaml']);
function removeHtmlComments(content) {
  return content.replace(/<!--[\s\S]*?-->/g, '');
}
function removeYamlComments(content) {
  const lines = content.split(/\r?\n/);
  const out = lines.map(line => {
    let inSingle = false, inDouble = false;
    let result = '';
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === "'" && !inDouble) {
        inSingle = !inSingle;
        result += ch;
        continue;
      }
      if (ch === '"' && !inSingle) {
        inDouble = !inDouble;
        result += ch;
        continue;
      }
      if (ch === '#' && !inSingle && !inDouble) {
        break; // strip from # to end
      }
      result += ch;
    }
    return result;
  });
  return out.join('\n');
}
function removeGitignoreComments(content) {
  const lines = content.split(/\r?\n/);
  const out = lines.map(line => {
    if (/^\s*#/.test(line)) return '';
    return line;
  });
  return out.join('\n');
}
function removeMdHtmlComments(content) {
  return removeHtmlComments(content);
}
function stripAndTrim(content, type) {
  let stripped = content;
  try {
    if (type === 'js') {
      stripped = strip(content);
    } else if (type === 'css') {
      stripped = strip(content);
    } else if (type === 'html') {
      stripped = removeHtmlComments(content);
    } else if (type === 'yaml') {
      stripped = removeYamlComments(content);
    } else if (type === 'gitignore') {
      stripped = removeGitignoreComments(content);
    } else if (type === 'md') {
      stripped = removeMdHtmlComments(content);
    }
  } catch (e) {
    console.warn('Failed to strip comments for', type, e && e.message);
  }
  const lines = stripped.split(/\r?\n/);
  const filtered = lines.filter(line => line.trim() !== '');
  return filtered.join('\n');
}
async function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const base = path.basename(filePath).toLowerCase();
  let type = null;
  if (extsJs.has(ext)) type = 'js';
  else if (extsCss.has(ext)) type = 'css';
  else if (extsHtml.has(ext)) type = 'html';
  else if (extsYaml.has(ext)) type = 'yaml';
  else if (base === '.gitignore') type = 'gitignore';
  else if (ext === '.md') type = 'md';
  else if (ext === '.json' || base === 'package-lock.json' || base === 'package.json') return false;
  else if (['.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.map'].includes(ext)) return false;
  const orig = await fs.promises.readFile(filePath, 'utf8');
  const cleaned = stripAndTrim(orig, type);
  if (cleaned !== orig) {
    await fs.promises.writeFile(filePath, cleaned, 'utf8');
    console.log('Cleaned:', path.relative(root, filePath));
    return true;
  }
  return false;
}
async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  let count = 0;
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ignoreDirs.has(ent.name)) continue;
      count += await walk(full);
    } else if (ent.isFile()) {
      count += (await processFile(full)) ? 1 : 0;
    }
  }
  return count;
}
(async () => {
  const start = Date.now();
  const changed = await walk(root);
  console.log(`Done. Updated ${changed} files in ${Date.now() - start}ms.`);
})();