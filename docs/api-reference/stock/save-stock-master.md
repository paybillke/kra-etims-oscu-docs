---
title: Save Stock Master
sidebar_label: Save Stock Master
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Save Stock Master

The **Save Stock Master API** allows you to register or update stock master data, including remaining quantity for an item.

**Endpoint**

```
POST /saveStockMaster
```

---

## Purpose

This API:

* Saves or updates **stock master information** for a branch.
* Updates the **remaining quantity** of an item.
* Tracks registration and modification information.

> ℹ️ Ensure you provide `tin`, `bhfId`, and `itemCd` to uniquely identify the stock master record.

---

## Request Object: `StockMasterSaveReq`

| Field    | Description        | Type   | Required | Notes         |
| -------- | ------------------ | ------ | -------- | ------------- |
| `itemCd` | Item Code          | CHAR   | ✅ Yes    | 20 characters |
| `rsdQty` | Remaining Quantity | NUMBER | ✅ Yes    | 13,2          |
| `regrId` | Registration ID    | CHAR   | ✅ Yes    | 20 characters |
| `regrNm` | Registration Name  | CHAR   | ✅ Yes    | 60 characters |
| `modrId` | Modifier ID        | CHAR   | ✅ Yes    | 20 characters |
| `modrNm` | Modifier Name      | CHAR   | ✅ Yes    | 60 characters |

---

### JSON Request Example

```json
{
  "itemCd": "KE1NTXU0000002",
  "rsdQty": 10,
  "regrId": "Test",
  "regrNm": "Test",
  "modrId": "Test",
  "modrNm": "Test"
}
```

---

## Response Object: `StockMasterSaveRes`

| Field       | Description                   | Type     | Notes             |
| ----------- | ----------------------------- | -------- | ----------------- |
| `resultCd`  | Result code (`000` = success) | CHAR(3)  |                   |
| `resultMsg` | Result message                | CHAR     |                   |
| `resultDt`  | Response timestamp            | CHAR(14) | YYYYMMDDhhmmss    |
| `data`      | Response data                 | Object   | null for this API |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226195637",
  "data": null
}
```

---

## SDK Usage Examples

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
$requestData = [
    'itemCd'  => 'KE1NTXU0000002',
    'rsdQty'  => 10,
    'regrId'  => 'Test',
    'regrNm'  => 'Test',
    'modrId'  => 'Test',
    'modrNm'  => 'Test'
];

$response = $etims->saveStockMaster($requestData);

if (($response['resultCd'] ?? '') === '000') {
    echo "✅ Stock Master saved successfully\n";
} else {
    abort("Failed to save Stock Master: " . ($response['resultMsg'] ?? 'Unknown error'));
}
```

  </TabItem>

  <TabItem value="js" label="JavaScript / TypeScript">

```ts
const stock_master_data = {
  itemCd: 'KE1NTXU0000002',
  rsdQty: 10,
  regrId: 'Test',
  regrNm: 'Test',
  modrId: 'Test',
  modrNm: 'Test'
};

const response = await client.saveStockMaster(stock_master_data);
console.log(`✅ Stock master updated: ${response.resultMsg}`);
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
stock_master_data = {
    'itemCd': 'KE1NTXU0000002',
    'rsdQty': 10,
    'regrId': 'Test',
    'regrNm': 'Test',
    'modrId': 'Test',
    'modrNm': 'Test'
}

response = etims.save_stock_master(stock_master_data)
if response.get('resultCd') == '000':
    print("✅ Stock Master saved successfully")
else:
    abort(f"Failed to save Stock Master: {response.get('resultMsg', 'Unknown error')}")
```

  </TabItem>
</Tabs>
