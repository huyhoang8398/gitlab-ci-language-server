export interface GitLabCIKeyword {
  description: string;
  type: string;
  allowedValues?: string[];
  examples?: string[];
}

export interface GitLabCISchema {
  [key: string]: GitLabCIKeyword;
}

export function getGitLabCISchema(): GitLabCISchema {
  return {
    stages: {
      description: 'List of stages in pipeline execution order',
      type: 'array',
      examples: ['["build", "test", "deploy"]']
    },
    script: {
      description: 'Shell scripts executed by the runner',
      type: 'array',
      examples: ['["npm ci", "npm run build"]']
    },
    image: {
      description: 'Docker image to use for the job',
      type: 'string',
      examples: ['node:16-alpine']
    },
    before_script: {
      description: 'Scripts to run before the main script',
      type: 'array'
    },
    after_script: {
      description: 'Scripts to run after the main script',
      type: 'array'
    },
    stage: {
      description: 'Defines which stage the job runs in',
      type: 'string'
    },
    extends: {
      description: 'Name of template to inherit from',
      type: 'string'
    },
    needs: {
      description: 'Other jobs that must be completed before this job runs',
      type: 'array'
    },
    rules: {
      description: 'List of conditions to evaluate for job execution',
      type: 'array'
    },
    variables: {
      description: 'Define job-specific variables',
      type: 'object'
    },
    cache: {
      description: 'List of files and directories to cache between jobs',
      type: 'object'
    },
    artifacts: {
      description: 'List of files and directories to attach to job on success',
      type: 'object'
    },
    dependencies: {
      description: 'Other jobs to download artifacts from',
      type: 'array'
    },
    coverage: {
      description: 'Code coverage parsing regex',
      type: 'string'
    },
    retry: {
      description: 'When and how many times to retry job automatically',
      type: 'object'
    },
    timeout: {
      description: 'Job timeout in minutes',
      type: 'string'
    },
    when: {
      description: 'When to run the job',
      type: 'string',
      allowedValues: ['on_success', 'on_failure', 'always', 'manual', 'delayed']
    },
    tags: {
      description: 'List of runner tags required by the job',
      type: 'array'
    }
  };
}
