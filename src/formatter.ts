import {
  DocumentFormattingParams,
  TextEdit,
} from 'vscode-languageserver/node';
import { documents } from './connection';
import * as yaml from 'js-yaml';

export async function provideFormatting(
  params: DocumentFormattingParams
): Promise<TextEdit[]> {
  const document = documents.get(params.textDocument.uri);
  if (!document) return [];

  const text = document.getText();
  try {
    const content = yaml.load(text);
    const formatted = yaml.dump(content, { indent: 2 });

    return [
      {
        range: {
          start: { line: 0, character: 0 },
          end: document.positionAt(text.length),
        },
        newText: formatted,
      },
    ];
  } catch (error) {
    return [];
  }
}
