import {
  CompletionItem,
  CompletionItemKind,
  CompletionParams,
  Position,
  TextDocument
} from 'vscode-languageserver/node';
import { documents } from './connection';
import { getGitLabCISchema } from './schema';
import { gitlabPredefinedVariables } from './gitlab-variables';

// Define schema type with index signature
interface GitLabCISchema {
  [key: string]: { description?: string; type?: string };
}

function isAfterDollarSign(document: TextDocument, position: Position): boolean {
  const text = document.getText();
  const offset = document.offsetAt(position);
  const line = text.split('\n')[position.line];
  const prefix = line.slice(0, position.character);
  
  return prefix.endsWith('$');
}

export async function provideCompletions(
  params: CompletionParams
): Promise<CompletionItem[]> {
  const document = documents.get(params.textDocument.uri);
  if (!document) return [];

  const schema = getGitLabCISchema() as GitLabCISchema;
  const completions: CompletionItem[] = [];

  // Check if we're typing after a $ character

  // Check if we're typing after a $ character
  if (isAfterDollarSign(document, params.position)) {
    // Add predefined variables as completions
    Object.entries(gitlabPredefinedVariables).forEach(([variable, info]) => {
      completions.push({
        label: `$${variable}`,
        kind: CompletionItemKind.Variable,
        detail: `GitLab CI variable (${info.scope})`,
        documentation: {
          kind: 'markdown',
          value: `**${variable}**\n\n${info.description}\n\n*Type: ${info.type}*\n*Scope: ${info.scope}*`
        },
        insertText: `$${variable}`,
        filterText: `$${variable}`,
      });
    });
    
    return completions;
  }

  // Example: Suggest top-level GitLab CI keywords
  const topLevelKeywords = [
    'stages',
    'include',
    'variables',
    'workflow',
    'default',
  ];

  topLevelKeywords.forEach((keyword) => {
    completions.push({
      label: keyword,
      kind: CompletionItemKind.Keyword,
      detail: `GitLab CI keyword: ${keyword}`,
      documentation: schema[keyword]?.description || `Inserts ${keyword} section.`,
    });
  });

  return completions;
}
