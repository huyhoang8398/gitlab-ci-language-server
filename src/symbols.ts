import {
  DocumentSymbol,
  DocumentSymbolParams,
} from 'vscode-languageserver/node';
import { documents } from './connection';
import * as yaml from 'js-yaml';

export async function provideDocumentSymbols(
  params: DocumentSymbolParams
): Promise<DocumentSymbol[]> {
  const document = documents.get(params.textDocument.uri);
  if (!document) return [];

  const text = document.getText();
  const symbols: DocumentSymbol[] = [];

  try {
    const content = yaml.load(text) as Record<string, any>;
    Object.keys(content).forEach((key) => {
      symbols.push({
        name: key,
        kind: 4, // SymbolKind.Module
        range: {
          start: { line: 0, character: 0 },
          end: { line: 0, character: key.length },
        },
        selectionRange: {
          start: { line: 0, character: 0 },
          end: { line: 0, character: key.length },
        },
      });
    });
  } catch (error) {
    // Silently ignore parsing errors
  }

  return symbols;
}
