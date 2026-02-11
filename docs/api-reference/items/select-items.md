---
title: Select Items
sidebar_label: Select Items
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Select Items 

The **Select Items API** retrieves product master data from the **KRA eTIMS OSCU system**.  
It allows clients to fetch items that have been registered or updated within a given date range.

**Endpoint**
```

POST /selectItemList

````

---

## Purpose

This API:

- Retrieves **all items** or items updated since a specified date
- Returns **full item details**, including classification, type, units, pricing, and flags
- Supports **branch-level and head office filtering**

> ⚠️ Always validate the returned item codes, tax types, and units against **Code Lists** and **Item Classifications** APIs.

---

## Request Object: `ItemSearchReq`

### Request Fields

| Field | Description | Type | Required | Length |
|------|------------|------|----------|--------|
| `lastReqDt` | Last request date (YYYYMMDDHHmmss) | CHAR | ✅ Yes | 14 |

---

### JSON Request Example

```json
{
  "lastReqDt": "20160523000000"
}
````

---

## Response Object: `ItemSearchRes`

### Top-Level Fields

| Field       | Description                   | Type     |
| ----------- | ----------------------------- | -------- |
| `resultCd`  | Result code (`000` = success) | CHAR(3)  |
| `resultMsg` | Result message                | CHAR     |
| `resultDt`  | Response timestamp            | CHAR(14) |

---

### Item List (`itemList`)

Each entry represents a **product item**.

| Field         | Description              | Type   | Length |
| ------------- | ------------------------ | ------ | ------ |
| `tin`         | Taxpayer PIN             | CHAR   | 11     |
| `itemClsCd`   | Item Classification Code | CHAR   | 10     |
| `itemCd`      | Item Code                | CHAR   | 20     |
| `itemTyCd`    | Item Type Code           | CHAR   | 5      |
| `itemNm`      | Item Name                | CHAR   | 200    |
| `itemStdNm`   | Item Standard Name       | CHAR   | 200    |
| `orgnNatCd`   | Origin Nation Code       | CHAR   | 5      |
| `pkgUnitCd`   | Packaging Unit Code      | CHAR   | 5      |
| `qtyUnitCd`   | Quantity Unit Code       | CHAR   | 5      |
| `taxTyCd`     | Taxation Type Code       | CHAR   | 5      |
| `btchNo`      | Batch Number             | CHAR   | 10     |
| `regBhfId`    | Registered Branch ID     | CHAR   | 2      |
| `bcd`         | Barcode                  | CHAR   | 20     |
| `dftPrc`      | Default Unit Price       | NUMBER | 18,2   |
| `grpPrcL1`    | Group 1 Unit Price       | NUMBER | 18,2   |
| `grpPrcL2`    | Group 2 Unit Price       | NUMBER | 18,2   |
| `grpPrcL3`    | Group 3 Unit Price       | NUMBER | 18,2   |
| `grpPrcL4`    | Group 4 Unit Price       | NUMBER | 18,2   |
| `grpPrcL5`    | Group 5 Unit Price       | NUMBER | 18,2   |
| `addInfo`     | Additional Information   | CHAR   | 7      |
| `sftyQty`     | Safety Quantity          | NUMBER | 13,2   |
| `isrcAplcbYn` | Insurance Applicable Y/N | CHAR   | 1      |
| `rraModYn`    | KRA Modify Flag Y/N      | CHAR   | 1      |
| `useYn`       | Active Status Y/N        | CHAR   | 1      |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226193501",
  "data": {
    "itemList": [
      {
        "tin": "A123456789Z",
        "itemCd": "KR2AMXBLL0000001",
        "itemClsCd": "1110160600",
        "itemTyCd": "2",
        "itemNm": "rest item#1",
        "itemStdNm": null,
        "orgnNatCd": "KR",
        "pkgUnitCd": "AM",
        "qtyUnitCd": "BLL",
        "taxTyCd": "B",
        "btchNo": null,
        "regBhfId": "00",
        "bcd": "8801234567061",
        "dftPrc": 21000,
        "grpPrcL1": 0,
        "grpPrcL2": 0,
        "grpPrcL3": 0,
        "grpPrcL4": 0,
        "grpPrcL5": 0,
        "addInfo": null,
        "sftyQty": 0,
        "isrcAplcbYn": "N",
        "rraModYn": "N",
        "useYn": "Y"
      }
    ]
  }
}
```

---

## SDK Usage Examples

<Tabs>
  <TabItem value="python" label="Python" default>

```python
items = etims.select_items({'lastReqDt': last_req_dt(-30)})
item_list = items.get('data', {}).get('itemList', [])
print(f"Items found: {len(item_list)}")

for item in item_list:
    print(f"- Item Code: {item['itemCd']}")
    print(f"  Name: {item['itemNm']}")
    print(f"  Classification: {item['itemClsCd']}")
    print(f"  Type: {item['itemTyCd']}")
    print(f"  Origin: {item['orgnNatCd']}")
    print(f"  Default Price: {item['dftPrc']}\n")
```

  </TabItem>

  <TabItem value="js" label="JavaScript / Typescript">

```ts
const response = await etimsVClient.selectItems({
  lastReqDt: formatDateForEtims(-30)
});

const items = response.data?.itemList || [];
console.log(`Found ${items.length} items`);

items.slice(0, 3).forEach(item =>
  console.log(`- ${item.itemCd}: ${item.itemNm} (${item.taxTyCd})`)
);
```

  </TabItem>

  <TabItem value="php" label="PHP">

```php
$requestData = [
    'lastReqDt' => last_req_dt('-30 days'),
];

$items = $etims->selectItems($requestData);
$itemList = $items['data']['itemList'] ?? [];

echo "Items found: " . count($itemList) . "\n";

foreach ($itemList as $item) {
    echo "- Item Code: {$item['itemCd']}\n";
    echo "  Name: {$item['itemNm']}\n";
    echo "  Classification: {$item['itemClsCd']}\n";
    echo "  Type: {$item['itemTyCd']}\n";
    echo "  Origin: {$item['orgnNatCd']}\n";
    echo "  Default Price: {$item['dftPrc']}\n\n";
}
```

  </TabItem>
</Tabs>

---

## Best Practices

* Fetch items updated periodically (e.g., last 30 days)
* Cross-check **item classification**, **unit codes**, and **tax types** with **Code Lists**
* Cache item master data locally for faster access
* Use `useYn = 'N'` instead of deleting items

---

## Related APIs

* 👉 **[Save Item](./save-item)**
* 👉 **[Item Classifications](./select-item-classes)**
* 👉 **[Code Lists](../select-code-list)**
