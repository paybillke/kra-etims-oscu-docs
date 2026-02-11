---
title: Stock Movement
sidebar_label: Stock Movement
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Stock Movement

The **Stock Movement API** retrieves stock movement data, including stock in/out, quantities, and itemized details for each movement. It provides information for reporting, reconciliation, and auditing of stock changes.

**Endpoint**

```
POST /selectStockMoveList
```

---

## Purpose

This API:

* Fetches **stock movement records** for a branch
* Returns **itemized stock details** including quantity, supply amount, and taxation
* Supports **tracking stock in/out**, warehouse changes, and reconciliation

> ℹ️ Use the `lastReqDt` parameter to fetch only recently modified stock movements.

---

## Request Object: `StockMoveReq`

| Field       | Description       | Type | Required | Length | Notes                                        |
| ----------- | ----------------- | ---- | -------- | ------ | -------------------------------------------- |
| `lastReqDt` | Last Request Date | CHAR | ✅ Yes    | 14     | YYYYMMDDhhmmss, fetch recent stock movements |

---

### JSON Request Example

```json
{
  "lastReqDt": "20260101000000"
}
```

---

## Response Object: `StockMoveRes`

| Field       | Description                   | Type     | Notes                      |
| ----------- | ----------------------------- | -------- | -------------------------- |
| `resultCd`  | Result code (`000` = success) | CHAR(3)  |                            |
| `resultMsg` | Result message                | CHAR     |                            |
| `resultDt`  | Response timestamp            | CHAR(14) | YYYYMMDDhhmmss             |
| `data`      | Response data                 | Object   | Contains `stockList` array |

---

### Stock List (`stockList`)

| Field         | Description            | Type      | Notes    |
| ------------- | ---------------------- | --------- | -------- |
| `custTin`     | Customer PIN           | CHAR(11)  | —        |
| `custBhfId`   | Customer Branch ID     | CHAR(2)   | —        |
| `sarNo`       | Stored/Released Number | NUMBER    | —        |
| `ocrnDt`      | Occurred Date          | CHAR(8)   | YYYYMMDD |
| `totItemCnt`  | Total Item Count       | NUMBER    | —        |
| `totTaxblAmt` | Total Supply Price     | NUMBER    | —        |
| `totTaxAmt`   | Total VAT              | NUMBER    | —        |
| `totAmt`      | Total Amount           | NUMBER    | —        |
| `remark`      | Remark                 | CHAR(400) | —        |

---

### Stock Item List (`itemList`)

| Field        | Description          | Type   | Notes    |
| ------------ | -------------------- | ------ | -------- |
| `itemSeq`    | Item Sequence Number | NUMBER | —        |
| `itemClsCd`  | Item Class Code      | CHAR   | —        |
| `itemCd`     | Item Code            | CHAR   | —        |
| `itemNm`     | Item Name            | CHAR   | —        |
| `bcd`        | Barcode              | CHAR   | —        |
| `pkgUnitCd`  | Packaging Unit Code  | CHAR   | —        |
| `pkg`        | Package Quantity     | NUMBER | —        |
| `qtyUnitCd`  | Quantity Unit Code   | CHAR   | —        |
| `qty`        | Quantity             | NUMBER | —        |
| `itemExprDt` | Item Expiration Date | CHAR   | YYYYMMDD |
| `prc`        | Unit Price           | NUMBER | —        |
| `splyAmt`    | Supply Amount        | NUMBER | —        |
| `totDcAmt`   | Discount Amount      | NUMBER | —        |
| `taxblAmt`   | Taxable Amount       | NUMBER | —        |
| `taxTyCd`    | Taxation Type Code   | CHAR   | —        |
| `taxAmt`     | Tax Amount           | NUMBER | —        |
| `totAmt`     | Total Amount         | NUMBER | —        |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20260211080000",
  "data": {
    "stockList": [
      {
        "custTin": "A123456789Z",
        "custBhfId": "00",
        "sarNo": 6,
        "ocrnDt": "20260106",
        "totItemCnt": 1,
        "totTaxblAmt": 1800000,
        "totTaxAmt": 274576.27,
        "totAmt": 1800000,
        "remark": null,
        "itemList": [
          {
            "itemSeq": 1,
            "itemCd": "KR2BZX0000001",
            "itemClsCd": "1110162100",
            "itemNm": "Grocery_Item#1",
            "bcd": "8801234567051",
            "pkgUnitCd": "BZ",
            "pkg": 0,
            "qtyUnitCd": "CA",
            "qty": 450,
            "itemExprDt": null,
            "prc": 4000,
            "splyAmt": 1800000,
            "totDcAmt": 0,
            "taxblAmt": 1800000,
            "taxTyCd": "B",
            "taxAmt": 274576.27,
            "totAmt": 1800000
          }
        ]
      }
    ]
  }
}
```

---

## SDK Usage Examples

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
$requestData = [
    'lastReqDt' => date('YmdHis', strtotime('-30 days'))
];

$response = $etims->selectStockMovement($requestData);
```

  </TabItem>

  <TabItem value="js" label="JavaScript / TypeScript">

```ts
const requestData = {
  lastReqDt: '20260101000000'
};

const response = await etimsVClient.selectStockMovement(requestData);
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
request_data = {
    'lastReqDt': '20260101000000'
}

response = etims.select_stock_movement(request_data)
```

  </TabItem>
</Tabs>

---

## Best Practices

* Always provide `lastReqDt` to fetch only recently updated stock movements.
* Validate `resultCd` before processing data.
* Handle empty `stockList` if no stock movements are found.
* Use `itemList` to track item-level stock changes for reporting and auditing.

