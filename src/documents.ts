import { TextDocument } from 'vscode-languageserver-textdocument';

export function getDocumentText(document: TextDocument): string {
  return document.getText();
}

export function getPositionAt(document: TextDocument, offset: number) {
  return document.positionAt(offset);
}
