---
id: 20241201115525
aliases:
  - 別タイムゾーンの日付をJSTに変更する方法
tags:
  - Linux
  - ワンライナー
created: 2024-12-01 11:55
title: 別タイムゾーンの日付をJSTに変更する方法
updated: 2024-12-01 11:55
---

# 別タイムゾーンの日付をJSTに変更する方法

## pythonで丁寧に

```python
import datetime

pdt_time = datetime.datetime(2023, 4, 6, 9, 41, tzinfo=datetime.timezone(datetime.timedelta(hours=-7)))
jst_time = pdt_time.astimezone(datetime.timezone(datetime.timedelta(hours=+9)))

print("PDT: ", pdt_time)
print("JST: ", jst_time)
```

## 一行で (ワンライナー)

### dateコマンド

```bash
TZ=Asia/Tokyo date --date '2023-04-07 09:41:00 PDT' '+%Y-%m-%d %H:%M:%S %Z'
2023-04-08 01:41:00 JST
```

### python

```bash
python -c 'import datetime; jst_time = datetime.datetime(2023, 4, 7, 10, 30, tzinfo=datetime.timezone(datetime.timedelta(hours=-7))).astimezone(datetime.timezone(datetime.timedelta(hours=+9))); print(jst_time)'
```

