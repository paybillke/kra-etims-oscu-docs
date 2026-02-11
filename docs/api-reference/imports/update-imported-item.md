---
title: Update Imported Item
sidebar_label: Update Imported Item
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update Imported Item

The **Update Imported Item API** updates details of an imported item, such as status, classification, or remarks. This is commonly used to **modify import item records** after initial entry.

**Endpoint**
```

POST /updateImportItem

````

---

## Purpose

This API:

* Updates an **imported item record** based on task code, declaration date, and item sequence
* Allows updating **item status, classification, and optional remarks**
* Requires **valid task and declaration references** for the item to be updated

> ℹ️ Ensure `taskCd`, `dclDe`, and `itemSeq` are valid and exist in your environment.

---

## Request Object: `ImportItemUpdateReq`

### Request Fields

| Field            | Description                     | Type     | Required | Length | Format / Notes |
|-----------------|---------------------------------|---------|---------|--------|----------------|
| `taskCd`        | Task Code                       | CHAR    | ✅ Yes  | 50     |                |
| `dclDe`         | Declaration Date                | CHAR    | ✅ Yes  | 8      | YYYYMMDD       |
| `itemSeq`       | Item Sequence                   | NUMBER  | ✅ Yes  | 10     |                |
| `hsCd`          | HS Code                         | CHAR    | ✅ Yes  | 17     |                |
| `itemClsCd`     | Item Classification Code        | CHAR    | ✅ Yes  | 10     |                |
| `itemCd`        | Item Code                        | CHAR    | ✅ Yes  | 20     |                |
| `imptItemsttsCd`| Import Item Status Code          | CHAR    | ✅ Yes  | 5      | See system codes |
| `remark`        | Optional remark                  | CHAR    | ❌ No   | 400    |                |
| `modrId`        | Modifier ID                      | CHAR    | ✅ Yes  | 20     |                |
| `modrNm`        | Modifier Name                    | CHAR    | ✅ Yes  | 60     |                |

---

### JSON Request Example

```json
{
  "taskCd": "2231943",
  "dclDe": "20191217",
  "itemSeq": 1,
  "hsCd": "1231531231",
  "itemClsCd": "5022110801",
  "itemCd": "KE1NTXU0000001",
  "imptItemsttsCd": "1",
  "remark": "Updated remark",
  "modrId": "Test",
  "modrNm": "Test"
}
````

---

## Response Object: `ImportItemUpdateRes`

### Top-Level Fields

| Field       | Description                   | Type     | Length |
| ----------- | ----------------------------- | -------- | ------ |
| `resultCd`  | Result code (`000` = success) | CHAR(3)  | 3      |
| `resultMsg` | Result message                | CHAR     |        |
| `resultDt`  | Response timestamp            | CHAR(14) | 14     |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226194253",
  "data": null
}
```

> ✅ `resultCd = 000` indicates the update was successful.

---

## SDK Usage Examples

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
$requestData = [
    'taskCd'         => '2231943',
    'dclDe'          => '20191217',
    'itemSeq'        => 1,
    'hsCd'           => '1231531231',
    'itemClsCd'      => '5022110801',
    'itemCd'         => 'KE1NTXU0000001',
    'imptItemsttsCd' => '1',
    'remark'         => 'Updated remark',
    'modrId'         => 'Test',
    'modrNm'         => 'Test',
];

$response = $etims->updateImportedItem($requestData);

if (($response['resultCd'] ?? '') === '000') {
    echo "✅ Import item updated successfully\n";
} else {
    abort("Failed to update import item: " . ($response['resultMsg'] ?? 'Unknown error'));
}
```

  </TabItem>

  <TabItem value="js" label="JavaScript / TypeScript">

```ts
const response = await client.updateImportedItem({
  taskCd: '2231943',
  dclDe: '20191217',
  itemSeq: 1,
  hsCd: '1231531231',
  itemClsCd: '5022110801',
  itemCd: 'KE1NTXU0000001',
  imptItemsttsCd: '1',
  remark: 'Updated via Vitest',
  modrId: 'Test',
  modrNm: 'Test',
});

console.log(`✅ Import item updated: ${response.resultMsg}`);
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
import_data = {
    'taskCd': '2231943',
    'dclDe': '20191217',
    'itemSeq': 1,
    'hsCd': '1231531231',
    'itemClsCd': '5022110801',
    'itemCd': 'KE1NTXU0000001',
    'imptItemsttsCd': '1',
    'remark': 'Updated remark',
    'modrId': 'Test',
    'modrNm': 'Test',
}

response = etims.update_imported_item(import_data)

if response.get('resultCd') == '000':
    print("✅ Import item updated successfully")
else:
    abort(f"Failed to update import item: {response.get('resultMsg', 'Unknown error')}")
```

  </TabItem>
</Tabs>

---

## Best Practices

* Always use **valid `taskCd`, `dclDe`, and `itemSeq`** from your system environment
* Validate **branch and taxpayer PIN** before updating
* Handle non-`000` result codes gracefully
* Include meaningful remarks for audit trail
* Updates are **permanent**, ensure data correctness before submission

---

## Next Steps

* 👉 **[Import Item Search](../imports/select-imported-items)**
* 👉 **[Customers & Branches](../customers/select-customer)**
* 👉 **[Items](../items/select-items)**
