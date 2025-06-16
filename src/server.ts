import {
  InitializeParams,
  InitializeResult,
  TextDocumentSyncKind,
  CompletionParams,
  HoverParams,
  DocumentSymbolParams,
  DocumentFormattingParams,
  DefinitionParams,
  ReferenceParams,
  RequestType,
  CancellationToken,
  WorkDoneProgressReporter,
  ResultProgressReporter,
} from 'vscode-languageserver/node';
import { connection, documents } from './connection';
import { provideCompletions } from './completion';
import { provideHover } from './hover';
import { provideDocumentSymbols } from './symbols';
import { validateDocument } from './validator';
import { provideFormatting } from './formatter';
import { provideReferences } from './references';
import { TextDocumentChangeEvent } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';

// Enable debug logging
connection.console.log('GitLab CI LSP Server starting...');

// Initialize the server
connection.onInitialize((params: InitializeParams): InitializeResult => {
  connection.console.log('Initializing GitLab CI LSP Server...');
  connection.console.log('Client capabilities: ' + JSON.stringify(params.capabilities, null, 2));

  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {
        resolveProvider: true,
        triggerCharacters: ['.', ':', '$'], // Add $ as trigger character
      },
      hoverProvider: true,
      documentSymbolProvider: true,
      documentFormattingProvider: true,
      definitionProvider: true,
      referencesProvider: true,
    },
  };
});

// Handle document changes
documents.onDidChangeContent((change: TextDocumentChangeEvent<TextDocument>) => {
  connection.console.log('Document changed: ' + change.document.uri);
  validateDocument(change.document);
});

// Register providers with debug logging
connection.onCompletion((params, token, workDoneProgress) => {
  connection.console.log('Completion requested: ' + JSON.stringify(params));
  return provideCompletions(params);
});

connection.onHover((params, token, workDoneProgress) => {
  connection.console.log('Hover requested: ' + JSON.stringify(params));
  return provideHover(params);
});

connection.onDocumentSymbol((params, token, workDoneProgress) => {
  connection.console.log('Document symbols requested: ' + JSON.stringify(params));
  return provideDocumentSymbols(params);
});

connection.onDocumentFormatting((params, token, workDoneProgress) => {
  connection.console.log('Formatting requested: ' + JSON.stringify(params));
  return provideFormatting(params);
});

connection.onReferences((params, token, workDoneProgress) => {
  connection.console.log('References requested: ' + JSON.stringify(params));
  return provideReferences(params);
});

// Start listening
documents.listen(connection);
connection.listen();
