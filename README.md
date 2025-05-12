# GitLab CI YAML Language Server

A Language Server Protocol (LSP) implementation for GitLab CI YAML files, designed for Neovim.

## Features
- Syntax validation for `.gitlab-ci.yml` files
- Autocompletion for GitLab CI keywords
- Hover information for keywords
- Document symbols for navigation
- Formatting support

## Dependencies
- `yaml-language-server`

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/huyhoang8398/gitlab-ci-language-server
   cd gitlab-ci-language-server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```

## Neovim Integration
1. Ensure you have an LSP client installed in Neovim (e.g., `nvim-lspconfig`).
2. Configure the language server in your Neovim setup:
```lua
vim.api.nvim_create_autocmd({ "BufRead", "BufNewFile" }, {
    pattern = "*.gitlab-ci*.{yml,yaml}",
    callback = function()
        vim.bo.filetype = "yaml.gitlab"
    end,
})
vim.api.nvim_create_autocmd("FileType", {
    pattern = "yaml.gitlab",
    callback = function()
        vim.lsp.start({
            name = "gitlab_ci_ls",
            cmd = { "node", "/home/kn/dev/personal/gitlab-ci-ls/dist/server.js", "--stdio" },
            root_dir = vim.fs.dirname(vim.fs.find({ ".gitlab-ci.yml" }, { upward = true })[1]),
        })
    end,
})
```

## Usage
- Open a `.gitlab-ci.yml` file in Neovim.
- Use LSP features like:
  - Autocompletion (`<C-x><C-o>` or your mapping)
  - Hover (`:lua vim.lsp.buf.hover()`)
  - Go to symbol (`:lua vim.lsp.buf.document_symbol()`)
  - Format document (`:lua vim.lsp.buf.format()`)

## Development
- Build: `npm run build`
- Start: `npm start`
- Add new features by extending the providers in `src/`.

## License
Licensed under the Apache License, Version 2.0. See the [LICENSE](./LICENSE) file for details.
