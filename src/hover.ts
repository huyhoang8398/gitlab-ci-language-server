import { Hover, HoverParams } from 'vscode-languageserver/node';
import { documents } from './connection';
import { getGitLabCISchema } from './schema';
import { gitlabPredefinedVariables } from './gitlab-variables';

interface GitLabCISchema {
  [key: string]: { description?: string; type?: string; allowedValues?: string[]; examples?: string[] };
}

export async function provideHover(params: HoverParams): Promise<Hover | null> {
  const document = documents.get(params.textDocument.uri);
  if (!document) return null;

  const text = document.getText();
  const offset = document.offsetAt(params.position);
  const word = getWordAt(text, offset);

  // Check for GitLab variables (with or without $ prefix)
  const variableName = word.startsWith('$') ? word.substring(1) : word;
  const variableInfo = gitlabPredefinedVariables[variableName];
  
  if (variableInfo) {
    return {
      contents: {
        kind: 'markdown',
        value: [
          `## ${word}`,
          '',
          variableInfo.description,
          '',
          '**Details**',
          `- Type: \`${variableInfo.type}\``,
          `- Scope: \`${variableInfo.scope}\``,
        ].join('\n')
      }
    };
  }

  // Check for GitLab CI keywords
  const schema = getGitLabCISchema() as GitLabCISchema;
  const keywordInfo = schema[word];

  if (keywordInfo) {
    const content = [
      `## ${word}`,
      '',
      keywordInfo.description,
      '',
      `**Type**: \`${keywordInfo.type}\``,
    ];

    if (keywordInfo.allowedValues) {
      content.push('', '**Allowed Values**:', keywordInfo.allowedValues.map(v => `- \`${v}\``).join('\n'));
    }

    if (keywordInfo.examples) {
      content.push('', '**Examples**:', '```yaml', ...keywordInfo.examples, '```');
    }

    return {
      contents: {
        kind: 'markdown',
        value: content.join('\n')
      }
    };
  }

  return null;
}

function getWordAt(text: string, offset: number): string {
  // Updated regex to include $ for variables
  const regex = /[\$\w]+/g;
  let match;
  while ((match = regex.exec(text))) {
    if (match.index <= offset && offset <= match.index + match[0].length) {
      return match[0];
    }
  }
  return '';
}
