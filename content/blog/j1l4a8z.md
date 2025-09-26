---
id: blog/j1l4a8z
aliases:
  - Neovimの起動時間を見直してみる
  - "LOG: Neovimの起動時間を見直してみる"
tags:
  - Vim
  - 作業ログ
created: 2025-01-15 14:11
title: Neovimの起動時間を見直してみる
updated: 2025-01-15 14:11
---

# LOG: Neovimの起動時間を見直してみる

## 計測のためにvim-startuptimeを使う

[rhysd/vim-startuptime: A small Go program for better `vim --startuptime` alternative](https://github.com/rhysd/vim-startuptime)

### miseでインストール

```bash
mise use -g "go:github.com/rhysd/vim-startuptime"
```

## 初回計測

### vim-startuptime

<!--{{{-->
```bash
❯ vim-startuptime -vimpath nvim
Extra options: []
Measured: 10 times

Total Average: 95.994600 msec
Total Max:     100.352000 msec
Total Min:     92.762000 msec

  AVERAGE       MAX       MIN
------------------------------
84.425400 88.763000 81.376000: /Users/tkan/.config/nvim/init.lua
13.132300 13.963000 12.717000: /Users/tkan/.local/share/nvim/lazy/lexima.vim/autoload/lexima.vim
10.114550 16.261000  4.174000: require('cmp')
 5.743900  6.254000  4.855000: /Users/tkan/.local/share/nvim/lazy/nvim-treesitter/plugin/nvim-treesitter.lua
 5.180700  5.587000  4.388000: require('nvim-treesitter')
 4.903300  5.987000  3.851000: /Users/tkan/.local/share/nvim/lazy/dial.nvim/plugin/dial.vim
 4.716400  5.742000  3.654000: require('dial.map')
 4.310800  4.732000  3.700000: require('nvim-treesitter.install')
 4.188900  5.279000  3.238000: require('dial.command')
 4.173300  5.104000  3.691000: require('cmp.core')
 3.925400  5.012000  3.008000: require('dial.config')
 3.711800  4.733000  2.861000: require('dial.augend')
 3.711300  5.343000  2.836000: require('codecompanion')
 3.630700  3.852000  3.034000: /Users/tkan/.local/share/nvim/lazy/onedark.nvim/colors/onedark.lua
 3.407000  3.583000  3.271000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/plugin/vsnip.vim
 3.249100  3.288000  3.214000: reading ShaDa
 2.891400  3.688000  2.383000: /Users/tkan/.local/share/nvim/lazy/nvim-lspconfig/plugin/lspconfig.lua
 2.855300  3.047000  2.767000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vsnip.vim
 2.651800  3.156000  2.110000: require('nvim-treesitter.parsers')
 2.601300  2.790000  2.514000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vsnip/session.vim
 2.180000  2.931000  1.786000: require('vim.lsp')
 1.957700  2.547000  1.617000: require('codecompanion.utils.log')
 1.902600  1.959000  1.722000: expanding arguments
 1.751900  1.852000  1.684000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/matchit.vim
 1.728700  2.824000  1.326000: require('dial.augend.date')
 1.660600  1.799000  1.587000: /Users/tkan/.local/share/nvim/lazy/copilot.vim/autoload/copilot.vim
 1.601700  2.252000  1.284000: /Users/tkan/.local/share/nvim/lazy/nvim-cmp/plugin/cmp.lua
 1.388000  1.962000  0.879000: require('vim.treesitter')
 1.376200  2.080000  0.889000: require('codecompanion.config')
 1.371300  1.884000  1.117000: require('plenary.async')
 1.318500  1.455000  1.172000: require('lazy.view.commands')
 1.252900  2.210000  0.800000: require('mini.icons')
 1.215800  3.509000  0.109000: require('which-key')
 1.175200  1.759000  0.990000: require('cmp.view')
 1.110700  1.261000  1.004000: require('lazy.manage')
 1.109700  2.109000  0.789000: require('vim.filetype')
 1.107500  1.453000  0.701000: require('onedark.highlights')
 1.072200  1.437000  0.911000: require('nvim-treesitter.info')
 1.024900  1.383000  0.710000: require('vim.treesitter.languagetree')
 0.968900  0.997000  0.914000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vsnip/snippet.vim
 0.946900  1.119000  0.812000: require('lazy.core.loader')
 0.931800  1.235000  0.784000: require('nvim-treesitter.configs')
 0.879400  1.041000  0.762000: require('lazy.manage.runner')
 0.853400  0.890000  0.817000: sourcing vimrc file(s)
 0.769200  1.048000  0.632000: require('nvim-treesitter.query')
 0.754800  0.952000  0.658000: require('cmp.utils.async')
 0.735100  1.165000  0.566000: require('cmp.types')
 0.724000  0.981000  0.592000: require('plenary.async.async')
 0.696300  1.223000  0.492000: require('vim.lsp.util')
 0.690600  1.059000  0.433000: require('vim.treesitter.query')
 0.684300  0.732000  0.659000: inits 3
 0.646700  0.823000  0.558000: require('codecompanion.providers.completion.cmp.slash_commands')
 0.642400  0.696000  0.593000: require('lazy')
 0.626700  0.827000  0.547000: require('cmp.config')
 0.623500  0.950000  0.521000: /Users/tkan/.local/share/nvim/lazy/cmp-buffer/after/plugin/cmp_buffer.lua
 0.623500  0.698000  0.520000: require('vim._defaults')
 0.619500  0.818000  0.498000: require('cmp.source')
 0.619000  0.871000  0.457000: /Users/tkan/.local/share/nvim/lazy/dmacro.nvim/plugin/dmacro.vim
 0.606100  0.746000  0.503000: require('lspconfig.util')
 0.587800  0.715000  0.476000: /Users/tkan/.local/share/nvim/lazy/denops.vim/plugin/denops.vim
 0.577700  0.706000  0.428000: require('lazy.core.plugin')
 0.545200  0.811000  0.395000: require('dmacro')
 0.539300  0.980000  0.406000: require('vim.lsp.protocol')
 0.535600  0.830000  0.450000: require('cmp_buffer')
 0.524100  1.161000  0.096000: require('onedark')
 0.508800  0.635000  0.411000: require('lazy.manage.task')
 0.481500  0.870000  0.256000: require('onedark.colors')
 0.473500  0.693000  0.376000: require('cmp.entry')
 0.462100  0.564000  0.389000: require('plenary.async.tests')
 0.419300  0.536000  0.286000: require('lazy.core.meta')
 0.402800  0.666000  0.343000: require('cmp_buffer.source')
 0.400100  0.531000  0.329000: require('codecompanion.completion')
 0.394500  0.740000  0.255000: require('plenary.path')
 0.386300  0.534000  0.311000: require('dial.augend.case')
 0.385800  0.457000  0.348000: /Users/tkan/.local/share/nvim/lazy/lexima.vim/autoload/lexima/insmode.vim
 0.384100  0.631000  0.185000: require('oil')
 0.378400  0.464000  0.289000: BufEnter autocommands
 0.369500  0.415000  0.317000: require('cmp.utils.feedkeys')
 0.369300  0.583000  0.287000: require('plenary.vararg')
 0.366300  0.579000  0.304000: require('cmp.view.docs_view')
 0.360900  0.454000  0.325000: locale set
 0.356300  0.559000  0.278000: require('nvim-treesitter.tsrange')
 0.345900  0.438000  0.291000: require('lazy.stats')
 0.344500  0.423000  0.295000: require('plenary.async.util')
 0.343400  0.533000  0.269000: require('codecompanion.commands')
 0.339400  0.765000  0.197000: require('vim.lsp._snippet_grammar')
 0.332900  0.522000  0.242000: require('cmp.types.lsp')
 0.328900  0.355000  0.318000: init lua interpreter
 0.328400  0.379000  0.297000: /Users/tkan/.local/share/nvim/lazy/lexima.vim/autoload/vital/_lexima/Data/List.vim
 0.326300  0.368000  0.310000: inits 1
 0.325900  0.452000  0.271000: require('oil.util')
 0.322500  0.414000  0.281000: /Users/tkan/.local/share/nvim/lazy/cmp-nvim-lsp/after/plugin/cmp_nvim_lsp.lua
 0.313500  0.429000  0.253000: require('vim.loader')
 0.306000  0.326000  0.288000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/syntax/syntax.vim
 0.302100  0.462000  0.199000: require('vim.diagnostic')
 0.302000  0.472000  0.235000: /Users/tkan/.local/share/nvim/lazy/cmp-cmdline/after/plugin/cmp_cmdline.lua
 0.296100  0.309000  0.277000: /Users/tkan/.local/share/nvim/lazy/lexima.vim/autoload/vital/_lexima/Data/String.vim
 0.295900  0.565000  0.230000: require('cmp.utils.str')
 0.291800  0.545000  0.215000: require('vim.lsp._changetracking')
 0.283500  0.391000  0.220000: require('codecompanion.strategies')
 0.278700  0.284000  0.273000: require('basic')
 0.273700  0.366000  0.158000: require('dial.augend.constant')
 0.270700  0.445000  0.226000: require('cmp_buffer.buffer')
 0.270200  0.379000  0.123000: require('lazy.core.handler.ft')
 0.267000  0.584000  0.204000: /Users/tkan/.local/share/nvim/lazy/cmp-path/after/plugin/cmp_path.lua
 0.264700  0.456000  0.131000: require('dial.augend.integer')
 0.260500  0.302000  0.216000: require('cmp.utils.keymap')
 0.258200  0.280000  0.226000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/vsnip.vim
 0.256000  0.340000  0.214000: require('cmp_nvim_lsp')
 0.247200  0.413000  0.196000: require('cmp.utils.window')
 0.245900  0.324000  0.205000: require('cmp.config.default')
 0.245100  0.370000  0.207000: require('dial.augend.common')
 0.244500  0.315000  0.167000: require('lazy.pkg')
 0.242400  0.261000  0.235000: init highlight
 0.241300  0.276000  0.224000: /Users/tkan/.local/share/nvim/lazy/lexima.vim/autoload/vital/lexima.vim
 0.237900  0.319000  0.151000: require('lazy.core.config')
 0.234500  0.346000  0.189000: require('plenary.vararg.rotate')
 0.232500  0.362000  0.191000: require('cmp.utils.autocmd')
 0.222600  0.278000  0.197000: require('plenary.async.control')
 0.220300  0.239000  0.207000: /Users/tkan/.local/share/nvim/lazy/copilot.vim/plugin/copilot.vim
 0.216600  0.232000  0.209000: require('markdown_highlights')
 0.215700  0.244000  0.194000: require('cmp.context')
 0.214000  0.230000  0.195000: /Users/tkan/.local/share/nvim/lazy/lexima.vim/autoload/vital/_lexima/Prelude.vim
 0.210600  0.342000  0.130000: require('dial.augend.paren')
 0.210100  0.301000  0.182000: require('vim.uri')
 0.210000  0.602000  0.124000: require('vim.lsp.log')
 0.206900  0.389000  0.128000: require('nvim-treesitter.ts_utils')
 0.202400  0.346000  0.142000: /Users/tkan/.local/share/nvim/lazy/telescope.nvim/plugin/telescope.lua
 0.201900  0.326000  0.163000: require('cmp_cmdline')
 0.200300  0.327000  0.107000: require('lazy.terminal')
 0.197500  0.225000  0.180000: /Users/tkan/.local/share/nvim/lazy/vim-sandwich/plugin/operator/sandwich.vim
 0.196900  0.508000  0.118000: require('nvim-treesitter.utils')
 0.194900  0.296000  0.128000: require('cmp.utils.snippet')
 0.180600  0.189000  0.172000: require('vim._init_packages')
 0.178800  0.439000  0.136000: require('cmp_path')
 0.177600  0.228000  0.159000: /Users/tkan/.local/share/nvim/lazy/denops.vim/autoload/denops.vim
 0.176900  0.363000  0.101000: require('plenary.bit')
 0.176800  0.228000  0.109000: require('lazy.core.handler')
 0.174700  0.247000  0.116000: require('lazy.core.fragments')
 0.172500  0.325000  0.117000: require('onedark.palette')
 0.170800  0.301000  0.143000: require('oil.fs')
 0.170700  0.213000  0.148000: require('vim.version')
 0.169900  0.266000  0.131000: require('vim.lsp.rpc')
 0.169900  0.440000  0.105000: require('vim.treesitter.language')
 0.165400  0.181000  0.157000: /Users/tkan/.local/share/nvim/lazy/vim-sandwich/plugin/sandwich.vim
 0.164400  0.176000  0.153000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/pack/dist/opt/matchit/plugin/matchit.vim
 0.164200  0.204000  0.110000: require('dial.augend.semver')
 0.163700  0.197000  0.140000: require('lazy.core.util')
 0.162800  0.284000  0.116000: require('nvim-treesitter.shell_command_selectors')
 0.162500  0.359000  0.121000: require('cmp.view.custom_entries_view')
 0.162100  0.291000  0.109000: require('lazy.manage.process')
 0.160150  0.331000  0.037000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/filetype.lua
 0.155500  0.232000  0.106000: require('codecompanion.utils.context')
 0.155200  0.218000  0.105000: require('lazy.core.handler.keys')
 0.154000  0.242000  0.099000: require('nvim-treesitter.query_predicates')
 0.153900  0.225000  0.131000: require('onedark.terminal')
 0.153600  0.191000  0.113000: require('lazy.core.handler.event')
 0.153500  0.230000  0.113000: require('dial.augend.decimal_fraction')
 0.153500  0.214000  0.118000: require('lazy.async')
 0.149900  0.220000  0.128000: require('cmp.utils.api')
 0.148500  0.176000  0.124000: require('vim.iter')
 0.147300  0.255000  0.110000: require('onedark.util')
 0.146800  0.305000  0.107000: require('cmp.utils.misc')
 0.143600  0.301000  0.101000: require('vim.lsp.sync')
 0.142400  0.196000  0.100000: require('lazy.core.handler.cmd')
 0.140600  0.252000  0.105000: require('oil.constants')
 0.139800  0.194000  0.122000: require('cmp.utils.char')
 0.139600  0.246000  0.106000: require('cmp.config.mapping')
 0.138900  0.218000  0.105000: require('dial.augend.hexcolor')
 0.138400  0.247000  0.107000: require('cmp.view.wildmenu_entries_view')
 0.138200  0.184000  0.118000: require('oil.config')
 0.137900  0.177000  0.108000: require('codecompanion.adapters')
 0.136600  0.148000  0.125000: /Users/tkan/.local/share/nvim/lazy/lexima.vim/autoload/vital/_lexima/Vim/Guard.vim
 0.135400  0.204000  0.092000: require('cmp.utils.event')
 0.134800  0.150000  0.119000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/matchparen.vim
 0.133700  0.182000  0.094000: require('cmp.utils.highlight')
 0.133500  0.211000  0.113000: require('codecompanion.providers.completion.cmp.models')
 0.133300  0.190000  0.094000: require('oil.ringbuf')
 0.132500  0.148000  0.118000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/_vsnip/VS/LSP/Diff.vim
 0.131600  0.225000  0.093000: require('vim.func')
 0.131100  0.221000  0.101000: require('vim.highlight')
 0.130500  0.175000  0.099000: require('dial.handle')
 0.128400  0.237000  0.098000: require('dial.util')
 0.128000  0.191000  0.093000: require('nvim-treesitter.caching')
 0.127800  0.224000  0.095000: require('dial.augend.user')
 0.126600  0.158000  0.102000: require('nvim-treesitter.compat')
 0.126200  0.140000  0.112000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/gzip.vim
 0.125900  0.193000  0.094000: require('dial.augend.misc')
 0.125700  0.196000  0.098000: require('nvim-treesitter.highlight')
 0.125500  0.181000  0.095000: require('cmp.matcher')
 0.125400  0.157000  0.109000: require('codecompanion.strategies.chat.slash_commands')
 0.123500  0.184000  0.099000: require('vim.func._memoize')
 0.123400  0.190000  0.097000: require('nvim-treesitter.statusline')
 0.123300  0.134000  0.115000: /Users/tkan/.local/share/nvim/lazy/lexima.vim/autoload/vital/_lexima/Vim/Buffer.vim
 0.122500  0.184000  0.098000: require('codecompanion.utils.adapters')
 0.122400  0.147000  0.110000: require('cmp.view.ghost_text_view')
 0.121400  0.131000  0.105000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/_vsnip/VS/LSP/TextEdit.vim
 0.120600  0.162000  0.103000: require('vim.treesitter._range')
 0.120400  0.192000  0.104000: require('cmp_buffer.timer')
 0.119700  0.151000  0.106000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/rplugin.vim
 0.119500  0.246000  0.095000: require('cmp.types.vim')
 0.119000  0.209000  0.089000: require('cmp.utils.options')
 0.118700  0.155000  0.098000: require('cmp.config.compare')
 0.118000  0.163000  0.092000: require('cmp.utils.buffer')
 0.117700  0.196000  0.096000: require('codecompanion.providers.completion.cmp.tools')
 0.117400  0.169000  0.101000: require('cmp.config.sources')
 0.117300  0.137000  0.102000: require('cmp_nvim_lsp.source')
 0.116400  0.154000  0.105000: require('cmp.types.cmp')
 0.114600  0.150000  0.098000: require('cmp.view.native_entries_view')
 0.113100  0.137000  0.103000: require('codecompanion.providers.completion.cmp.variables')
 0.110800  0.168000  0.093000: require('cmp.utils.debug')
 0.109900  0.153000  0.094000: require('plenary.functional')
 0.108100  0.158000  0.090000: require('plenary.errors')
 0.107800  0.139000  0.092000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/_vsnip/VS/Vim/Buffer.vim
 0.106700  0.143000  0.093000: require('cmp.utils.pattern')
 0.106400  0.140000  0.090000: require('plenary.tbl')
 0.105800  0.134000  0.094000: require('plenary.async.structs')
 0.105600  0.125000  0.093000: require('cmp.utils.cache')
 0.104900  0.133000  0.094000: /Users/tkan/.local/share/nvim/lazy/lexima.vim/autoload/vital/_lexima/Data/Dict.vim
 0.104800  0.119000  0.091000: require('cmp.config.window')
 0.104300  0.109000  0.101000: early init
 0.103900  0.115000  0.092000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/zipPlugin.vim
 0.103200  0.106000  0.101000: require('vim._editor')
 0.102800  0.113000  0.095000: /Users/tkan/.local/share/nvim/lazy/vim-ambiwidth/plugin/ambiwidth.vim
 0.095000  0.114000  0.079000: /Users/tkan/.local/share/nvim/lazy/lexima.vim/autoload/lexima/cmdmode.vim
 0.091100  0.108000  0.079000: /Users/tkan/.local/share/nvim/lazy/vim-asterisk/plugin/asterisk.vim
 0.086900  0.107000  0.074000: /Users/tkan/.local/share/nvim/lazy/lexima.vim/autoload/vital/_lexima/Vim/Type.vim
 0.082000  0.128000  0.064000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/man.lua
 0.078700  0.089000  0.072000: /Users/tkan/.local/share/nvim/lazy/vim-sandwich/plugin/textobj/sandwich.vim
 0.078600  0.090000  0.070000: opening buffers
 0.073700  0.082000  0.066000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/tarPlugin.vim
 0.070500  0.078000  0.062000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/editorconfig.lua
 0.069400  0.115000  0.052000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/tohtml.lua
 0.067000  0.077000  0.063000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/_vsnip/VS/LSP/Position.vim
 0.063100  0.076000  0.053000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/osc52.lua
 0.061900  0.078000  0.053000: /Users/tkan/.local/share/nvim/lazy/which-key.nvim/plugin/which-key.lua
 0.061100  0.072000  0.050000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/syntax/synload.vim
 0.056400  0.078000  0.047000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/shada.vim
 0.054500  0.058000  0.052000: event init
 0.049100  0.079000  0.024000: require('vim.fs')
 0.047800  0.053000  0.043000: /Users/tkan/.local/share/nvim/lazy/lexima.vim/plugin/lexima.vim
 0.047100  0.061000  0.040000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/_vsnip/VS/LSP/Text.vim
 0.045600  0.051000  0.036000: /Users/tkan/.local/share/nvim/lazy/lexima.vim/autoload/lexima/charstack.vim
 0.043800  0.059000  0.035000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/_vsnip/VS/Vim/Option.vim
 0.043700  0.047000  0.041000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/ftplugin.vim
 0.043000  0.052000  0.037000: /Users/tkan/.local/share/nvim/lazy/denops.vim/plugin/denops/debug.vim
 0.041400  0.048000  0.037000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin.vim
 0.036200  0.051000  0.017000: require('ffi')
 0.035900  0.037000  0.035000: /Users/tkan/.local/share/nvim/lazy/copilot.vim/autoload/copilot/util.vim
 0.035500  0.047000  0.029000: /Users/tkan/.local/share/nvim/lazy/lexima.vim/autoload/lexima/endwise_rule.vim
 0.035500  0.046000  0.029000: /Users/tkan/.local/share/nvim/lazy/lexima.vim/autoload/lexima/sortedlist.vim
 0.033100  0.037000  0.031000: require('vim.inspect')
 0.032900  0.047000  0.024000: /Users/tkan/.local/share/nvim/lazy/lexima.vim/autoload/lexima/string.vim
 0.031500  0.048000  0.025000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-branch.vim
 0.029800  0.041000  0.024000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-diff.vim
 0.029700  0.031000  0.029000: require('vim.shared')
 0.028500  0.030000  0.028000: require('vim._options')
 0.026900  0.039000  0.022000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-edit.vim
 0.026000  0.028000  0.025000: init first window
 0.025500  0.034000  0.022000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-log.vim
 0.025500  0.038000  0.020000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-status.vim
 0.024300  0.033000  0.023000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/indent.vim
 0.024300  0.039000  0.019000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-cd.vim
 0.023900  0.042000  0.014000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/_vsnip.vim
 0.023200  0.025000  0.021000: /Users/tkan/.local/share/nvim/lazy/plenary.nvim/plugin/plenary.vim
 0.022700  0.031000  0.019000: /Users/tkan/.local/share/nvim/lazy/vim-qfreplace/plugin/qfreplace.vim
 0.022500  0.029000  0.018000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-browse.vim
 0.018000  0.024000  0.013000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/tutor.vim
 0.016000  0.019000  0.014000: /Users/tkan/.local/share/nvim/lazy/lexima.vim/autoload/vital/_lexima.vim
 0.015900  0.022000  0.012000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/netrwPlugin.vim
 0.015900  0.023000  0.012000: /Users/tkan/.local/share/nvim/lazy/lexima-alter-command.vim/autoload/lexima_alter_command.vim
 0.015400  0.023000  0.012000: /Users/tkan/.local/share/nvim/lazy/lexima-alter-command.vim/plugin/lexima_alter_command.vim
 0.015400  0.026000  0.014000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/spellfile.vim
 0.015200  0.018000  0.014000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-chaperon.vim
 0.014900  0.021000  0.013000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-patch.vim
 0.014700  0.020000  0.014000: --- NVIM STARTED ---
 0.014600  0.018000  0.013000: clear screen
 0.011300  0.014000  0.010000: window checked
 0.009800  0.011000  0.009000: inits 2
 0.009700  0.015000  0.007000: /Users/tkan/.local/share/nvim/lazy/denops.vim/autoload/denops/_internal/conf.vim
 0.008400  0.012000  0.004000: require('vim.F')
 0.006700  0.010000  0.005000: require('vim.keymap')
 0.003800  0.004000  0.003000: init default mappings & autocommands
 0.003400  0.004000  0.003000: parsing arguments
 0.002900  0.005000  0.002000: editing files in windows
 0.000000  0.000000  0.000000: --- NVIM STARTING ---
```
<!--}}}-->

Total Average: 95.994600 msec
とりあえず20msecを目指してみる

## 改善1 - 不要なデフォルトプラグインの読み込みを抑制

[Add optimization settings · tkancf/dotfiles@4356820](https://github.com/tkancf/dotfiles/commit/4356820152da9cd8dc528aef4bf953f1f4bdbfa4)
[Neovimの設定を見直して起動を30倍速にした](https://zenn.dev/kawarimidoll/articles/8172a4c29a6653#%E6%A8%99%E6%BA%96%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3%E3%81%AE%E7%84%A1%E5%8A%B9%E5%8C%96)を参考に、以下の設定を追加

```lua
vim.g.did_install_default_menus = 1
vim.g.did_install_syntax_menu = 1
vim.g.did_indent_on = 1
-- vim.g.did_load_filetypes = 1
-- vim.g.did_load_ftplugin = 1
vim.g.loaded_2html_plugin = 1
vim.g.loaded_gzip = 1
vim.g.loaded_man = 1
vim.g.loaded_matchit = 1
vim.g.loaded_matchparen = 1
vim.g.loaded_netrwPlugin = 1
vim.g.loaded_remote_plugins = 1
vim.g.loaded_shada_plugin = 1
vim.g.loaded_spellfile_plugin = 1
vim.g.loaded_tarPlugin = 1
vim.g.loaded_tutor_mode_plugin = 1
vim.g.loaded_zipPlugin = 1
vim.g.skip_loading_mswin = 1
```

`vim.g.did_load_filetypes`は私の環境だとシンタックスハイライトが消えたのでコメントアウト

### vim-startuptime

Total Average: 95.994600 msec → Total Average: 92.954300 msec
若干早くなった？

## 改善2 - プラグインの遅延ロード

### lexima.vim

[Add lazy setting to lexima.vim · tkancf/dotfiles@fb23da4](https://github.com/tkancf/dotfiles/commit/fb23da4e53a4d267eb9575ef698bc8cc0484e7b7)
Total Average: 92.954300 msec → Total Average: 77.498400 msec
めちゃくちゃ早くなった！

<!--{{{-->
```
leximaの遅延ロード
❯❯ ~
❯ vim-startuptime -vimpath nvim
Extra options: []
Measured: 10 times

Total Average: 77.498400 msec
Total Max:     81.040000 msec
Total Min:     74.295000 msec

  AVERAGE       MAX       MIN
------------------------------
66.244900 69.994000 62.891000: /Users/tkan/.config/nvim/init.lua
10.282950 17.000000  4.043000: require('cmp')
 5.676600  6.220000  5.083000: /Users/tkan/.local/share/nvim/lazy/nvim-treesitter/plugin/nvim-treesitter.lua
 5.190100  5.774000  4.641000: require('nvim-treesitter')
 4.370000  5.040000  3.640000: require('nvim-treesitter.install')
 4.311800  5.349000  3.451000: /Users/tkan/.local/share/nvim/lazy/dial.nvim/plugin/dial.vim
 4.281500  5.343000  3.538000: require('cmp.core')
 4.107600  5.058000  3.314000: require('dial.map')
 3.618300  4.381000  2.870000: require('dial.command')
 3.555900  3.738000  3.321000: /Users/tkan/.local/share/nvim/lazy/onedark.nvim/colors/onedark.lua
 3.346500  4.108000  2.617000: require('dial.config')
 3.308600  3.430000  3.222000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/plugin/vsnip.vim
 3.242300  3.308000  3.163000: reading ShaDa
 3.217300  4.316000  2.722000: require('codecompanion')
 3.122100  3.854000  2.446000: require('dial.augend')
 2.987000  3.490000  2.338000: /Users/tkan/.local/share/nvim/lazy/nvim-lspconfig/plugin/lspconfig.lua
 2.861100  3.419000  2.017000: require('nvim-treesitter.parsers')
 2.773200  2.826000  2.710000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vsnip.vim
 2.523900  2.585000  2.459000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vsnip/session.vim
 2.284000  2.804000  1.659000: require('vim.lsp')
 1.884600  1.964000  1.793000: expanding arguments
 1.769100  2.308000  1.614000: require('codecompanion.utils.log')
 1.652400  1.956000  1.285000: /Users/tkan/.local/share/nvim/lazy/nvim-cmp/plugin/cmp.lua
 1.647600  1.851000  1.567000: /Users/tkan/.local/share/nvim/lazy/copilot.vim/autoload/copilot.vim
 1.624800  2.067000  1.140000: require('vim.treesitter')
 1.369300  2.044000  0.790000: require('mini.icons')
 1.326800  1.911000  0.945000: require('cmp.view')
 1.290900  3.645000  0.116000: require('which-key')
 1.286800  1.755000  1.161000: require('plenary.async')
 1.217800  1.429000  1.078000: require('lazy.view.commands')
 1.215000  1.700000  0.973000: require('dial.augend.date')
 1.151900  1.906000  0.748000: require('vim.filetype')
 1.151500  1.629000  0.854000: require('vim.treesitter.languagetree')
 1.055100  1.414000  0.676000: require('codecompanion.config')
 1.037200  1.241000  0.871000: require('lazy.manage')
 0.991400  1.212000  0.783000: require('onedark.highlights')
 0.962400  0.990000  0.929000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vsnip/snippet.vim
 0.956800  1.095000  0.805000: require('nvim-treesitter.info')
 0.927700  1.069000  0.838000: require('lazy.core.loader')
 0.855000  0.992000  0.803000: sourcing vimrc file(s)
 0.827600  0.959000  0.687000: require('nvim-treesitter.configs')
 0.822500  1.213000  0.514000: require('vim.lsp.util')
 0.800700  1.024000  0.657000: require('lazy.manage.runner')
 0.794500  0.970000  0.541000: require('cmp.types')
 0.784000  1.070000  0.440000: require('vim.treesitter.query')
 0.766800  1.108000  0.625000: require('cmp.utils.async')
 0.672900  0.782000  0.619000: require('plenary.async.async')
 0.672100  0.801000  0.546000: require('nvim-treesitter.query')
 0.651800  0.715000  0.621000: require('lazy')
 0.646400  0.972000  0.517000: require('cmp.config')
 0.631700  0.724000  0.557000: require('codecompanion.providers.completion.cmp.slash_commands')
 0.628000  0.713000  0.573000: require('cmp.source')
 0.608000  0.813000  0.478000: require('lspconfig.util')
 0.601400  0.698000  0.537000: require('vim._defaults')
 0.596000  0.634000  0.550000: require('lazy.core.plugin')
 0.585000  0.640000  0.480000: /Users/tkan/.local/share/nvim/lazy/denops.vim/plugin/denops.vim
 0.581400  0.845000  0.402000: require('vim.lsp.protocol')
 0.566900  0.685000  0.470000: /Users/tkan/.local/share/nvim/lazy/cmp-buffer/after/plugin/cmp_buffer.lua
 0.554800  0.692000  0.451000: /Users/tkan/.local/share/nvim/lazy/dmacro.nvim/plugin/dmacro.vim
 0.525700  1.247000  0.151000: require('onedark')
 0.503400  0.643000  0.345000: inits 3
 0.492900  0.606000  0.411000: require('cmp_buffer')
 0.478500  0.561000  0.356000: require('cmp.entry')
 0.477700  0.823000  0.397000: require('plenary.async.tests')
 0.476000  0.611000  0.383000: require('dmacro')
 0.472900  0.618000  0.405000: require('lazy.manage.task')
 0.449600  0.808000  0.201000: require('vim.lsp._snippet_grammar')
 0.429400  0.467000  0.393000: require('lazy.core.meta')
 0.413900  0.622000  0.177000: require('oil')
 0.389400  0.604000  0.306000: require('dial.augend.case')
 0.379900  0.464000  0.330000: require('codecompanion.completion')
 0.372400  0.645000  0.306000: require('plenary.async.util')
 0.369000  0.494000  0.313000: require('cmp_buffer.source')
 0.364000  0.485000  0.295000: require('cmp.view.docs_view')
 0.363600  0.463000  0.271000: require('onedark.colors')
 0.359200  0.416000  0.300000: require('cmp.utils.feedkeys')
 0.352800  0.520000  0.224000: require('cmp.types.lsp')
 0.351300  0.426000  0.293000: BufEnter autocommands
 0.346500  0.444000  0.304000: require('codecompanion.commands')
 0.334400  0.407000  0.295000: require('plenary.vararg')
 0.333200  0.348000  0.328000: locale set
 0.329500  0.350000  0.312000: init lua interpreter
 0.321800  0.413000  0.240000: require('plenary.path')
 0.321800  0.425000  0.258000: require('oil.util')
 0.320800  0.335000  0.303000: inits 1
 0.313700  0.432000  0.237000: require('lazy.stats')
 0.305200  0.330000  0.276000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/syntax/syntax.vim
 0.304300  0.490000  0.147000: require('dial.augend.constant')
 0.300900  0.399000  0.118000: require('lazy.core.handler.ft')
 0.297800  0.355000  0.264000: /Users/tkan/.local/share/nvim/lazy/cmp-nvim-lsp/after/plugin/cmp_nvim_lsp.lua
 0.296800  0.312000  0.287000: require('basic')
 0.291400  0.323000  0.258000: require('vim.loader')
 0.290500  0.396000  0.202000: require('vim.diagnostic')
 0.277100  0.428000  0.217000: require('nvim-treesitter.tsrange')
 0.259400  0.490000  0.151000: require('dial.augend.integer')
 0.259300  0.309000  0.199000: require('lazy.pkg')
 0.259300  0.346000  0.232000: /Users/tkan/.local/share/nvim/lazy/cmp-cmdline/after/plugin/cmp_cmdline.lua
 0.258000  0.310000  0.218000: require('cmp.utils.str')
 0.256100  0.336000  0.222000: require('codecompanion.strategies')
 0.255200  0.273000  0.227000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/vsnip.vim
 0.252100  0.394000  0.199000: require('dial.augend.common')
 0.251800  0.377000  0.207000: require('cmp_buffer.buffer')
 0.249700  0.311000  0.203000: require('cmp.utils.keymap')
 0.249200  0.406000  0.200000: require('cmp.config.default')
 0.248100  0.448000  0.197000: require('plenary.async.control')
 0.246100  0.298000  0.174000: require('lazy.core.config')
 0.245700  0.303000  0.206000: require('vim.lsp._changetracking')
 0.245300  0.377000  0.198000: require('cmp.utils.window')
 0.239700  0.248000  0.234000: init highlight
 0.232700  0.281000  0.210000: require('cmp_nvim_lsp')
 0.222400  0.300000  0.201000: require('plenary.vararg.rotate')
 0.222200  0.270000  0.192000: require('cmp.utils.autocmd')
 0.222200  0.286000  0.190000: require('cmp.context')
 0.217000  0.228000  0.208000: require('markdown_highlights')
 0.213100  0.278000  0.180000: /Users/tkan/.local/share/nvim/lazy/cmp-path/after/plugin/cmp_path.lua
 0.211400  0.227000  0.198000: /Users/tkan/.local/share/nvim/lazy/copilot.vim/plugin/copilot.vim
 0.208000  0.320000  0.141000: require('dial.augend.paren')
 0.202400  0.413000  0.123000: require('vim.lsp.log')
 0.199900  0.374000  0.107000: require('cmp.view.wildmenu_entries_view')
 0.199800  0.395000  0.116000: require('cmp.view.custom_entries_view')
 0.198200  0.239000  0.183000: require('vim.uri')
 0.197700  0.238000  0.141000: require('lazy.core.handler.event')
 0.196100  0.226000  0.178000: /Users/tkan/.local/share/nvim/lazy/vim-sandwich/plugin/operator/sandwich.vim
 0.193100  0.290000  0.099000: require('vim.treesitter.language')
 0.190800  0.273000  0.154000: require('lazy.terminal')
 0.186800  0.221000  0.141000: require('lazy.core.util')
 0.185400  0.214000  0.157000: /Users/tkan/.local/share/nvim/lazy/telescope.nvim/plugin/telescope.lua
 0.180800  0.273000  0.136000: require('vim.lsp.rpc')
 0.179300  0.405000  0.114000: require('nvim-treesitter.utils')
 0.178200  0.194000  0.160000: require('vim._init_packages')
 0.177800  0.274000  0.154000: require('cmp_cmdline')
 0.176200  0.289000  0.127000: require('cmp.utils.api')
 0.174700  0.216000  0.146000: require('oil.fs')
 0.172200  0.211000  0.140000: require('vim.version')
 0.172200  0.196000  0.160000: /Users/tkan/.local/share/nvim/lazy/denops.vim/autoload/denops.vim
 0.172100  0.260000  0.130000: require('cmp.utils.snippet')
 0.172000  0.187000  0.158000: /Users/tkan/.local/share/nvim/lazy/vim-sandwich/plugin/sandwich.vim
 0.171900  0.220000  0.144000: require('lazy.core.handler.keys')
 0.169800  0.238000  0.134000: require('lazy.core.handler.cmd')
 0.169500  0.213000  0.156000: require('lazy.core.fragments')
 0.165000  0.234000  0.115000: require('lazy.core.handler')
 0.164700  0.272000  0.101000: require('cmp.view.native_entries_view')
 0.157900  0.184000  0.112000: require('onedark.util')
 0.157200  0.288000  0.115000: require('vim.iter')
 0.156900  0.345000  0.094000: require('vim.func')
 0.156550  0.299000  0.033000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/filetype.lua
 0.152300  0.200000  0.119000: require('onedark.palette')
 0.151900  0.214000  0.108000: require('cmp.view.ghost_text_view')
 0.149300  0.228000  0.115000: require('oil.config')
 0.148600  0.215000  0.124000: require('onedark.terminal')
 0.147600  0.268000  0.109000: require('nvim-treesitter.ts_utils')
 0.145900  0.238000  0.112000: require('lazy.async')
 0.145400  0.240000  0.119000: require('nvim-treesitter.shell_command_selectors')
 0.143800  0.207000  0.102000: require('vim.treesitter._range')
 0.142100  0.218000  0.112000: require('lazy.manage.process')
 0.141500  0.212000  0.119000: require('cmp_path')
 0.140000  0.218000  0.102000: require('oil.constants')
 0.138600  0.257000  0.107000: require('cmp.utils.misc')
 0.138100  0.203000  0.097000: require('nvim-treesitter.compat')
 0.134600  0.222000  0.104000: require('cmp.config.mapping')
 0.133300  0.184000  0.113000: require('codecompanion.providers.completion.cmp.models')
 0.132600  0.167000  0.096000: require('plenary.bit')
 0.132000  0.248000  0.095000: require('cmp_buffer.timer')
 0.131800  0.165000  0.114000: require('cmp.utils.char')
 0.131200  0.180000  0.108000: require('codecompanion.utils.context')
 0.130700  0.184000  0.101000: require('oil.ringbuf')
 0.129500  0.194000  0.097000: require('codecompanion.utils.adapters')
 0.129400  0.172000  0.107000: require('codecompanion.strategies.chat.slash_commands')
 0.128800  0.144000  0.110000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/_vsnip/VS/LSP/Diff.vim
 0.128600  0.171000  0.102000: require('nvim-treesitter.query_predicates')
 0.127800  0.209000  0.097000: require('dial.util')
 0.127700  0.208000  0.102000: require('vim.func._memoize')
 0.127700  0.219000  0.096000: require('cmp.matcher')
 0.127100  0.191000  0.105000: require('cmp.types.cmp')
 0.125200  0.206000  0.105000: require('cmp.config.sources')
 0.124700  0.249000  0.094000: require('dial.augend.user')
 0.124300  0.202000  0.099000: require('cmp.config.compare')
 0.123800  0.198000  0.094000: require('dial.augend.misc')
 0.123600  0.204000  0.098000: require('vim.highlight')
 0.123300  0.225000  0.093000: require('dial.augend.semver')
 0.122500  0.190000  0.095000: require('plenary.functional')
 0.122400  0.163000  0.094000: require('cmp.utils.highlight')
 0.122400  0.176000  0.097000: require('vim.lsp.sync')
 0.121700  0.178000  0.092000: require('cmp.utils.cache')
 0.121100  0.159000  0.108000: require('codecompanion.adapters')
 0.120700  0.237000  0.089000: require('cmp.utils.options')
 0.120600  0.182000  0.095000: require('cmp.types.vim')
 0.117300  0.139000  0.107000: require('dial.augend.decimal_fraction')
 0.117100  0.129000  0.099000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/_vsnip/VS/LSP/TextEdit.vim
 0.117000  0.174000  0.094000: require('nvim-treesitter.statusline')
 0.115900  0.225000  0.096000: require('dial.handle')
 0.115800  0.167000  0.100000: require('nvim-treesitter.highlight')
 0.113700  0.165000  0.091000: require('cmp.utils.pattern')
 0.113700  0.173000  0.089000: require('cmp.utils.event')
 0.112900  0.164000  0.091000: require('cmp.utils.buffer')
 0.112600  0.194000  0.094000: require('plenary.async.structs')
 0.110400  0.163000  0.091000: require('cmp.utils.debug')
 0.109100  0.195000  0.092000: require('plenary.tbl')
 0.109000  0.128000  0.103000: require('cmp_nvim_lsp.source')
 0.108500  0.145000  0.099000: /Users/tkan/.local/share/nvim/lazy/vim-ambiwidth/plugin/ambiwidth.vim
 0.108300  0.125000  0.101000: require('codecompanion.providers.completion.cmp.tools')
 0.107200  0.122000  0.094000: require('dial.augend.hexcolor')
 0.105200  0.125000  0.095000: require('nvim-treesitter.caching')
 0.105200  0.117000  0.097000: require('codecompanion.providers.completion.cmp.variables')
 0.103500  0.107000  0.101000: require('vim._editor')
 0.103400  0.121000  0.090000: require('plenary.errors')
 0.103000  0.109000  0.099000: early init
 0.102100  0.108000  0.097000: require('cmp.config.window')
 0.101000  0.121000  0.092000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/_vsnip/VS/Vim/Buffer.vim
 0.087400  0.093000  0.081000: /Users/tkan/.local/share/nvim/lazy/vim-asterisk/plugin/asterisk.vim
 0.081000  0.094000  0.074000: /Users/tkan/.local/share/nvim/lazy/vim-sandwich/plugin/textobj/sandwich.vim
 0.072100  0.084000  0.065000: opening buffers
 0.068900  0.164000  0.050000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/man.lua
 0.068400  0.170000  0.052000: /Users/tkan/.local/share/nvim/lazy/which-key.nvim/plugin/which-key.lua
 0.066800  0.080000  0.059000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/editorconfig.lua
 0.066100  0.070000  0.064000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/_vsnip/VS/LSP/Position.vim
 0.061200  0.073000  0.053000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/syntax/synload.vim
 0.056800  0.084000  0.047000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/tohtml.lua
 0.055200  0.072000  0.049000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/osc52.lua
 0.054000  0.061000  0.051000: event init
 0.049400  0.060000  0.041000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/_vsnip/VS/LSP/Text.vim
 0.046800  0.052000  0.041000: require('ffi')
 0.045700  0.069000  0.038000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin.vim
 0.044900  0.070000  0.031000: require('vim.fs')
 0.044400  0.054000  0.036000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/_vsnip/VS/Vim/Option.vim
 0.044200  0.045000  0.042000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/ftplugin.vim
 0.042300  0.053000  0.037000: /Users/tkan/.local/share/nvim/lazy/denops.vim/plugin/denops/debug.vim
 0.036000  0.039000  0.035000: /Users/tkan/.local/share/nvim/lazy/copilot.vim/autoload/copilot/util.vim
 0.033000  0.036000  0.031000: require('vim.inspect')
 0.031200  0.108000  0.021000: /Users/tkan/.local/share/nvim/lazy/plenary.nvim/plugin/plenary.vim
 0.029700  0.033000  0.028000: require('vim.shared')
 0.029700  0.052000  0.023000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-log.vim
 0.028700  0.030000  0.028000: require('vim._options')
 0.027400  0.038000  0.024000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-diff.vim
 0.026900  0.041000  0.019000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-cd.vim
 0.026800  0.039000  0.023000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-edit.vim
 0.026600  0.029000  0.025000: init first window
 0.026500  0.031000  0.020000: /Users/tkan/.local/share/nvim/lazy/vim-qfreplace/plugin/qfreplace.vim
 0.026300  0.029000  0.025000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-branch.vim
 0.025300  0.038000  0.023000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/indent.vim
 0.023300  0.032000  0.018000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-browse.vim
 0.023200  0.032000  0.020000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-status.vim
 0.017500  0.034000  0.014000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/_vsnip.vim
 0.016200  0.024000  0.012000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/netrwPlugin.vim
 0.016100  0.028000  0.013000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-patch.vim
 0.015600  0.024000  0.010000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/gzip.vim
 0.014900  0.023000  0.009000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/tarPlugin.vim
 0.014800  0.027000  0.008000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/matchparen.vim
 0.014800  0.017000  0.014000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-chaperon.vim
 0.014700  0.019000  0.013000: clear screen
 0.014000  0.015000  0.013000: --- NVIM STARTED ---
 0.013200  0.021000  0.010000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/zipPlugin.vim
 0.011800  0.020000  0.009000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/matchit.vim
 0.011300  0.019000  0.006000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/tutor.vim
 0.010800  0.019000  0.006000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/rplugin.vim
 0.010600  0.013000  0.010000: window checked
 0.010300  0.015000  0.004000: require('vim.F')
 0.010200  0.015000  0.007000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/spellfile.vim
 0.010100  0.011000  0.009000: inits 2
 0.008600  0.015000  0.007000: /Users/tkan/.local/share/nvim/lazy/denops.vim/autoload/denops/_internal/conf.vim
 0.007700  0.012000  0.005000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/shada.vim
 0.007400  0.010000  0.005000: require('vim.keymap')
 0.003800  0.004000  0.003000: init default mappings & autocommands
 0.003500  0.005000  0.002000: editing files in windows
 0.003100  0.004000  0.003000: parsing arguments
 0.000000  0.000000  0.000000: --- NVIM STARTING ---
```
<!--}}}-->

#### diff
<!--{{{-->
```diff
diff --git a/.config/nvim/lua/plugins/util.lua b/.config/nvim/lua/plugins/util.lua
index 5417673..cc21000 100644
--- a/.config/nvim/lua/plugins/util.lua
+++ b/.config/nvim/lua/plugins/util.lua
@@ -6,6 +6,7 @@ return {
     },
     {
         'https://github.com/cohama/lexima.vim',
+        event = 'BufRead',
         config = function()
             vim.g.lexima_enable_space_rules = 0
         end,
@@ -21,6 +22,7 @@ return {
         dependencies = {
             'https://github.com/cohama/lexima.vim'
         },
+        event = 'BufRead',
         config = function()
             vim.cmd [[
                 LeximaAlterCommand obw ObsidianWorkspace
```
<!--}}}-->

### nvim-treesitter

Total Average: 77.498400 msec →Total Average: 72.648400 msec
ちょっと早くなった

[Add lazy setting to nvim-treesitter · tkancf/dotfiles@b9f2b2b](https://github.com/tkancf/dotfiles/commit/b9f2b2be8d107e375ab907539295026c6ae4da4f)
<!--{{{-->
```
❯ vim-startuptime -vimpath nvim
Extra options: []
Measured: 10 times

Total Average: 72.648400 msec
Total Max:     74.711000 msec
Total Min:     70.791000 msec

  AVERAGE       MAX       MIN
------------------------------
61.469600 63.540000 58.864000: /Users/tkan/.config/nvim/init.lua
10.042850 15.925000  4.089000: require('cmp')
 4.412700  5.615000  3.302000: require('codecompanion')
 4.351000  5.011000  3.668000: require('cmp.core')
 4.347900  4.826000  3.411000: /Users/tkan/.local/share/nvim/lazy/dial.nvim/plugin/dial.vim
 4.104300  4.603000  3.148000: require('dial.map')
 3.646400  4.075000  2.836000: require('dial.command')
 3.559300  3.783000  3.278000: /Users/tkan/.local/share/nvim/lazy/onedark.nvim/colors/onedark.lua
 3.401300  3.845000  2.627000: require('dial.config')
 3.285500  3.435000  3.167000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/plugin/vsnip.vim
 3.198200  3.281000  3.143000: reading ShaDa
 3.185100  3.634000  2.508000: require('dial.augend')
 2.766500  2.882000  2.652000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vsnip.vim
 2.560200  3.039000  2.053000: /Users/tkan/.local/share/nvim/lazy/nvim-lspconfig/plugin/lspconfig.lua
 2.514600  2.616000  2.401000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vsnip/session.vim
 2.210400  2.537000  1.871000: require('codecompanion.utils.log')
 1.923700  2.012000  1.837000: expanding arguments
 1.907700  2.328000  1.569000: require('vim.lsp')
 1.611300  2.084000  1.508000: /Users/tkan/.local/share/nvim/lazy/copilot.vim/autoload/copilot.vim
 1.581200  1.925000  1.380000: /Users/tkan/.local/share/nvim/lazy/nvim-cmp/plugin/cmp.lua
 1.569700  1.897000  1.412000: require('plenary.async')
 1.429100  2.039000  0.873000: require('mini.icons')
 1.426900  2.266000  0.678000: require('codecompanion.config')
 1.384900  1.699000  0.947000: require('dial.augend.date')
 1.304600  1.481000  1.223000: require('lazy.view.commands')
 1.287600  3.611000  0.118000: require('which-key')
 1.179700  1.607000  0.933000: require('cmp.view')
 1.085300  1.262000  0.959000: require('lazy.manage')
 1.061100  1.655000  0.782000: require('vim.filetype')
 1.051900  1.380000  0.763000: require('onedark.highlights')
 0.952000  1.002000  0.924000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vsnip/snippet.vim
 0.947900  1.063000  0.768000: require('vim.treesitter')
 0.868400  1.004000  0.697000: require('lazy.core.loader')
 0.839600  0.870000  0.794000: sourcing vimrc file(s)
 0.837200  1.238000  0.659000: require('cmp.utils.async')
 0.836400  1.050000  0.729000: require('lazy.manage.runner')
 0.828600  0.981000  0.637000: require('plenary.async.async')
 0.802800  0.887000  0.653000: require('vim.treesitter.languagetree')
 0.704200  0.840000  0.549000: require('cmp.types')
 0.698100  1.104000  0.540000: require('cmp.config')
 0.639000  0.687000  0.592000: require('lazy')
 0.633600  0.744000  0.545000: require('codecompanion.providers.completion.cmp.slash_commands')
 0.627800  1.035000  0.466000: require('cmp.source')
 0.612400  1.056000  0.464000: /Users/tkan/.local/share/nvim/lazy/cmp-buffer/after/plugin/cmp_buffer.lua
 0.602400  0.912000  0.490000: require('vim.lsp.util')
 0.580900  0.665000  0.536000: require('vim._defaults')
 0.575200  0.866000  0.443000: require('plenary.async.tests')
 0.565500  0.662000  0.393000: require('lazy.core.plugin')
 0.561900  0.788000  0.410000: require('lspconfig.util')
 0.557000  0.715000  0.423000: /Users/tkan/.local/share/nvim/lazy/dmacro.nvim/plugin/dmacro.vim
 0.552500  0.634000  0.466000: /Users/tkan/.local/share/nvim/lazy/denops.vim/plugin/denops.vim
 0.527800  0.912000  0.400000: require('cmp_buffer')
 0.521000  0.663000  0.375000: inits 3
 0.513600  0.610000  0.424000: require('vim.treesitter.query')
 0.505350  1.102000  0.104000: require('onedark')
 0.494700  0.733000  0.368000: require('vim.lsp.protocol')
 0.488200  0.596000  0.398000: require('lazy.manage.task')
 0.482600  0.800000  0.351000: require('cmp.entry')
 0.473200  0.810000  0.267000: require('onedark.colors')
 0.468600  0.616000  0.363000: require('dmacro')
 0.467000  0.706000  0.307000: require('plenary.path')
 0.448200  0.631000  0.332000: require('plenary.async.util')
 0.431200  0.925000  0.238000: require('codecompanion.commands')
 0.422700  0.645000  0.318000: require('cmp.utils.feedkeys')
 0.412000  0.716000  0.192000: require('oil')
 0.409000  0.493000  0.254000: require('lazy.core.meta')
 0.408800  0.739000  0.304000: require('cmp_buffer.source')
 0.386800  0.503000  0.323000: require('codecompanion.completion')
 0.379000  0.470000  0.311000: require('plenary.vararg')
 0.355700  0.489000  0.293000: require('cmp.view.docs_view')
 0.352200  0.588000  0.259000: /Users/tkan/.local/share/nvim/lazy/cmp-nvim-lsp/after/plugin/cmp_nvim_lsp.lua
 0.346700  0.397000  0.307000: require('dial.augend.case')
 0.340300  0.400000  0.254000: require('lazy.stats')
 0.332500  0.356000  0.311000: init lua interpreter
 0.331700  0.415000  0.279000: require('oil.util')
 0.331700  0.358000  0.318000: locale set
 0.330000  0.428000  0.276000: BufEnter autocommands
 0.329100  0.445000  0.265000: require('vim.loader')
 0.317700  0.419000  0.227000: require('cmp.types.lsp')
 0.316000  0.335000  0.307000: inits 1
 0.308600  0.329000  0.273000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/syntax/syntax.vim
 0.301000  0.767000  0.181000: require('vim.diagnostic')
 0.295200  0.301000  0.289000: require('basic')
 0.294000  0.457000  0.210000: require('plenary.async.control')
 0.289800  0.483000  0.210000: require('cmp.utils.keymap')
 0.283000  0.547000  0.199000: require('cmp_buffer.buffer')
 0.274500  0.391000  0.221000: require('cmp.utils.str')
 0.273200  0.431000  0.103000: require('lazy.core.handler.ft')
 0.272700  0.465000  0.205000: require('cmp_nvim_lsp')
 0.269000  0.385000  0.219000: require('codecompanion.strategies')
 0.267800  0.487000  0.153000: require('dial.augend.constant')
 0.266700  0.309000  0.226000: /Users/tkan/.local/share/nvim/lazy/cmp-cmdline/after/plugin/cmp_cmdline.lua
 0.264000  0.354000  0.172000: require('dial.augend.integer')
 0.262400  0.740000  0.111000: require('vim.iter')
 0.261700  0.469000  0.208000: require('cmp.config.default')
 0.260100  0.342000  0.211000: require('vim.lsp._changetracking')
 0.259600  0.354000  0.201000: require('cmp.utils.autocmd')
 0.257400  0.424000  0.185000: /Users/tkan/.local/share/nvim/lazy/cmp-path/after/plugin/cmp_path.lua
 0.255600  0.319000  0.201000: require('plenary.vararg.rotate')
 0.252500  0.267000  0.228000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/vsnip.vim
 0.252400  0.330000  0.191000: require('lazy.core.config')
 0.250800  0.468000  0.194000: require('vim.lsp._snippet_grammar')
 0.246200  0.308000  0.143000: require('lazy.pkg')
 0.243500  0.261000  0.236000: init highlight
 0.233600  0.337000  0.194000: require('cmp.utils.window')
 0.232900  0.326000  0.185000: require('cmp.context')
 0.226200  0.315000  0.191000: require('vim.uri')
 0.225900  0.266000  0.200000: require('dial.augend.common')
 0.223200  0.242000  0.209000: require('markdown_highlights')
 0.213000  0.223000  0.197000: /Users/tkan/.local/share/nvim/lazy/copilot.vim/plugin/copilot.vim
 0.210300  0.401000  0.103000: require('plenary.bit')
 0.204500  0.270000  0.155000: /Users/tkan/.local/share/nvim/lazy/telescope.nvim/plugin/telescope.lua
 0.192300  0.287000  0.133000: require('cmp.utils.snippet')
 0.191600  0.208000  0.175000: /Users/tkan/.local/share/nvim/lazy/vim-sandwich/plugin/operator/sandwich.vim
 0.191500  0.294000  0.125000: require('oil.config')
 0.185600  0.288000  0.121000: require('lazy.core.handler.event')
 0.181800  0.267000  0.145000: require('lazy.core.util')
 0.178600  0.225000  0.151000: require('cmp_cmdline')
 0.176800  0.284000  0.108000: require('lazy.manage.process')
 0.175100  0.191000  0.155000: require('vim._init_packages')
 0.173900  0.278000  0.102000: require('lazy.core.fragments')
 0.170400  0.221000  0.130000: require('dial.augend.paren')
 0.170100  0.226000  0.106000: require('lazy.terminal')
 0.170100  0.229000  0.138000: require('vim.lsp.rpc')
 0.169800  0.189000  0.156000: /Users/tkan/.local/share/nvim/lazy/denops.vim/autoload/denops.vim
 0.168000  0.221000  0.109000: require('oil.ringbuf')
 0.167400  0.319000  0.120000: require('cmp_path')
 0.165000  0.214000  0.143000: require('oil.fs')
 0.164100  0.334000  0.130000: require('vim.version')
 0.164000  0.212000  0.121000: require('onedark.palette')
 0.163850  0.341000  0.033000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/filetype.lua
 0.162200  0.300000  0.103000: require('cmp.config.mapping')
 0.161700  0.170000  0.156000: /Users/tkan/.local/share/nvim/lazy/vim-sandwich/plugin/sandwich.vim
 0.158400  0.248000  0.108000: require('plenary.functional')
 0.158100  0.232000  0.115000: require('lazy.core.handler.cmd')
 0.153300  0.245000  0.109000: require('cmp.utils.misc')
 0.152400  0.218000  0.109000: require('lazy.core.handler.keys')
 0.150000  0.195000  0.130000: require('codecompanion.utils.context')
 0.150000  0.203000  0.117000: require('lazy.async')
 0.146800  0.268000  0.116000: require('vim.lsp.log')
 0.146300  0.265000  0.097000: require('plenary.async.structs')
 0.144900  0.272000  0.114000: require('cmp.view.wildmenu_entries_view')
 0.144600  0.225000  0.115000: require('cmp.view.custom_entries_view')
 0.144300  0.228000  0.102000: require('oil.constants')
 0.142800  0.242000  0.112000: require('cmp.utils.char')
 0.142300  0.203000  0.120000: require('onedark.terminal')
 0.141300  0.317000  0.094000: require('cmp_buffer.timer')
 0.140700  0.256000  0.090000: require('cmp.utils.buffer')
 0.139700  0.196000  0.105000: require('onedark.util')
 0.139600  0.190000  0.101000: require('cmp.types.vim')
 0.139100  0.210000  0.106000: require('codecompanion.adapters')
 0.138900  0.242000  0.103000: require('cmp.utils.highlight')
 0.138900  0.198000  0.115000: require('lazy.core.handler')
 0.138500  0.249000  0.102000: require('cmp_nvim_lsp.source')
 0.138500  0.156000  0.126000: require('cmp.utils.api')
 0.136000  0.172000  0.108000: require('dial.augend.decimal_fraction')
 0.135700  0.206000  0.099000: require('vim.lsp.sync')
 0.134200  0.274000  0.099000: require('cmp.config.compare')
 0.133500  0.230000  0.109000: require('cmp.view.ghost_text_view')
 0.130800  0.226000  0.095000: require('dial.augend.semver')
 0.130500  0.175000  0.117000: require('codecompanion.providers.completion.cmp.models')
 0.129800  0.144000  0.117000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/_vsnip/VS/LSP/Diff.vim
 0.127400  0.181000  0.096000: require('plenary.tbl')
 0.127300  0.232000  0.100000: require('cmp.view.native_entries_view')
 0.126000  0.184000  0.095000: require('plenary.errors')
 0.125100  0.162000  0.102000: require('codecompanion.utils.adapters')
 0.123800  0.218000  0.099000: require('dial.handle')
 0.123600  0.192000  0.090000: require('cmp.config.window')
 0.123600  0.176000  0.099000: require('vim.highlight')
 0.123000  0.174000  0.106000: require('codecompanion.strategies.chat.slash_commands')
 0.122300  0.172000  0.099000: require('cmp.utils.debug')
 0.120700  0.166000  0.095000: require('dial.augend.hexcolor')
 0.118700  0.161000  0.102000: require('cmp.types.cmp')
 0.117500  0.136000  0.100000: require('cmp.config.sources')
 0.116800  0.155000  0.097000: require('vim.treesitter.language')
 0.116400  0.170000  0.096000: require('codecompanion.providers.completion.cmp.tools')
 0.115900  0.147000  0.099000: require('dial.augend.misc')
 0.115700  0.150000  0.099000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/_vsnip/VS/LSP/TextEdit.vim
 0.115700  0.177000  0.093000: require('cmp.utils.cache')
 0.113500  0.175000  0.095000: require('codecompanion.providers.completion.cmp.variables')
 0.113200  0.148000  0.102000: require('dial.util')
 0.111600  0.144000  0.097000: require('vim.treesitter._range')
 0.110000  0.163000  0.090000: require('cmp.utils.pattern')
 0.109300  0.128000  0.093000: require('dial.augend.user')
 0.107600  0.118000  0.096000: require('cmp.matcher')
 0.107400  0.180000  0.091000: require('cmp.utils.event')
 0.104400  0.135000  0.092000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/_vsnip/VS/Vim/Buffer.vim
 0.104200  0.126000  0.090000: require('cmp.utils.options')
 0.103600  0.116000  0.095000: /Users/tkan/.local/share/nvim/lazy/vim-ambiwidth/plugin/ambiwidth.vim
 0.103400  0.115000  0.093000: require('vim.func._memoize')
 0.103200  0.106000  0.099000: require('vim._editor')
 0.100500  0.103000  0.098000: early init
 0.099200  0.110000  0.088000: require('vim.func')
 0.085100  0.089000  0.081000: /Users/tkan/.local/share/nvim/lazy/vim-asterisk/plugin/asterisk.vim
 0.079300  0.092000  0.072000: /Users/tkan/.local/share/nvim/lazy/vim-sandwich/plugin/textobj/sandwich.vim
 0.072100  0.082000  0.060000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/editorconfig.lua
 0.070300  0.093000  0.060000: opening buffers
 0.068000  0.076000  0.063000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/_vsnip/VS/LSP/Position.vim
 0.067100  0.110000  0.050000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/osc52.lua
 0.067100  0.112000  0.054000: /Users/tkan/.local/share/nvim/lazy/which-key.nvim/plugin/which-key.lua
 0.066100  0.075000  0.055000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/syntax/synload.vim
 0.059300  0.104000  0.048000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/tohtml.lua
 0.058700  0.070000  0.052000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/man.lua
 0.053800  0.075000  0.042000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/_vsnip/VS/LSP/Text.vim
 0.053200  0.057000  0.050000: event init
 0.046000  0.073000  0.024000: require('vim.fs')
 0.045200  0.049000  0.041000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/ftplugin.vim
 0.043400  0.064000  0.037000: /Users/tkan/.local/share/nvim/lazy/denops.vim/plugin/denops/debug.vim
 0.040600  0.048000  0.037000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin.vim
 0.040000  0.060000  0.036000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/_vsnip/VS/Vim/Option.vim
 0.035500  0.036000  0.035000: /Users/tkan/.local/share/nvim/lazy/copilot.vim/autoload/copilot/util.vim
 0.034900  0.049000  0.017000: require('ffi')
 0.032700  0.036000  0.031000: require('vim.inspect')
 0.032300  0.053000  0.019000: /Users/tkan/.local/share/nvim/lazy/vim-qfreplace/plugin/qfreplace.vim
 0.030900  0.043000  0.028000: require('vim.shared')
 0.028700  0.036000  0.024000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-branch.vim
 0.028500  0.030000  0.027000: require('vim._options')
 0.027300  0.048000  0.024000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-diff.vim
 0.026700  0.037000  0.022000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-log.vim
 0.026200  0.039000  0.022000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-edit.vim
 0.026000  0.036000  0.023000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/indent.vim
 0.025700  0.026000  0.025000: init first window
 0.025400  0.050000  0.020000: /Users/tkan/.local/share/nvim/lazy/plenary.nvim/plugin/plenary.vim
 0.024500  0.043000  0.019000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-status.vim
 0.020500  0.030000  0.018000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-browse.vim
 0.019800  0.021000  0.019000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-cd.vim
 0.018200  0.037000  0.014000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-chaperon.vim
 0.016400  0.022000  0.014000: /Users/tkan/.local/share/nvim/lazy/vim-vsnip/autoload/vital/_vsnip.vim
 0.016300  0.024000  0.013000: /Users/tkan/.local/share/nvim/lazy/gin.vim/plugin/gin-patch.vim
 0.016000  0.022000  0.009000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/tarPlugin.vim
 0.015800  0.023000  0.011000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/netrwPlugin.vim
 0.015600  0.021000  0.013000: clear screen
 0.014200  0.015000  0.014000: --- NVIM STARTED ---
 0.014000  0.025000  0.011000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/gzip.vim
 0.013800  0.022000  0.010000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/zipPlugin.vim
 0.012900  0.026000  0.009000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/matchit.vim
 0.011800  0.024000  0.006000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/tutor.vim
 0.011700  0.015000  0.009000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/matchparen.vim
 0.011700  0.040000  0.005000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/shada.vim
 0.010900  0.012000  0.009000: inits 2
 0.010700  0.040000  0.004000: require('vim.F')
 0.010700  0.019000  0.006000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/rplugin.vim
 0.010500  0.021000  0.007000: /opt/homebrew/Cellar/neovim/0.10.0/share/nvim/runtime/plugin/spellfile.vim
 0.009900  0.011000  0.009000: window checked
 0.008800  0.013000  0.007000: /Users/tkan/.local/share/nvim/lazy/denops.vim/autoload/denops/_internal/conf.vim
 0.007900  0.010000  0.006000: require('vim.keymap')
 0.004100  0.005000  0.003000: init default mappings & autocommands
 0.003800  0.005000  0.002000: editing files in windows
 0.003200  0.004000  0.003000: parsing arguments
 0.000000  0.000000  0.000000: --- NVIM STARTING ---
```
<!--}}}-->

#### diff
<!--{{{-->
```diff
❯ yadm diff --cached
diff --git a/.config/nvim/lua/plugins/ai.lua b/.config/nvim/lua/plugins/ai.lua
index 715f8d2..b61f963 100644
--- a/.config/nvim/lua/plugins/ai.lua
+++ b/.config/nvim/lua/plugins/ai.lua
@@ -3,7 +3,6 @@ return {
     "olimorris/codecompanion.nvim",
     dependencies = {
       "nvim-lua/plenary.nvim",
-      "nvim-treesitter/nvim-treesitter",
     },
     --config = true,
     opts = {
diff --git a/.config/nvim/lua/plugins/markdown.lua b/.config/nvim/lua/plugins/markdown.lua
index 027c32e..08d3756 100644
--- a/.config/nvim/lua/plugins/markdown.lua
+++ b/.config/nvim/lua/plugins/markdown.lua
@@ -11,10 +11,10 @@ return {
     ft = "markdown",
     dependencies = {
       -- Required.
-      'https://github.com/nvim-lua/plenary.nvim',
+      -- 'https://github.com/nvim-lua/plenary.nvim',
       -- 'https://github.com/hrsh7th/nvim-cmp',
-      'https://github.com/nvim-telescope/telescope.nvim',
-      'https://github.com/nvim-treesitter/nvim-treesitter',
+      -- 'https://github.com/nvim-telescope/telescope.nvim',
+      -- 'https://github.com/nvim-treesitter/nvim-treesitter',
       -- see below for full list of optional dependencies 👇
     },
     opts = {
diff --git a/.config/nvim/lua/plugins/treesitter.lua b/.config/nvim/lua/plugins/treesitter.lua
index 19894d6..6935d9d 100644
--- a/.config/nvim/lua/plugins/treesitter.lua
+++ b/.config/nvim/lua/plugins/treesitter.lua
@@ -1,6 +1,8 @@
 return {
     "nvim-treesitter/nvim-treesitter",
     build = ":TSUpdate",
+    event = { "BufReadPost" },
+    lazy = true,
     config = function()
         require 'nvim-treesitter.configs'.setup {
             highlight = {
@@ -10,4 +12,4 @@ return {
             },
         }
     end,
-}
\ No newline at end of file
+}
diff --git a/.config/nvim/lua/plugins/util.lua b/.config/nvim/lua/plugins/util.lua
index cc21000..958f6ef 100644
--- a/.config/nvim/lua/plugins/util.lua
+++ b/.config/nvim/lua/plugins/util.lua
@@ -1,4 +1,8 @@
 return {
+    {
+        'https://github.com/nvim-lua/plenary.nvim',
+        lazy = true,
+    },
     {
         'https://github.com/adelarsq/image_preview.nvim',
         ft = 'markdown',
```
<!--}}}-->

### leximaをもう一度
Total Average: 72.648400 msec → Total Average: 70.915600 msec

[Update lexima lazy setting · tkancf/dotfiles@9878907](https://github.com/tkancf/dotfiles/commit/987890783d7069f17144cc25265aac1d07ece62c)
<!--{{{-->
```
❯❯ ~
❯ vim-startuptime -vimpath nvim | head
Extra options: []
Measured: 10 times

Total Average: 70.915600 msec
Total Max:     72.572000 msec
Total Min:     69.673000 msec

  AVERAGE       MAX       MIN
------------------------------
59.753200 61.264000 58.678000: /Users/tkan/.config/nvim/init.lua
❯❯ ~
❯ yadm diff HEAD^
diff --git a/.config/nvim/lazy-lock.json b/.config/nvim/lazy-lock.json
index f175d7b..bfe0875 100644
--- a/.config/nvim/lazy-lock.json
+++ b/.config/nvim/lazy-lock.json
@@ -4,7 +4,7 @@
   "cmp-cmdline": { "branch": "main", "commit": "d250c63aa13ead745e3a40f61fdd3470efde3923" },
   "cmp-nvim-lsp": { "branch": "main", "commit": "99290b3ec1322070bcfb9e846450a46f6efa50f0" },
   "cmp-path": { "branch": "main", "commit": "91ff86cd9c29299a64f968ebb45846c485725f23" },
-  "codecompanion.nvim": { "branch": "main", "commit": "b9ef54bc8412bae203c42d68e7218ea37fd1e3e0" },
+  "codecompanion.nvim": { "branch": "main", "commit": "f9896cc98fbc33942534c5cc23dcc8c4a61c4501" },
   "copilot.vim": { "branch": "release", "commit": "87038123804796ca7af20d1b71c3428d858a9124" },
   "denops.vim": { "branch": "main", "commit": "4ff8f353ee54ee67288c1099242444ccb0ab5b69" },
   "dial.nvim": { "branch": "master", "commit": "34bbd9c387c358190e61ce71017faad3dffa7a74" },
@@ -18,8 +18,7 @@
   "mini.icons": { "branch": "main", "commit": "1c79feb7478ca773fa3dac5cadf43ced9180e861" },
   "nvim-cmp": { "branch": "main", "commit": "8c82d0bd31299dbff7f8e780f5e06d2283de9678" },
   "nvim-lspconfig": { "branch": "master", "commit": "339ccc81e08793c3af9b83882a6ebd90c9cc0d3b" },
-  "nvim-treesitter": { "branch": "master", "commit": "984214ef8e4ca18d77639663319aabdfba89632f" },
-  "nvim-web-devicons": { "branch": "master", "commit": "aafa5c187a15701a7299a392b907ec15d9a7075f" },
+  "nvim-treesitter": { "branch": "master", "commit": "f0c928dbe93533b7e35894a8f957f40150d1f663" },
   "obsidian.nvim": { "branch": "main", "commit": "ae1f76a75c7ce36866e1d9342a8f6f5b9c2caf9b" },
   "oil.nvim": { "branch": "master", "commit": "09fa1d22f5edf0730824d2b222d726c8c81bbdc9" },
   "onedark.nvim": { "branch": "master", "commit": "67a74c275d1116d575ab25485d1bfa6b2a9c38a6" },
diff --git a/.config/nvim/lua/plugins/util.lua b/.config/nvim/lua/plugins/util.lua
index 958f6ef..e5ca701 100644
--- a/.config/nvim/lua/plugins/util.lua
+++ b/.config/nvim/lua/plugins/util.lua
@@ -6,11 +6,11 @@ return {
     {
         'https://github.com/adelarsq/image_preview.nvim',
         ft = 'markdown',
-        --event = 'VeryLazy',
     },
     {
         'https://github.com/cohama/lexima.vim',
-        event = 'BufRead',
+        event = { 'CmdlineEnter', 'InsertEnter' },
+        lazy = true,
         config = function()
             vim.g.lexima_enable_space_rules = 0
         end,
@@ -26,7 +26,7 @@ return {
         dependencies = {
             'https://github.com/cohama/lexima.vim'
         },
-        event = 'BufRead',
+        event = { 'CmdlineEnter' },
         config = function()
             vim.cmd [[
                 LeximaAlterCommand obw ObsidianWorkspace
```
<!--}}}-->

### dial.nvim

[Add lazy setting to dial.nvim · tkancf/dotfiles@77e1506](https://github.com/tkancf/dotfiles/commit/77e1506fee214e5c6df657cfe4d0a364e6b8ebfd)
Total Average: 70.915600 msec → Total Average: 66.301500 msec

### nvim-cmp

[Add lazy setting to nvim-cmp · tkancf/dotfiles@59062c8](https://github.com/tkancf/dotfiles/commit/59062c88bf91627561c7171e0a39a2a387ed1f65)
Total Average: 66.301500 msec → Total Average: 55.422100 msec
<!--{{{-->
```diff
diff --git a/.config/nvim/lua/plugins/nvim-cmp.lua b/.config/nvim/lua/plugins/nvim-cmp.lua
index 14581b0..6889bea 100644
--- a/.config/nvim/lua/plugins/nvim-cmp.lua
+++ b/.config/nvim/lua/plugins/nvim-cmp.lua
@@ -3,14 +3,6 @@ return {
     'hrsh7th/nvim-cmp',
     version = false,
     event = { 'InsertEnter' },
-    dependencies = {
-      'neovim/nvim-lspconfig',
-      'hrsh7th/cmp-nvim-lsp',
-      'hrsh7th/cmp-buffer',
-      'hrsh7th/cmp-path',
-      'hrsh7th/cmp-cmdline',
-      { 'hrsh7th/vim-vsnip', lazy = true }, -- Vsnipを利用する場合
-    },
     opts = function()
       local cmp = require('cmp')
       return {
@@ -61,4 +53,40 @@ return {
       })
     end,
   },
+  {
+    'hrsh7th/vim-vsnip',
+    event = { 'InsertEnter' },
+    lazy = true,
+    version = false,
+  },
+  {
+    'neovim/nvim-lspconfig',
+    event = { 'InsertEnter' },
+    lazy = true,
+    version = false,
+  },
+  {
+    'hrsh7th/cmp-nvim-lsp',
+    event = { 'InsertEnter' },
+    lazy = true,
+    version = false,
+  },
+  {
+    'hrsh7th/cmp-buffer',
+    event = { 'InsertEnter' },
+    lazy = true,
+    version = false,
+  },
+  {
+    'hrsh7th/cmp-path',
+    event = { 'InsertEnter' },
+    lazy = true,
+    version = false,
+  },
+  {
+    'hrsh7th/cmp-cmdline',
+    event = { 'CmdlineEnter' },
+    lazy = true,
+    version = false,
+  },
 }
```
<!--}}}-->

### colorscheme

Total Average: 55.422100 msec → Total Average: 51.519200 msec

[Add lazy setting to color scheme · tkancf/dotfiles@2cffab7](https://github.com/tkancf/dotfiles/commit/2cffab7d2f71ad4a120b6ff6af0f6595440295c3)
```diff
❯ yadm diff
diff --git a/.config/nvim/lua/plugins/colorscheme.lua b/.config/nvim/lua/plugins/colorscheme.lua
index bb5e42e..d84f907 100644
--- a/.config/nvim/lua/plugins/colorscheme.lua
+++ b/.config/nvim/lua/plugins/colorscheme.lua
@@ -1,8 +1,7 @@
 return {
     {
         'https://github.com/navarasu/onedark.nvim',
-        lazy = false,    -- make sure we load this during startup if it is your main colorscheme
-        priority = 1000, -- make sure to load this before all the other start plugins
+        event = 'VimEnter',
         config = function()
             require('onedark').setup {
                 style = 'warm'
```

### codecompanion.nvim

[Add lazy setting to codecompanion.nvim · tkancf/dotfiles@4657ef8](https://github.com/tkancf/dotfiles/commit/4657ef8b04a35420df148def16833476dfe7b212)

Total Average: 51.519200 msec → Total Average: 33.300700 msec

```diff
diff --git a/.config/nvim/lua/plugins/ai.lua b/.config/nvim/lua/plugins/ai.lua
index b61f963..d03e3b8 100644
--- a/.config/nvim/lua/plugins/ai.lua
+++ b/.config/nvim/lua/plugins/ai.lua
@@ -1,12 +1,9 @@
 return {
   {
     "olimorris/codecompanion.nvim",
-    dependencies = {
-      "nvim-lua/plenary.nvim",
-    },
-    --config = true,
+    event = 'WinEnter',
     opts = {
-      language = "Japanese",
+      language = "日本語",
       adapters = {
         ollama = function()
           return require("codecompanion.adapters").extend("ollama", {
@@ -21,7 +18,7 @@ return {
       strategies = {
         -- Change the default chat adapter
         chat = {
-          adapter = "ollama",
+          adapter = "copilot",
         },
         inline = {
           adapter = "copilot",
```

### copilot.vim

[Add lazy setting to copilot.vim · tkancf/dotfiles@0384c2b](https://github.com/tkancf/dotfiles/commit/0384c2b0e85f416373112644743aca0e5f0003e7)
Total Average: 33.300700 msec → Total Average: 30.630500 msec

```diff
diff --git a/.config/nvim/lua/plugins/ai.lua b/.config/nvim/lua/plugins/ai.lua
index d03e3b8..3eabe11 100644
--- a/.config/nvim/lua/plugins/ai.lua
+++ b/.config/nvim/lua/plugins/ai.lua
@@ -27,6 +27,7 @@ return {
     },
   },
   {
-    "https://github.com/github/copilot.vim"
+    "https://github.com/github/copilot.vim",
+    event = 'WinEnter',
   }
```

### dmacro.vim

[Add lazy setting to dmacro.nvim · tkancf/dotfiles@f00d38e](https://github.com/tkancf/dotfiles/commit/f00d38ec5b0b271ddfb41708915a1befa81d2ffe)
Total Average: 30.630500 msec → Total Average: 29.697000 msec

```diff
diff --git a/.config/nvim/lua/plugins/util.lua b/.config/nvim/lua/plugins/util.lua
index bf1e6f0..93c6a11 100644
--- a/.config/nvim/lua/plugins/util.lua
+++ b/.config/nvim/lua/plugins/util.lua
@@ -80,6 +80,7 @@ return {
   },
   {
     'https://github.com/tani/dmacro.nvim',
+    event = { 'InsertEnter', 'CursorMoved' },
     config = function()
       vim.keymap.set({ "i", "n" }, '<C-t>', '<Plug>(dmacro-play-macro)')
     end
```

### denops.vim

[Add lazy setting to denops · tkancf/dotfiles@0e51219](https://github.com/tkancf/dotfiles/commit/0e5121917f78652d9fbcc17780d4984aca2061e8)
Total Average: 29.697000 msec → Total Average: 26.728800 msec

```diff
diff --git a/.config/nvim/lua/plugins/util.lua b/.config/nvim/lua/plugins/util.lua
index 93c6a11..99e0e31 100644
--- a/.config/nvim/lua/plugins/util.lua
+++ b/.config/nvim/lua/plugins/util.lua
@@ -41,9 +41,11 @@ return {
   },
   {
     'https://github.com/lambdalisue/gin.vim',
-    dependencies = {
-      'https://github.com/vim-denops/denops.vim',
-    },
+    event = { 'BufRead' },
+  },
+  {
+    'https://github.com/vim-denops/denops.vim',
+    event = { 'BufRead' },
   },
   {
```

### 他色々まとめて

[Add lazy setting to some plugins · tkancf/dotfiles@f9fab10](https://github.com/tkancf/dotfiles/commit/f9fab10d5620046fd38fd1116187602e1bcc2146)

Total Average: 26.728800 msec →Total Average: 20.772000 msec
<!--{{{-->
```diff
diff --git a/.config/nvim/lua/plugins/launcher.lua b/.config/nvim/lua/plugins/launcher.lua
index c2db082..54f4aaa 100644
--- a/.config/nvim/lua/plugins/launcher.lua
+++ b/.config/nvim/lua/plugins/launcher.lua
@@ -1,8 +1,7 @@
 return {
     {
         'https://github.com/nvim-telescope/telescope.nvim',
-        dependencies = { 'https://github.com/nvim-lua/plenary.nvim' },
-        event = 'BufWinEnter',
+        event = 'WinEnter',
         config = function()
           local wk = require("which-key")
           wk.add({
diff --git a/.config/nvim/lua/plugins/oil.lua b/.config/nvim/lua/plugins/oil.lua
index a65160c..549e17b 100644
--- a/.config/nvim/lua/plugins/oil.lua
+++ b/.config/nvim/lua/plugins/oil.lua
@@ -2,10 +2,13 @@ return {
   {
     'https://github.com/stevearc/oil.nvim',
     event = "BufRead",
-    dependencies = { { "echasnovski/mini.icons", opts = {} } },
     config = function()
       require("oil").setup()
       vim.keymap.set("n", "-", "<CMD>Oil<CR>", { desc = "Open parent directory" })
     end
+  },
+  { "echasnovski/mini.icons",
+    opts = {},
+    lazy = true,
   }
 }
diff --git a/.config/nvim/lua/plugins/util.lua b/.config/nvim/lua/plugins/util.lua
index 99e0e31..fbeebc7 100644
--- a/.config/nvim/lua/plugins/util.lua
+++ b/.config/nvim/lua/plugins/util.lua
@@ -16,10 +16,12 @@ return {
     end,
   },
   {
-    'https://github.com/rbtnn/vim-ambiwidth'
+    'https://github.com/rbtnn/vim-ambiwidth',
+    event = { 'VimEnter' },
   },
   {
-    'https://github.com/thinca/vim-qfreplace'
+    'https://github.com/thinca/vim-qfreplace',
+    event = { 'CmdlineEnter' },
   },
   {
     'https://github.com/yuki-yano/lexima-alter-command.vim',
@@ -38,6 +40,7 @@ return {
   },
   {
     'https://github.com/machakann/vim-sandwich',
+    enabled = false,
   },
   {
     'https://github.com/lambdalisue/gin.vim',
@@ -71,6 +74,7 @@ return {
   },
   {
     'https://github.com/haya14busa/vim-asterisk',
+    keys = { '*', '#', 'g*', 'g#' },
     config = function()
       local opts = { noremap = true, silent = true }
```
<!--}}}-->

## まとめ

ここまでの変更で、Total Average: 95.994600 msec → Total Average: 20.772000 msec まで改善できた。

" vim: foldmethod=marker foldlevel=1
