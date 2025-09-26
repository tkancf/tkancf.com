---
id: blog/i5k7z6y
aliases:
  - Neovimのプラグインマネージャーをlazy.nvimからvim-jetpackに移行する
tags:
  - 作業ログ
  - Vim
created: 2025-01-09 16:23
title: Neovimのプラグインマネージャーをlazy.nvimからvim-jetpackに移行する
updated: 2025-01-09 16:23
---

# Neovimのプラグインマネージャーをlazy.nvimからvim-jetpackに移行する

## 理由

- Lazy.nvimのoptsが暗黙的に何やってるか分からずに、結局config = functionってやることがあって微妙
- [tani/vim-jetpack: The lightning-fast plugin manager, alternative to vim-plug](https://github.com/tani/vim-jetpack)

## 設定

- 設定スタイル選び
    - Modern packer.nvim/ paq.nvim style
- 設定移行
    - 一旦設定をinit.lua一つにまとめてみる
- 該当commit
    - https://github.com/tkancf/dotfiles/commit/bbc259c28ddcd766a568eebefae0c1b49d462594
    - https://github.com/tkancf/dotfiles/commit/ce5c5c72dbbfb6f8c142080ef026b970e8f8e656

```lua
require('basic')

-- vim-jetpack
-- Automatic installation vim-jetpack on startup
-- https://github.com/tani/vim-jetpack?tab=readme-ov-file#automatic-installation-on-startup

local jetpackfile = vim.fn.stdpath('data') .. '/site/pack/jetpack/opt/vim-jetpack/plugin/jetpack.vim'
local jetpackurl = "https://raw.githubusercontent.com/tani/vim-jetpack/master/plugin/jetpack.vim"
if vim.fn.filereadable(jetpackfile) == 0 then
  vim.fn.system(string.format('curl -fsSLo %s --create-dirs %s', jetpackfile, jetpackurl))
end

vim.cmd('packadd vim-jetpack')
require('jetpack.packer').add {
  {'tani/vim-jetpack'}, -- bootstrap
  {
    'https://github.com/cohama/lexima.vim',
    config = function()
      vim.g.lexima_enable_space_rules = 0
    end,
  },
  {
    'https://github.com/rbtnn/vim-ambiwidth'
  },
  {
    'https://github.com/thinca/vim-qfreplace'
  },
  {
    'https://github.com/yuki-yano/lexima-alter-command.vim',
    requires = {
      'https://github.com/cohama/lexima.vim'
    },
    config = function()
      vim.cmd [[
      LeximaAlterCommand obw ObsidianWorkspace
      LeximaAlterCommand obd ObsidianDailies
      LeximaAlterCommand obt ObsidianToday
      LeximaAlterCommand obe ObsidianExtractNote
      ]]
    end,
  },
  {
    'https://github.com/machakann/vim-sandwich',
  },
  {
    'https://github.com/lambdalisue/gin.vim',
    requires = {
      'https://github.com/vim-denops/denops.vim',
    },
  },
  {
    'https://github.com/monaqa/dial.nvim',
    config = function()
      vim.keymap.set("n", "<C-a>", function()
        require("dial.map").manipulate("increment", "normal")
      end)
      vim.keymap.set("n", "<C-x>", function()
        require("dial.map").manipulate("decrement", "normal")
      end)
      vim.keymap.set("n", "g<C-a>", function()
        require("dial.map").manipulate("increment", "gnormal")
      end)
      vim.keymap.set("n", "g<C-x>", function()
        require("dial.map").manipulate("decrement", "gnormal")
      end)
      vim.keymap.set("v", "<C-a>", function()
        require("dial.map").manipulate("increment", "visual")
      end)
      vim.keymap.set("v", "<C-x>", function()
        require("dial.map").manipulate("decrement", "visual")
      end)
      vim.keymap.set("v", "g<C-a>", function()
        require("dial.map").manipulate("increment", "gvisual")
      end)
      vim.keymap.set("v", "g<C-x>", function()
        require("dial.map").manipulate("decrement", "gvisual")
      end)
    end,
  },
  {
    'https://github.com/haya14busa/vim-asterisk',
    config = function()
      local opts = { noremap = true, silent = true }

      vim.api.nvim_set_keymap('', '*', '<Plug>(asterisk-z*)', opts)
      vim.api.nvim_set_keymap('', '#', '<Plug>(asterisk-z#)', opts)
      vim.api.nvim_set_keymap('', 'g*', '<Plug>(asterisk-gz*)', opts)
      vim.api.nvim_set_keymap('', 'g#', '<Plug>(asterisk-gz#)', opts)
    end
  },
  {
    'https://github.com/tani/dmacro.nvim',
    config = function()
      vim.keymap.set({ "i", "n" }, '<C-t>', '<Plug>(dmacro-play-macro)')
    end
  },
  {
    'https://github.com/navarasu/onedark.nvim',
    lazy = false,    -- make sure we load this during startup if it is your main colorscheme
    priority = 1000, -- make sure to load this before all the other start plugins
    config = function()
      require('onedark').setup {
        style = 'warm'
      }
      require('onedark').load()
    end,
  },
  {
    'https://github.com/stevearc/oil.nvim',
    -- Optional dependencies
    requires = { "nvim-tree/nvim-web-devicons" },
    config = function()
      require("oil").setup()
      vim.keymap.set("n", "-", "<CMD>Oil<CR>", { desc = "Open parent directory" })
    end
  },
  {
    'https://github.com/nvim-telescope/telescope.nvim',
    requires = { 'https://github.com/nvim-lua/plenary.nvim' },
  },
  {
    "folke/which-key.nvim",
    config = function()
      require("which-key").add({
        { "<leader>",  group = "Telescope" },
        { "<leader>;", "<cmd>lua require('telescope.builtin').command_history()<cr>", desc = "Command history" },
        { "<leader>b", "<cmd>lua require('telescope.builtin').buffers()<cr>",         desc = "Buffers" },
        { "<leader>f", "<cmd>lua require('telescope.builtin').find_files()<cr>",      desc = "Find Files" },
        { "<leader>g", "<cmd>lua require('telescope.builtin').live_grep()<cr>",       desc = "Live Grep" },
        { "<leader>h", "<cmd>lua require('telescope.builtin').help_tags()<cr>",       desc = "Help Tags" },
        { "<leader>u", "<cmd>lua require('telescope.builtin').oldfiles()<cr>",        desc = "Recent Files" },
      })
    end
  },
  {
    'https://github.com/mattn/vim-maketable',
    lazy = true,
    ft = 'markdown',
  },
  {
    "nvim-treesitter/nvim-treesitter",
    build = ":TSUpdate",
    config = function()
      require 'nvim-treesitter.configs'.setup {
        highlight = {
          ensure_installed = { "markdown" },
          enable = true,
          additional_vim_regex_highlighting = false,
        },
      }
    end,
  },
  {
    "https://github.com/epwalsh/obsidian.nvim",
    ft = "markdown",
    requires = {
      -- Required.
      'https://github.com/nvim-lua/plenary.nvim',
      'https://github.com/hrsh7th/nvim-cmp',
      'https://github.com/nvim-telescope/telescope.nvim',
      'https://github.com/nvim-treesitter/nvim-treesitter',
      -- see below for full list of optional dependencies 👇
    },
    config = function()
      require("obsidian").setup({
        ui = {
          enable = true
        },
        attachments = {
          img_folder = "assets", -- This is the default
          -- A function that determines the text to insert in the note when pasting an image.
          -- It takes two arguments, the `obsidian.Client` and an `obsidian.Path` to the image file.
          -- This is the default implementation.
          ---@param client obsidian.Client
          ---@param path obsidian.Path the absolute path to the image file
          ---@return string
          img_text_func = function(client, path)
            path = client:vault_relative_path(path) or path
            return string.format("![%s](%s)", path.name, path)
          end,
        },
        -- Base dir of Obsidian vault
        workspaces = {
          {
            name = "Memo",
            path = "~/Dropbox/Memo",
          },
          {
            name = "Note",
            path = "~/Dropbox/Note",
          },
          {
            name = "note.tkancf.com",
            path = "~/src/github.com/tkancf/note.tkancf.com/content",
          },
        },
        completion = {
          -- Set to false to disable completion.
          nvim_cmp = true,
          -- Trigger completion at 2 chars.
          min_chars = 2,
        },
        -- Optional, configure key mappings. These are the defaults. If you don't want to set any keymappings this
        -- way then set 'mappings = {}'.
        mappings = {
          -- Overrides the 'gf' mapping to work on markdown/wiki links within your vault.
          ["gf"] = {
            action = function()
              return require("obsidian").util.gf_passthrough()
            end,
            opts = { noremap = false, expr = true, buffer = true },
          },
          -- Toggle check-boxes.
          ["<leader>ch"] = {
            action = function()
              return require("obsidian").util.toggle_checkbox()
            end,
            opts = { buffer = true },
          },
          -- Smart action depending on context, either follow link or toggle checkbox.
          ["<cr>"] = {
            action = function()
              if require("obsidian").util.cursor_on_markdown_link(nil, nil, true) then
                return "<cmd>ObsidianFollowLink<CR>"
              end
            end,
            opts = { buffer = true, expr = true },
          }
        },
        -- Either 'wiki' or 'markdown'.
        preferred_link_style = "markdown",

        -- Daily note settings.
        daily_notes = {
          -- Optional, if you keep daily notes in a separate directory.
          folder = "",
          -- Optional, if you want to change the date format for the ID of daily notes.
          date_format = "%Y-%m-%d",
          -- Optional, if you want to automatically insert a template from your template directory like 'daily.md'
          template = nil
        },

        -- Template settings.
        templates = {
          subdir = ".config/template",
          date_format = "%Y-%m-%d",
          time_format = "%H:%M",
          -- A map for custom variables, the key should be the variable and the value a function
          substitutions = {
            yesterday = function()
              return os.date("%Y-%m-%d", os.time() - 86400)
            end,
          },
        },
        -- Optional, customize how note IDs are generated given an optional title.
        ---@param title string|?
        ---@return string
        note_id_func = function(title)
          -- Generate a unique ID YYYYMMDDHHMMSS format
          return tostring(os.date("%Y%m%d%H%M%S"))
        end,

        -- Optional, alternatively you can customize the frontmatter data.
        ---@return table
        note_frontmatter_func = function(note)
          -- Add the title of the note as an alias.
          if note.title then
            note:add_alias(note.title)
          end

          -- Create timestamps for created and updated times
          local created_time = os.date("%Y-%m-%d %H:%M") -- ISO 8601 format
          local updated_time = created_time              -- Initially, created and updated times are the same

          -- Initialize the frontmatter table
          local out = {
            id = note.id,
            title = note.title,
            aliases = note.aliases,
            tags = note.tags,
            created = created_time,
            updated = updated_time
          }

          -- If note.metadata already has created or updated, use those values instead
          if note.metadata ~= nil and not vim.tbl_isempty(note.metadata) then
            for k, v in pairs(note.metadata) do
              out[k] = v
            end
            if note.metadata.created then out.created = note.metadata.created end
            if note.metadata.updated then out.updated = note.metadata.updated end
          end

          return out
        end,

        -- Optional, by default when you use `:ObsidianFollowLink` on a link to an external
        -- URL it will be ignored but you can customize this behavior here.
        ---@param url string
        follow_url_func = function(url)
          -- Open the URL in the default web browser.
          vim.fn.jobstart({ "open", url }) -- Mac OS
          -- vim.fn.jobstart({"xdg-open", url})  -- linux
        end,

        vim.api.nvim_set_keymap('n', '<leader>on', '<cmd>ObsidianNew<cr>', { noremap = true, silent = true }),
        vim.api.nvim_set_keymap('n', '<leader>os', '<cmd>ObsidianFollowLink hsplit<cr>',
        { noremap = true, silent = true }),
        vim.api.nvim_set_keymap('n', '<leader>ot', '<cmd>ObsidianToday<cr>',
        { noremap = true, silent = true }),
        vim.api.nvim_set_keymap('n', '<leader>ob', '<cmd>ObsidianBacklinks<cr>',
        { noremap = true, silent = true }),
      })
    end
  },
  {
    "https://github.com/arakkkkk/marktodo.nvim",
    config = function()
      require("marktodo").setup()
    end,

  },
}

-- Automatic plugin installation on startup

local jetpack = require('jetpack')
for _, name in ipairs(jetpack.names()) do
  if not jetpack.tap(name) then
    jetpack.sync()
    break
  end
end

-- -- lazy.nvim
--
-- local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
-- if not vim.loop.fs_stat(lazypath) then
--     vim.fn.system({
  --         "git",
  --         "clone",
  --         "--filter=blob:none",
  --         "https://github.com/folke/lazy.nvim.git",
  --         "--branch=stable", -- latest stable release
  --         lazypath,
  --     })
  -- end
  -- vim.opt.rtp:prepend(lazypath)
  -- require("lazy").setup("plugins")
  --
  -- -- My plugins
  -- -- vim.api.nvim_set_keymap('n', '<leader>oo', "<cmd>lua require('markdown_title_picker').open_markdown_by_title()<CR>",
  -- --     { noremap = true, silent = true })
  -- require('markdown_highlights').setup()
  -- require('plugins.tkancf.markdown_title_picker').setup()
  ```

## 2025/01/10追記

- vim-jetpackに移行する作業してたら、Lazy.nvimに対する理解も深まったので、逆に差し戻しました。
