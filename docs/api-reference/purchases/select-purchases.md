---
title: Purchase/Sales Transactions
sidebar_label: Purchase/Sales Transactions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Purchase/Sales Transactions

The **Purchase-Sales Transaction API** retrieves purchase and sales transactions from the system. It provides supplier, invoice, tax, and itemized details for each transaction.

**Endpoint**
```

POST /selectTrnsPurchaseSalesList

````

---

## Purpose

This API:

* Retrieves **purchase and sales transactions** for a branch
* Returns **supplier and item details** for each transaction
* Supports **reporting and reconciliation** of transaction data

> ℹ️ Use the `lastReqDt` parameter to fetch only recently modified transactions.

---

## Request Object: `TrnsPurchaseSalesReq`

| Field       | Description                  | Type   | Required | Length | Notes |
|------------|-------------------------------|-------|---------|--------|-------|
| `lastReqDt` | Last Request Date            | CHAR  | ✅ Yes  | 14     | YYYYMMDDhhmmss, fetch recent transactions |

---

### JSON Request Example

```json
{
  "lastReqDt": "20190524000000"
}
````

---

## Response Object: `TrnsPurchaseSalesRes`

| Field       | Description                   | Type     | Notes                     |
| ----------- | ----------------------------- | -------- | ------------------------- |
| `resultCd`  | Result code (`000` = success) | CHAR(3)  |                           |
| `resultMsg` | Result message                | CHAR     |                           |
| `resultDt`  | Response timestamp            | CHAR(14) | YYYYMMDDhhmmss            |
| `data`      | Response data                 | Object   | Contains `saleList` array |

---

### Transaction List (`saleList`)

| Field                   | Description             | Type   | Notes                |
| ----------------------- | ----------------------- | ------ | -------------------- |
| `spplrTin`              | Supplier PIN            | CHAR   | —                    |
| `spplrNm`               | Supplier Name           | CHAR   | —                    |
| `spplrBhfId`            | Supplier Branch ID      | CHAR   | —                    |
| `spplrInvcNo`           | Supplier Invoice Number | NUMBER | —                    |
| `rcptTyCd`              | Receipt Type Code       | CHAR   | —                    |
| `pmtTyCd`               | Payment Type Code       | CHAR   | —                    |
| `cfmDt`                 | Validated Date          | CHAR   | YYYY-MM-DDHH24:MI:SS |
| `salesDt`               | Sale Date               | CHAR   | YYYYMMDD             |
| `stockRlsDt`            | Stock Released Date     | CHAR   | YYYY-MM-DDHH24:MI:SS |
| `totItemCnt`            | Total Item Count        | NUMBER | —                    |
| `taxblAmtA`–`taxblAmtE` | Taxable Amounts A–E     | NUMBER | —                    |
| `taxRtA`–`taxRtE`       | Tax Rates A–E           | NUMBER | —                    |
| `taxAmtA`–`taxAmtE`     | Tax Amounts A–E         | NUMBER | —                    |
| `totTaxblAmt`           | Total Taxable Amount    | NUMBER | —                    |
| `totTaxAmt`             | Total Tax Amount        | NUMBER | —                    |
| `totAmt`                | Total Amount            | NUMBER | —                    |
| `remark`                | Remark                  | CHAR   | —                    |

---

### Transaction Item List (`itemList`)

| Field       | Description              | Type   | Notes |
| ----------- | ------------------------ | ------ | ----- |
| `itemSeq`   | Item Sequence Number     | NUMBER | —     |
| `itemClsCd` | Item Classification Code | CHAR   | —     |
| `itemCd`    | Item Code                | CHAR   | —     |
| `itemNm`    | Item Name                | CHAR   | —     |
| `bcd`       | Barcode                  | CHAR   | —     |
| `pkgUnitCd` | Packaging Unit Code      | CHAR   | —     |
| `pkg`       | Package Quantity         | NUMBER | —     |
| `qtyUnitCd` | Quantity Unit Code       | CHAR   | —     |
| `qty`       | Quantity                 | NUMBER | —     |
| `prc`       | Unit Price               | NUMBER | —     |
| `splyAmt`   | Supply Amount            | NUMBER | —     |
| `dcRt`      | Discount Rate            | NUMBER | —     |
| `dcAmt`     | Discount Amount          | NUMBER | —     |
| `taxTyCd`   | Taxation Type Code       | CHAR   | —     |
| `taxblAmt`  | Taxable Amount           | NUMBER | —     |
| `taxAmt`    | Tax Amount               | NUMBER | —     |
| `totAmt`    | Total Amount             | NUMBER | —     |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226195420",
  "data": {
    "saleList": [
      {
        "spplrTin": "A123456789Z",
        "spplrNm": "Taxpayer1111",
        "spplrBhfId": "00",
        "spplrInvcNo": 2,
        "rcptTyCd": "S",
        "pmtTyCd": "01",
        "cfmDt": "2020-01-27 21:03:00",
        "salesDt": "20200127",
        "stockRlsDt": "2020-01-27 21:03:00",
        "totItemCnt": 2,
        "taxblAmtB": 10500,
        "taxRtB": 18,
        "taxAmtB": 1602,
        "totTaxblAmt": 10500,
        "totTaxAmt": 1602,
        "totAmt": 10500,
        "itemList": [
          {
            "itemSeq": 1,
            "itemCd": "KE1NTXU0000001",
            "itemClsCd": "5059690800",
            "itemNm": "test item 1",
            "pkgUnitCd": "NT",
            "pkg": 2,
            "qtyUnitCd": "U",
            "qty": 2,
            "prc": 3500,
            "splyAmt": 7000,
            "taxTyCd": "B",
            "taxblAmt": 7000,
            "taxAmt": 1068,
            "totAmt": 7000
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
    'lastReqDt' => '20190524000000',
];

$response = $etims->selectPurchases($requestData);
```

  </TabItem>

  <TabItem value="js" label="JavaScript / TypeScript">

```ts
const requestData = {
  lastReqDt: '20190524000000'
};

const response = await client.selectPurchases(requestData);
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
requestData = {
    'lastReqDt': '20190524000000'
}

response = etims.select_purchases(requestData)
```

  </TabItem>
</Tabs>

---

## Best Practices

* Use `lastReqDt` to fetch only recently updated transactions.
* Validate `resultCd` before processing data.
* Handle empty `saleList` if no transactions are found.
