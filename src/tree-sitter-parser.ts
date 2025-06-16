// Removed invalid module augmentation
// declare module 'tree-sitter-yaml';

import Parser from 'tree-sitter';
// import YAML from 'tree-sitter-yaml';

let parser: Parser | null = null;

export async function getParser(): Promise<Parser> {
  if (!parser) {
    parser = new Parser();
    const YAML = require('tree-sitter-yaml');
    parser.setLanguage(YAML);
  }
  return parser;
}

export async function parseYAML(text: string): Promise<Parser.Tree> {
  const parser = await getParser();
  return parser.parse(text);
} 