---
title: Code Lists
sidebar_label: Code Lists
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Code Lists (Common Codes)

The **Code Lists** endpoint allows you to retrieve **KRA-managed master codes** such as:

* Taxation types
* Unit codes
* Country codes
* Payment method codes
* Other standardized reference data

These codes are **mandatory dependencies** for many OSCU requests (items, sales, stock, purchases).

**Endpoint**
```

POST /selectCodeList

````

---

## Purpose

This API:

* Retrieves **code classifications** and **detail codes**
* Returns only codes **created or modified after `lastReqDt`**
* Ensures client-side validation aligns with KRA master data

> ℹ️ Code lists should be **cached locally** and refreshed periodically.

---

## Request Object: `CodeSearchReq`

### Request Fields

| Field | Description | Type | Required | Length |
|----|------------|------|----------|--------|
| `lastReqDt` | Last Request Date (YYYYMMDDHHmmss) | CHAR | ✅ Yes | 14 |

> 🔎 `lastReqDt` filters results to codes **registered or updated after the specified date**.

---

### JSON Request Example

```json
{
  "lastReqDt": "20180520000000"
}
````

---

## Response Object: `CodeSearchRes`

### Top-Level Fields

| Field       | Description                   | Type     |
| ----------- | ----------------------------- | -------- |
| `resultCd`  | Result code (`000` = success) | CHAR(3)  |
| `resultMsg` | Result message                | CHAR     |
| `resultDt`  | Response timestamp            | CHAR(14) |

---

### Code Classification (`clsList`)

Each entry represents a **code class**.

| Field        | Description            | Type      |
| ------------ | ---------------------- | --------- |
| `cdCls`      | Code Class             | CHAR(2)   |
| `cdClsNm`    | Code Class Name        | CHAR(60)  |
| `cdClsDesc`  | Code Class Description | CHAR(500) |
| `userDfnNm1` | User Defined Name 1    | CHAR(60)  |
| `userDfnNm2` | User Defined Name 2    | CHAR(60)  |
| `userDfnNm3` | User Defined Name 3    | CHAR(60)  |
| `useYn`      | Use 여부 (`Y/N`)         | CHAR(1)   |

---

### Code Details (`dtlList`)

Each code class contains a list of **detail codes**.

| Field        | Description         | Type      |
| ------------ | ------------------- | --------- |
| `cd`         | Code                | CHAR(5)   |
| `cdNm`       | Code Name           | CHAR(60)  |
| `cdDesc`     | Code Description    | CHAR(500) |
| `srtOrd`     | Sort Order          | NUMBER    |
| `userDfnCd1` | User Defined Code 1 | CHAR(20)  |
| `userDfnCd2` | User Defined Code 2 | CHAR(20)  |
| `userDfnCd3` | User Defined Code 3 | CHAR(20)  |
| `useYn`      | Use 여부 (`Y/N`)      | CHAR(1)   |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226143506",
  "data": {
    "clsList": [
      {
        "cdCls": "04",
        "cdClsNm": "Taxation Type",
        "cdClsDesc": null,
        "useYn": "Y",
        "userDfnNm1": "TaxRate",
        "userDfnNm2": null,
        "userDfnNm3": null,
        "dtlList": [
          {
            "cd": "A",
            "cdNm": "A- EX",
            "cdDesc": "...",
            "useYn": "Y",
            "srtOrd": 1,
            "userDfnCd1": "0"
          },
          {
            "cd": "B",
            "cdNm": "B-18.00%",
            "cdDesc": "B- 18.00%",
            "useYn": "Y",
            "srtOrd": 2,
            "userDfnCd1": "18"
          }
        ]
      }
    ]
  }
}
```

> ✅ `resultCd = 000` means the request succeeded.
> Refer to **API Response Codes** for error handling.

---

## SDK Usage Examples

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
$codes = $etims->selectCodeList([
    'lastReqDt' => date('YmdHis', strtotime('-7 days'))
]);

$clsList = $codes['clsList'] ?? [];

echo "Code Classes found: " . count($clsList) . PHP_EOL;

foreach ($clsList as $cls) {
    echo "- {$cls['cdCls']} ({$cls['cdClsNm']})" . PHP_EOL;

    foreach ($cls['dtlList'] ?? [] as $detail) {
        echo "  • {$detail['cd']} ({$detail['cdNm']})" . PHP_EOL;
    }
}
```

</TabItem>

<TabItem value="js" label="JavaScript / Typescript">

```ts
const response = await etimsClient.selectCodeList({
  lastReqDt: formatDateForEtims(-7),
});

const clsList = response.clsList || [];

console.log(`Found ${clsList.length} code classes`);

clsList.forEach(cls => {
  console.log(`- ${cls.cdCls}: ${cls.cdClsNm}`);
  (cls.dtlList || []).forEach(detail =>
    console.log(`  • ${detail.cd}: ${detail.cdNm}`)
  );
});
```

</TabItem>

<TabItem value="python" label="Python">

```python
codes = etims.select_code_list({
    'lastReqDt': last_req_dt()
})

cls_list = codes.get('clsList', [])
print(f"Code Classes found: {len(cls_list)}")

for cls in cls_list:
    print(f"- {cls['cdCls']} ({cls['cdClsNm']})")
    for detail in cls.get('dtlList', []):
        print(f"  • {detail['cd']} ({detail['cdNm']})")
```

</TabItem>
</Tabs>

---

## Best Practices

* Cache code lists locally
* Refresh periodically (e.g. once daily)
* Always validate item, tax, unit, and payment codes against this API
* Do not hardcode values unless explicitly permitted by KRA

---

## Next Steps

* 👉 Continue to **[Item Classifications](./items/select-item-classes)**
* 👉 Review **[Items](./items/select-items)**
* 👉 Proceed to **[Customers](./customers/select-customer)**

---
