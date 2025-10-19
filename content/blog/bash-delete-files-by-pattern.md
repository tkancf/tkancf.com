---
id: blog/l6m1c9b
aliases:
  - bashで特定の文字列を含むファイルを削除するワンライナー
tags:
  - bash
created: 2024-11-28 00:25
title: bashで特定の文字列を含むファイルを削除するワンライナー
updated: 2024-11-28 00:25
---

# bashで特定の文字列を含むファイルを削除するワンライナー

```bash
for file in *(.); do grep -q '特定の文字列' "$file" && rm "$file"; done
```
