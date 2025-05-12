import { Hover, HoverParams } from 'vscode-languageserver/node';
import { documents } from './connection';
import { getGitLabCISchema } from './schema';

// Define schema type with index signature
interface GitLabCISchema {
  [key: string]: { description?: string; type?: string };
}

export async function provideHover(params: HoverParams): Promise<Hover | null> {
  const document = documents.get(params.textDocument.uri);
  if (!document) return null;

  const text = document.getText();
  const offset = document.offsetAt(params.position);
  const word = getWordAt(text, offset);

  const schema = getGitLabCISchema() as GitLabCISchema;
  const description = schema[word]?.description;

  if (description) {
    return {
      contents: {
        kind: 'markdown',
        value: `**${word}**\n\n${description}`,
      },
    };
  }

  return null;
}

function getWordAt(text: string, offset: number): string {
  const regex = /\w+/g;
  let match;
  while ((match = regex.exec(text))) {
    if (match.index <= offset && offset <= match.index + match[0].length) {
      return match[0];
    }
  }
  return '';
}
