---
title: Import Item Search
sidebar_label: Import Item Search
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Import Item Search

The **Select Import Item API** retrieves **imported item details** based on a taxpayer PIN, branch ID, and last request date. It helps track **imported goods and related invoice data** in the system.

**Endpoint**
```

POST /selectImportItemList

````

---

## Purpose

This API:

* Returns a list of **imported items** for a given taxpayer and branch
* Provides details like **task code, declaration number, item name, quantity, supplier, and invoice amounts**
* Can be used to **monitor import items or for update workflows**

---

## Request Object: `ImportItemSearchReq`

### Request Fields

| Field       | Description       | Type | Required | Length | Format |
|------------|-----------------|------|----------|--------|--------|
| `lastReqDt`| Last Request Date | CHAR | ✅ Yes   | 14     | YYYYMMDDHHMMSS |

---

### JSON Request Example

```json
{
  "lastReqDt": "20190524000000"
}
````

---

## Response Object: `ImportItemSearchRes`

### Top-Level Fields

| Field       | Description                   | Type     | Length |
| ----------- | ----------------------------- | -------- | ------ |
| `resultCd`  | Result code (`000` = success) | CHAR(3)  | 3      |
| `resultMsg` | Result message                | CHAR     |        |
| `resultDt`  | Response timestamp            | CHAR(14) | 14     |

---

### Imported Item List (`itemList`)

| Field            | Description                     | Type      | Notes                    |
| ---------------- | ------------------------------- | --------- | ------------------------ |
| `taskCd`         | Task Code                       | CHAR(50)  |                          |
| `dclDe`          | Declaration Date                | CHAR(8)   | YYYYMMDD                 |
| `itemSeq`        | Item Sequence                   | NUMBER    | 10                       |
| `dclNo`          | Declaration Number              | CHAR(50)  |                          |
| `hsCd`           | HS Code                         | CHAR(17)  |                          |
| `itemNm`         | Item Name                       | CHAR(500) |                          |
| `imptItemsttsCd` | Import Item Status Code         | CHAR(5)   | See system codes         |
| `orgnNatCd`      | Origin Nation Code              | CHAR(5)   |                          |
| `exptNatCd`      | Export Nation Code              | CHAR(5)   |                          |
| `pkg`            | Package Quantity                | NUMBER    | 13,2                     |
| `pkgUnitCd`      | Package Unit Code               | CHAR(5)   | See packaging unit codes |
| `qty`            | Quantity                        | NUMBER    | 13,2                     |
| `qtyUnitCd`      | Quantity Unit Code              | CHAR(5)   | See unit codes           |
| `totWt`          | Total Weight                    | NUMBER    | 13,2                     |
| `netWt`          | Net Weight                      | NUMBER    | 13,2                     |
| `spplrNm`        | Supplier Name                   | CHAR(500) |                          |
| `agntNm`         | Agent Name                      | CHAR(500) |                          |
| `invcFcurAmt`    | Invoice Foreign Currency Amount | NUMBER    | 18,2                     |
| `invcFcurCd`     | Invoice Currency Code           | CHAR(5)   | See currency codes       |
| `invcFcurExcrt`  | Invoice Foreign Exchange Rate   | NUMBER    | 18,2                     |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226194118",
  "data": {
    "itemList": [
      {
        "taskCd": "2239078",
        "dclDe": "-1",
        "itemSeq": 1,
        "dclNo": "C3460-2019-TZDL",
        "hsCd": "20055900000",
        "itemNm": "BAKED BEANS",
        "imptItemsttsCd": "2",
        "orgnNatCd": "BR",
        "exptNatCd": "BR",
        "pkg": 2922,
        "pkgUnitCd": null,
        "qty": 19946,
        "qtyUnitCd": "KGM",
        "totWt": 19945.57,
        "netWt": 19945.57,
        "spplrNm": "ODERICH CONSERVA QUALIDADE BRASIL",
        "agntNm": "BN METRO Ltd",
        "invcFcurAmt": 296865.6,
        "invcFcurCd": "USD",
        "invcFcurExcrt": 929.79
      }
    ]
  }
}
```

> ✅ `resultCd = 000` indicates the request was successful.

---

## SDK Usage Examples

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
$requestData = [
    'lastReqDt' => '20190524000000'
];

$response = $etims->selectImportedItems($requestData);

$itemList = $response['data']['itemList'] ?? [];
echo "Import items found: " . count($itemList) . "\n";

foreach ($itemList as $item) {
    echo "- Task: {$item['taskCd']}, Declaration: {$item['dclNo']}, Item: {$item['itemNm']}, Qty: {$item['qty']}\n";
}
```

  </TabItem>

  <TabItem value="js" label="JavaScript / TypeScript">

```ts
const response = await client.selectImportedItems({
  lastReqDt: '20190524000000'
});

const itemList = response.data?.itemList || [];
console.log(`Import items found: ${itemList.length}`);

itemList.forEach(item => {
  console.log(`- Task: ${item.taskCd}, Declaration: ${item.dclNo}, Item: ${item.itemNm}, Qty: ${item.qty}`);
});
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
import_data = {
    'lastReqDt': '20190524000000'
}

response = etims.select_imported_items(import_data)
item_list = response.get('data', {}).get('itemList', [])
print(f"Import items found: {len(item_list)}")

for item in item_list:
    print(f"- Task: {item['taskCd']}, Declaration: {item['dclNo']}, Item: {item['itemNm']}, Qty: {item['qty']}")
```

  </TabItem>
</Tabs>

---

## Best Practices

* Always validate **branch and taxpayer PIN** before querying import items
* Handle non-`000` result codes gracefully
* Expect `itemList` to be empty if no items exist for the request date
* Do not cache import item data permanently (details may change)

---

## Next Steps

* 👉 **[Customers & Branches](../customers/select-customer)**
* 👉 **[Items](../items/select-items)**
* 👉 **[Purchases & Sales](../purchases/select-purchases)**
