import { Location, ReferenceParams } from 'vscode-languageserver/node';
import { documents } from './connection';
import { parseYAML } from './tree-sitter-parser';

function isReservedKeyword(key: string) {
  // List from GitLab CI docs (not exhaustive)
  return [
    'stages', 'variables', 'include', 'workflow', 'default', 'image', 'services',
    'before_script', 'after_script', 'cache', 'pages', 'schedules', 'extends',
    'needs', 'dependencies', 'rules', 'artifacts', 'trigger', 'only', 'except',
    'interruptible', 'retry', 'timeout', 'when', 'allow_failure', 'environment',
    'resource_group', 'parallel', 'release', 'id_tokens', 'coverage', 'secrets',
    'inherit', 'start_in', 'tags', 'script', 'stage', 'job'
  ].includes(key);
}

export async function provideReferences(params: ReferenceParams): Promise<Location[]> {
  console.log('=== References Request ===');
  console.log('Position:', params.position);
  
  const document = documents.get(params.textDocument.uri);
  if (!document) {
    console.log('No document found for URI:', params.textDocument.uri);
    return [];
  }

  const text = document.getText();
  console.log('Document text:', text);
  
  const tree = await parseYAML(text);
  const offset = document.offsetAt(params.position);
  console.log('Offset:', offset);

  const node = tree.rootNode.descendantForPosition({ row: params.position.line, column: params.position.character });
  if (!node) {
    console.log('No node found at position');
    return [];
  }

  console.log('Found node:', {
    type: node.type,
    text: node.text,
    startIndex: node.startIndex,
    endIndex: node.endIndex,
    parent: node.parent ? {
      type: node.parent.type,
      text: node.parent.text
    } : null
  });

  const references: Location[] = [];

  // Helper to push a reference
  function pushRef(start: number, end: number) {
    if (!document) return;
    console.log('Adding reference:', {
      start,
      end,
      text: text.substring(start, end)
    });
    references.push({
      uri: params.textDocument.uri,
      range: {
        start: document.positionAt(start),
        end: document.positionAt(end),
      },
    });
  }

  // Walk the tree and find all nodes with the same text as the target node
  function findReferences(rootNode: any, targetText: string) {
    function visit(node: any) {
      if (node.text === targetText) {
        pushRef(node.startIndex, node.endIndex);
      }
      for (let child of node.namedChildren) {
        visit(child);
      }
    }
    visit(rootNode);
  }

  // Determine the target text to search for
  let targetText: string;
  if (node.type === 'block_mapping_pair' || node.type === 'flow_mapping_pair') {
    // Cursor is on a key
    const keyNode = node.namedChildren.find(child => child.type === 'key');
    if (keyNode) {
      targetText = text.substring(keyNode.startIndex, keyNode.endIndex).trim().replace(/^['"]|['"]$/g, '');
    } else {
      targetText = node.text;
    }
  } else {
    targetText = node.text;
  }

  console.log('Searching for references to:', targetText);
  findReferences(tree.rootNode, targetText);

  console.log('Total references found:', references.length);
  return references;
} 