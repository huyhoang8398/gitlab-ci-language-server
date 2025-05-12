import {
  InitializeParams,
  InitializeResult,
  TextDocumentSyncKind,
} from 'vscode-languageserver/node';
import { connection, documents } from './connection';
import { provideCompletions } from './completion';
import { provideHover } from './hover';
import { provideDocumentSymbols } from './symbols';
import { validateDocument } from './validator';
import { provideFormatting } from './formatter';
import { TextDocumentChangeEvent } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';

// Initialize the server
connection.onInitialize((params: InitializeParams): InitializeResult => {
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {
        resolveProvider: true,
        triggerCharacters: ['.', ':'],
      },
      hoverProvider: true,
      documentSymbolProvider: true,
      documentFormattingProvider: true,
    },
  };
});

// Handle document changes
documents.onDidChangeContent((change: TextDocumentChangeEvent<TextDocument>) => {
  validateDocument(change.document);
});

// Register providers
connection.onCompletion(provideCompletions);
connection.onHover(provideHover);
connection.onDocumentSymbol(provideDocumentSymbols);
connection.onDocumentFormatting(provideFormatting);

// Start listening
documents.listen(connection);
connection.listen();
