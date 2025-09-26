---
id: blog/m3n8d2c
aliases:
  - bashで入力待ち
tags:
  - bash
created: 2024-11-30 00:53
title: bashで入力待ち
updated: 2024-11-30 00:53
---

# bashで入力待ち

`read -p`でOK

```bash
$ read -p "入力してください: " input; echo $input
入力してください: inputだよ
inputだよ
```
