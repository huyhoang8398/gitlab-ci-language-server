export interface GitLabVariable {
  description: string;
  type: string;
  scope?: string;
}

export const gitlabPredefinedVariables: Record<string, GitLabVariable> = {
  'CI': {
    description: 'Mark that job is executed in CI environment',
    type: 'boolean',
    scope: 'global'
  },
  'CI_API_V4_URL': {
    description: 'The GitLab API v4 root URL',
    type: 'string',
    scope: 'global'
  },
  'CI_BUILDS_DIR': {
    description: 'Top-level directory where builds are run',
    type: 'string',
    scope: 'global'
  },
  'CI_COMMIT_AUTHOR': {
    description: 'The author of the commit in Name <email> format',
    type: 'string',
    scope: 'pipeline'
  },
  'CI_COMMIT_BEFORE_SHA': {
    description: 'The previous latest commit present in the branch (before push)',
    type: 'string',
    scope: 'pipeline'
  },
  'CI_COMMIT_BRANCH': {
    description: 'The commit branch name',
    type: 'string',
    scope: 'pipeline'
  },
  'CI_COMMIT_DESCRIPTION': {
    description: 'The description of the commit',
    type: 'string',
    scope: 'pipeline'
  },
  'CI_COMMIT_MESSAGE': {
    description: 'The full commit message',
    type: 'string',
    scope: 'pipeline'
  },
  'CI_COMMIT_REF_NAME': {
    description: 'The branch or tag name for which project is built',
    type: 'string',
    scope: 'pipeline'
  },
  'CI_COMMIT_REF_PROTECTED': {
    description: 'If the job is running for a protected reference',
    type: 'boolean',
    scope: 'pipeline'
  },
  'CI_COMMIT_SHA': {
    description: 'The commit revision the project is built for',
    type: 'string',
    scope: 'pipeline'
  },
  'CI_COMMIT_SHORT_SHA': {
    description: 'The first eight characters of CI_COMMIT_SHA',
    type: 'string',
    scope: 'pipeline'
  },
  'CI_COMMIT_TAG': {
    description: 'The commit tag name',
    type: 'string',
    scope: 'pipeline'
  },
  'CI_COMMIT_TIMESTAMP': {
    description: 'The timestamp of the commit',
    type: 'string',
    scope: 'pipeline'
  },
  'CI_COMMIT_TITLE': {
    description: 'The title of the commit',
    type: 'string',
    scope: 'pipeline'
  },
  'CI_CONCURRENT_ID': {
    description: 'The unique ID of build execution',
    type: 'string',
    scope: 'job'
  },
  'CI_CONCURRENT_PROJECT_ID': {
    description: 'The unique ID of build execution for the project',
    type: 'string',
    scope: 'job'
  },
  'CI_CONFIG_PATH': {
    description: 'The path to the CI configuration file',
    type: 'string',
    scope: 'pipeline'
  },
  'CI_DEBUG_TRACE': {
    description: 'Whether debug tracing is enabled',
    type: 'boolean',
    scope: 'job'
  },
  'CI_DEFAULT_BRANCH': {
    description: 'The default branch for the project',
    type: 'string',
    scope: 'project'
  },
  'CI_DEPENDENCY_PROXY_GROUP_IMAGE_PREFIX': {
    description: 'The image prefix for pulling images through the dependency proxy',
    type: 'string',
    scope: 'global'
  },
  'CI_DEPENDENCY_PROXY_PASSWORD': {
    description: 'The password to pull images through the dependency proxy',
    type: 'string',
    scope: 'global'
  },
  'CI_DEPENDENCY_PROXY_SERVER': {
    description: 'The server for the dependency proxy',
    type: 'string',
    scope: 'global'
  },
  'CI_DEPENDENCY_PROXY_USER': {
    description: 'The username to pull images through the dependency proxy',
    type: 'string',
    scope: 'global'
  },
  'CI_DEPLOY_FREEZE': {
    description: 'Whether a deploy freeze is active',
    type: 'boolean',
    scope: 'pipeline'
  },
  'CI_DEPLOY_PASSWORD': {
    description: 'Authentication password for the deploy token',
    type: 'string',
    scope: 'job'
  },
  'CI_DEPLOY_USER': {
    description: 'Authentication username for the deploy token',
    type: 'string',
    scope: 'job'
  },
  'CI_DISPOSABLE_ENVIRONMENT': {
    description: 'Marks that the job is executed in a disposable environment',
    type: 'boolean',
    scope: 'job'
  },
  'CI_ENVIRONMENT_NAME': {
    description: 'The name of the environment for this job',
    type: 'string',
    scope: 'job'
  },
  'CI_ENVIRONMENT_SLUG': {
    description: 'The simplified version of the environment name',
    type: 'string',
    scope: 'job'
  },
  'CI_ENVIRONMENT_URL': {
    description: 'The URL of the environment for this job',
    type: 'string',
    scope: 'job'
  },
  'CI_JOB_ID': {
    description: 'The unique ID of the current job',
    type: 'string',
    scope: 'job'
  },
  'CI_JOB_IMAGE': {
    description: 'The name of the image running the CI job',
    type: 'string',
    scope: 'job'
  },
  'CI_JOB_MANUAL': {
    description: 'Whether the job was triggered manually',
    type: 'boolean',
    scope: 'job'
  },
  'CI_JOB_NAME': {
    description: 'The name of the job as defined in .gitlab-ci.yml',
    type: 'string',
    scope: 'job'
  },
  'CI_JOB_STAGE': {
    description: 'The name of the stage as defined in .gitlab-ci.yml',
    type: 'string',
    scope: 'job'
  },
  'CI_JOB_STATUS': {
    description: 'The status of the job as it is currently running',
    type: 'string',
    scope: 'job'
  },
  'CI_JOB_TOKEN': {
    description: 'Token used for authenticating with the GitLab Container Registry and downloading dependent repositories',
    type: 'string',
    scope: 'job'
  },
  'CI_JOB_URL': {
    description: 'Job details URL',
    type: 'string',
    scope: 'job'
  },
  'CI_NODE_INDEX': {
    description: 'Index of the job in the job set',
    type: 'number',
    scope: 'job'
  },
  'CI_NODE_TOTAL': {
    description: 'Total number of instances of this job running in parallel',
    type: 'number',
    scope: 'job'
  },
  'CI_PAGES_DOMAIN': {
    description: 'The configured domain that hosts GitLab Pages',
    type: 'string',
    scope: 'global'
  },
  'CI_PAGES_URL': {
    description: 'URL to GitLab Pages-built pages',
    type: 'string',
    scope: 'job'
  },
  'CI_PIPELINE_ID': {
    description: 'The unique ID of the current pipeline',
    type: 'string',
    scope: 'pipeline'
  },
  'CI_PIPELINE_IID': {
    description: 'The unique ID of the current pipeline scoped to project',
    type: 'string',
    scope: 'pipeline'
  },
  'CI_PIPELINE_SOURCE': {
    description: 'How the pipeline was triggered',
    type: 'string',
    scope: 'pipeline'
  },
  'CI_PIPELINE_TRIGGERED': {
    description: 'Whether the job was triggered by an upstream pipeline',
    type: 'boolean',
    scope: 'pipeline'
  },
  'CI_PIPELINE_URL': {
    description: 'Pipeline details URL',
    type: 'string',
    scope: 'pipeline'
  },
  'CI_PROJECT_DIR': {
    description: 'The full path the repository is cloned to',
    type: 'string',
    scope: 'job'
  },
  'CI_PROJECT_ID': {
    description: 'The unique ID of the current project',
    type: 'string',
    scope: 'project'
  },
  'CI_PROJECT_NAME': {
    description: 'The name of the directory for the project',
    type: 'string',
    scope: 'project'
  },
  'CI_PROJECT_NAMESPACE': {
    description: 'The project namespace',
    type: 'string',
    scope: 'project'
  },
  'CI_PROJECT_PATH': {
    description: 'The project namespace with project name',
    type: 'string',
    scope: 'project'
  },
  'CI_PROJECT_PATH_SLUG': {
    description: 'The project path converted to lowercase with characters replaced by -',
    type: 'string',
    scope: 'project'
  },
  'CI_PROJECT_REPOSITORY_LANGUAGES': {
    description: 'Comma-separated, lowercase list of programming languages used in the repository',
    type: 'string',
    scope: 'project'
  },
  'CI_PROJECT_ROOT_NAMESPACE': {
    description: 'The root project namespace',
    type: 'string',
    scope: 'project'
  },
  'CI_PROJECT_TITLE': {
    description: 'The human-readable project name',
    type: 'string',
    scope: 'project'
  },
  'CI_PROJECT_URL': {
    description: 'The HTTP(S) URL to access the project',
    type: 'string',
    scope: 'project'
  },
  'CI_PROJECT_VISIBILITY': {
    description: 'The project visibility (internal, private, public)',
    type: 'string',
    scope: 'project'
  },
  'CI_REGISTRY': {
    description: 'Address of GitLab Container Registry',
    type: 'string',
    scope: 'global'
  },
  'CI_REGISTRY_IMAGE': {
    description: 'Address of the project Container Registry',
    type: 'string',
    scope: 'project'
  },
  'CI_REGISTRY_PASSWORD': {
    description: 'Password to push containers to the project Container Registry',
    type: 'string',
    scope: 'job'
  },
  'CI_REGISTRY_USER': {
    description: 'Username to push containers to the project Container Registry',
    type: 'string',
    scope: 'job'
  },
  'CI_REPOSITORY_URL': {
    description: 'The URL to clone the Git repository',
    type: 'string',
    scope: 'project'
  },
  'CI_RUNNER_DESCRIPTION': {
    description: 'The description of the runner',
    type: 'string',
    scope: 'job'
  },
  'CI_RUNNER_ID': {
    description: 'The unique ID of runner being used',
    type: 'string',
    scope: 'job'
  },
  'CI_RUNNER_TAGS': {
    description: 'The defined runner tags',
    type: 'array',
    scope: 'job'
  },
  'CI_SERVER': {
    description: 'Mark that job is executed in CI environment',
    type: 'boolean',
    scope: 'global'
  },
  'CI_SERVER_HOST': {
    description: 'Host component of the GitLab instance URL',
    type: 'string',
    scope: 'global'
  },
  'CI_SERVER_NAME': {
    description: 'The name of CI server that is used to coordinate jobs',
    type: 'string',
    scope: 'global'
  },
  'CI_SERVER_PORT': {
    description: 'Port component of the GitLab instance URL',
    type: 'string',
    scope: 'global'
  },
  'CI_SERVER_PROTOCOL': {
    description: 'Protocol component of the GitLab instance URL',
    type: 'string',
    scope: 'global'
  },
  'CI_SERVER_URL': {
    description: 'The base URL of the GitLab instance',
    type: 'string',
    scope: 'global'
  },
  'CI_SERVER_VERSION': {
    description: 'GitLab version that is used to schedule jobs',
    type: 'string',
    scope: 'global'
  },
  'CI_SERVER_VERSION_MAJOR': {
    description: 'Major version of the GitLab instance',
    type: 'number',
    scope: 'global'
  },
  'CI_SERVER_VERSION_MINOR': {
    description: 'Minor version of the GitLab instance',
    type: 'number',
    scope: 'global'
  },
  'CI_SERVER_VERSION_PATCH': {
    description: 'Patch version of the GitLab instance',
    type: 'number',
    scope: 'global'
  },
  'CI_SHARED_ENVIRONMENT': {
    description: 'Marks that the job is executed in a shared environment',
    type: 'boolean',
    scope: 'job'
  },
  'GITLAB_CI': {
    description: 'Mark that job is executed in GitLab CI environment',
    type: 'boolean',
    scope: 'global'
  },
  'GITLAB_FEATURES': {
    description: 'The comma-separated list of licensed features available for the GitLab instance',
    type: 'string',
    scope: 'global'
  }
}