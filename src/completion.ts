import {
  CompletionItem,
  CompletionItemKind,
  CompletionParams,
} from 'vscode-languageserver/node';
import { documents } from './connection';
import { getGitLabCISchema } from './schema';

// Define schema type with index signature
interface GitLabCISchema {
  [key: string]: { description?: string; type?: string };
}

export async function provideCompletions(
  params: CompletionParams
): Promise<CompletionItem[]> {
  const document = documents.get(params.textDocument.uri);
  if (!document) return [];

  const schema = getGitLabCISchema() as GitLabCISchema;
  const completions: CompletionItem[] = [];

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
