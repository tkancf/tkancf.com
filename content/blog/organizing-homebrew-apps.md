---
aliases:
  - homebrew管理のアプリを整理した
tags:
  - Mac
  - CLI
  - 作業ログ
created: 2025-02-23 10:18
title: homebrew管理のアプリを整理した
updated: 2025-02-23 10:18
---

# homebrew管理のアプリを整理した

Macの容量が心もとないのと、最近はツールをなるべくmise管理にしたいので

## 初期状態

`brew info`コマンドで使用料が確認できる

```sh
❰tkan❙~❱✔≻ brew info
181 kegs, 118,165 files, 5.6GB
```

## brew upgrade

`brew upgrade`実行で各アプリアップデートする  
実行時に`brew cleanup`も実行される

> upgrade [options] [installed_formula|installed_cask ...]
>     Upgrade outdated casks and outdated, unpinned formulae using the same options they were originally installed with, plus any appended brew formula options. If cask or
>     formula are specified, upgrade only the given cask or formula kegs (unless they are pinned; see pin, unpin).
>
>     Unless $HOMEBREW_NO_INSTALLED_DEPENDENTS_CHECK is set, brew upgrade or brew reinstall will be run for outdated dependents and dependents with broken linkage,
>     respectively.
>
>     Unless $HOMEBREW_NO_INSTALL_CLEANUP is set, brew cleanup will then be run for the upgraded formulae or, every 30 days, for all formulae.

```sh
❰tkan❙~❱✔≻ brew upgrade

==> Upgrading 49 outdated packages:
git-lfs 3.6.0 -> 3.6.1
.
.
.
```

↓`brew upgrade`実行後  
0.6GB減少した

```sh
❰tkan❙~❱✘≻ brew info
182 kegs, 103,829 files, 5.0GB
```

## 不要なアプリの削除

41個からかなり減らした

```sh
❰tkan❙~❱✔≻ brew leaves -r
chezmoi
curl
fish
git
itchyny/tap/mmv
mise
openjdk
openssl@1.1
rconroy293/seventeenlands/seventeenlands
tmux
trash
wget
```

4GB近く減少した

```sh
❰tkan❙~❱✔≻ brew info
57 kegs, 42,800 files, 997.9MB
```

## 不要なcaskの削除

`brew list --cask`で確認後、不要なものを削除

```sh
❰tkan❙~❱✔≻ brew info
54 kegs, 42,722 files, 993.7MB
```
