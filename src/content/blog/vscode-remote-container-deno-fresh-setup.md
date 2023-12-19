---
title: "Visual Studio Codeのリモートコンテナ機能を使ったDenoのFreshフレームワーク開発環境構築"
description: "Visual Studio Codeのリモートコンテナ機能を使ったDenoのFreshフレームワーク開発環境構築"
pubDate: "2022/09/20"
heroImage: "/placeholder-hero.webp"
---

## 概要

Visual Studio Codeのリモートコンテナ機能を使ってDenoのFreshフレームワークを開発する環境を用意する方法です。  
Visual Studio CodeもDenoも何もわからない状態で、準備してたら詰まったので備忘録として残しておきます。

## 事前手順

- Visual Studio Codeをインストール
- [Remote - Containersプラグイン](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)をインストール

## 手順

1. 開発環境にするフォルダを用意
    - フォルダ名は何でもいいと思いますが、今回は `fresh-dev` としました。

- Visual Studio Codeで `Cmd + Shift + p` を入力してコマンドパレットを開く
- `Remote-Containers: Open Folders in Container...` を選択して、先ほど作成したフォルダを選択
- `Show All Definitions...` を選択
- `deno` と入力すると、`Deno` が選択肢に出てくるので、選択
- 大体デフォルトのOSで良いと思うので、 `bullseye (default)` を選択
- しばらく待つと、開発用Dockerコンテナが作成される
- Visual Studio Code内でターミナルを開く(Ctrl + Shift + `)
- ターミナルで下記コマンドを実行する

    ```bash
    deno run -A -r https://fresh.deno.dev ./ --force --twind --vscode
    ```

- `.vscode/settings.json` に `"deno.importMap": "./import_map.json",` を追記
- 一部のimportがエラーになるので、 `Cmd + Shift + p` を入力してコマンドパレットを開き、 `Deno: Cache Dependencies` を実行する
- Visual Studio Codeのターミナルで下記コマンドを実行する

    ```bash
    deno task start
    ```

- http://localhost:8000/ でプレビューが表示できる

## 補足

### Freshのinitコマンドのオプションの意味

#### --force

既存のファイルがあっても、上書きします。  
上書きするのは、テンプレートと同名のファイルがあったときのみなので、 `.devcontainer` フォルダ等が消されたりはしないです。

#### --twind

Twind CSSによるスタイリングを利用したテンプレートを生成します。

#### --vscode

Visual Studio Code向けの設定ファイル ( `.vscode/settings.json` など)を生成します。

## 参考資料

- https://fresh.deno.dev/
- https://github.com/denoland/fresh
