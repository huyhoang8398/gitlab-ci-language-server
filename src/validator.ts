import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver/node';
import { connection } from './connection';
import * as yaml from 'js-yaml';

export async function validateDocument(document: TextDocument): Promise<void> {
  const text = document.getText();
  const diagnostics: Diagnostic[] = [];

  try {
    const content = yaml.load(text);
    // Basic validation: check for required fields
    if (!content || typeof content !== 'object') {
      diagnostics.push({
        severity: DiagnosticSeverity.Error,
        range: {
          start: { line: 0, character: 0 },
          end: { line: 0, character: 10 },
        },
        message: 'Invalid GitLab CI YAML: Document must be a valid YAML object.',
        source: 'gitlab-ci-ls',
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    diagnostics.push({
      severity: DiagnosticSeverity.Error,
      range: {
        start: { line: 0, character: 0 },
        end: { line: 0, character: 10 },
      },
      message: `YAML Error: ${message}`,
      source: 'gitlab-ci-ls',
    });
  }

  // Send diagnostics to client
  connection.sendDiagnostics({ uri: document.uri, diagnostics });
}
