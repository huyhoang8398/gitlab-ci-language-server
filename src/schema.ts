export function getGitLabCISchema() {
  return {
    stages: {
      description: 'Defines a list of stages for jobs.',
      type: 'array',
    },
    include: {
      description: 'Imports external YAML files into the pipeline.',
      type: 'array',
    },
    variables: {
      description: 'Defines pipeline variables.',
      type: 'object',
    },
    workflow: {
      description: 'Controls pipeline behavior.',
      type: 'object',
    },
    default: {
      description: 'Sets default attributes for all jobs.',
      type: 'object',
    },
  };
}
