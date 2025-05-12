import { createConnection, ProposedFeatures } from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { TextDocuments } from 'vscode-languageserver';

// Create a connection for the server
export const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager
export const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);
