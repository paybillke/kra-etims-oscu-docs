---
title: Save Purchase Transaction
sidebar_label: Save Purchase Transaction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Save Purchase Transaction

The **Purchase Transaction Save API** registers a purchase transaction in the system. It captures supplier information, invoice details, payment, tax amounts, and itemized purchase records.

**Endpoint**

```
POST /insertTrnsPurchase
```

---

## Purpose

This API:

* Saves a **purchase transaction** with header and itemized details
* Supports **tax calculation, discounts, and optional supplier data**
* Returns a result code and message upon success

> ℹ️ Ensure **supplier PIN, branch, and invoice numbers** are valid before calling this API.

---

## Request Object: `TrnsPurchaseSaveReq`

### Request Fields (Header)

| Field                    | Description             | Type   | Required | Length | Notes                     |
| ------------------------ | ----------------------- | ------ | -------- | ------ | ------------------------- |
| `spplrTin`               | Supplier PIN            | CHAR   | ❌ No     | 11     |                           |
| `invcNo`                 | Invoice Number          | NUMBER | ✅ Yes    | 38     |                           |
| `orgInvcNo`              | Original Invoice Number | NUMBER | ✅ Yes    | 38     |                           |
| `spplrBhfId`             | Supplier Branch ID      | CHAR   | ❌ No     | 2      |                           |
| `spplrNm`                | Supplier Name           | CHAR   | ❌ No     | 60     |                           |
| `spplrInvcNo`            | Supplier Invoice Number | NUMBER | ❌ No     | 38     |                           |
| `regTyCd`                | Registration Type       | CHAR   | ✅ Yes    | 5      | See Registration Type     |
| `pchsTyCd`               | Purchase Type Code      | CHAR   | ✅ Yes    | 5      | See Transaction Type      |
| `rcptTyCd`               | Receipt Type Code       | CHAR   | ✅ Yes    | 5      | See Purchase Receipt Type |
| `pmtTyCd`                | Payment Type Code       | CHAR   | ✅ Yes    | 5      | See Payment Method        |
| `pchsSttsCd`             | Purchase Status Code    | CHAR   | ✅ Yes    | 5      | See Transaction Progress  |
| `cfmDt`                  | Validated Date          | CHAR   | ❌ No     | 14     | YYYYMMDDhhmmss            |
| `pchsDt`                 | Purchase Date           | CHAR   | ✅ Yes    | 8      | YYYYMMDD                  |
| `wrhsDt`                 | Warehousing Date        | CHAR   | ❌ No     | 14     | YYYYMMDDhhmmss            |
| `cnclReqDt`              | Cancel Requested Date   | CHAR   | ❌ No     | 14     | YYYYMMDDhhmmss            |
| `cnclDt`                 | Canceled Date           | CHAR   | ❌ No     | 14     | YYYYMMDDhhmmss            |
| `rfdDt`                  | Credit Note Date        | CHAR   | ❌ No     | 14     | YYYYMMDDhhmmss            |
| `totItemCnt`             | Total Item Count        | NUMBER | ✅ Yes    | 10     |                           |
| `taxblAmtA`..`taxblAmtE` | Taxable Amounts A–E     | NUMBER | ✅ Yes    | 18,2   |                           |
| `taxRtA`..`taxRtE`       | Tax Rates A–E           | NUMBER | ✅ Yes    | 7,2    |                           |
| `taxAmtA`..`taxAmtE`     | Tax Amounts A–E         | NUMBER | ✅ Yes    | 18,2   |                           |
| `totTaxblAmt`            | Total Taxable Amount    | NUMBER | ✅ Yes    | 18,2   |                           |
| `totTaxAmt`              | Total Tax Amount        | NUMBER | ✅ Yes    | 18,2   |                           |
| `totAmt`                 | Total Amount            | NUMBER | ✅ Yes    | 18,2   |                           |
| `remark`                 | Optional remark         | CHAR   | ❌ No     | 400    |                           |
| `regrId`                 | Registration ID         | CHAR   | ✅ Yes    | 20     |                           |
| `regrNm`                 | Registration Name       | CHAR   | ✅ Yes    | 60     |                           |
| `modrId`                 | Modifier ID             | CHAR   | ✅ Yes    | 20     |                           |
| `modrNm`                 | Modifier Name           | CHAR   | ✅ Yes    | 60     |                           |

---

### Request Fields (Items)

**Item List (`itemList`)**

| Field            | Description              | Type   | Required | Notes |                      |
| ---------------- | ------------------------ | ------ | -------- | ----- | -------------------- |
| `itemSeq`        | Item Sequence Number     | NUMBER | ✅ Yes    |       |                      |
| `itemCd`         | Item Code                | CHAR   | ❌ No     | 20    |                      |
| `itemClsCd`      | Item Classification Code | CHAR   | ✅ Yes    | 10    |                      |
| `itemNm`         | Item Name                | CHAR   | ✅ Yes    | 200   |                      |
| `bcd`            | Barcode                  | CHAR   | ❌ No     | 20    |                      |
| `spplrItemClsCd` | Supplier Item Class Code | CHAR   | ❌ No     | 10    |                      |
| `spplrItemCd`    | Supplier Item Code       | CHAR   | ❌ No     | 20    |                      |
| `spplrItemNm`    | Supplier Item Name       | CHAR   | ❌ No     | 200   |                      |
| `pkgUnitCd`      | Packaging Unit Code      | CHAR   | ❌ No     | 5     | See Packaging Unit   |
| `pkg`            | Package Quantity         | NUMBER | ✅ Yes    | 13,2  |                      |
| `qtyUnitCd`      | Quantity Unit Code       | CHAR   | ✅ Yes    | 5     | See Unit of Quantity |
| `qty`            | Quantity                 | NUMBER | ✅ Yes    | 13,2  |                      |
| `prc`            | Unit Price               | NUMBER | ✅ Yes    | 18,2  |                      |
| `splyAmt`        | Supply Amount            | NUMBER | ✅ Yes    | 18,2  |                      |
| `dcRt`           | Discount Rate            | NUMBER | ✅ Yes    | 5,2   |                      |
| `dcAmt`          | Discount Amount          | NUMBER | ✅ Yes    | 18,2  |                      |
| `taxblAmt`       | Taxable Amount           | NUMBER | ✅ Yes    | 18,2  |                      |
| `taxTyCd`        | Taxation Type Code       | CHAR   | ✅ Yes    | 5     | See Tax Type         |
| `taxAmt`         | Tax Amount               | NUMBER | ✅ Yes    | 18,2  |                      |
| `totAmt`         | Total Amount             | NUMBER | ✅ Yes    | 18,2  |                      |
| `itemExprDt`     | Item Expired Date        | CHAR   | ❌ No     | 8     | YYYYMMDD             |

---

### JSON Request Example

```json
{
  "invcNo": 1,
  "orgInvcNo": 0,
  "spplrTin": "A123456789Z",
  "regTyCd": "M",
  "pchsTyCd": "N",
  "rcptTyCd": "P",
  "pmtTyCd": "01",
  "pchsSttsCd": "02",
  "pchsDt": "20200127",
  "totItemCnt": 2,
  "taxblAmtB": 10500,
  "taxRtB": 18,
  "taxAmtB": 1890,
  "totTaxblAmt": 10500,
  "totTaxAmt": 1890,
  "totAmt": 10500,
  "regrId": "Test",
  "regrNm": "Test",
  "modrId": "Test",
  "modrNm": "Test",
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
      "dcRt": 0,
      "dcAmt": 0,
      "taxblAmt": 7000,
      "taxTyCd": "B",
      "taxAmt": 1260,
      "totAmt": 7000
    }
  ]
}
```

---

## Response Object: `TrnsPurchaseSaveRes`

| Field       | Description                   | Type     | Notes          |
| ----------- | ----------------------------- | -------- | -------------- |
| `resultCd`  | Result code (`000` = success) | CHAR(3)  |                |
| `resultMsg` | Result message                | CHAR     |                |
| `resultDt`  | Response timestamp            | CHAR(14) | YYYYMMDDhhmmss |
| `data`      | Response data                 | Object   | Optional       |

**JSON Response Example**

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226194650",
  "data": null
}
```

---

## SDK Usage Examples

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
$requestData = [
    'invcNo' => 1,
    'orgInvcNo' => 0,
    'spplrTin' => 'A123456789Z',
    'regTyCd' => 'M',
    'pchsTyCd' => 'N',
    'rcptTyCd' => 'P',
    'pmtTyCd' => '01',
    'pchsSttsCd' => '02',
    'pchsDt' => '20200127',
    'totItemCnt' => 2,
    'taxblAmtB' => 10500,
    'taxRtB' => 18,
    'taxAmtB' => 1890,
    'totTaxblAmt' => 10500,
    'totTaxAmt' => 1890,
    'totAmt' => 10500,
    'regrId' => 'Test',
    'regrNm' => 'Test',
    'modrId' => 'Test',
    'modrNm' => 'Test',
    'itemList' => [
        [
            'itemSeq' => 1,
            'itemCd' => 'KE1NTXU0000001',
            'itemClsCd' => '5059690800',
            'itemNm' => 'test item 1',
            'pkgUnitCd' => 'NT',
            'pkg' => 2,
            'qtyUnitCd' => 'U',
            'qty' => 2,
            'prc' => 3500,
            'splyAmt' => 7000,
            'dcRt' => 0,
            'dcAmt' => 0,
            'taxblAmt' => 7000,
            'taxTyCd' => 'B',
            'taxAmt' => 1260,
            'totAmt' => 7000
        ]
    ]
];

$response = $etims->savePurchase($requestData);
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
purchase_data = {
    'tin': 'A123456789Z',
    'bhfId': '00',
    'cmcKey': 'ABC123XYZ',  # optional communication key
    'invcNo': 1,
    'orgInvcNo': 0,
    'spplrTin': 'A123456789Z',
    'spplrBhfId': None,
    'spplrNm': None,
    'spplrInvcNo': None,
    'regTyCd': 'M',
    'pchsTyCd': 'N',
    'rcptTyCd': 'P',
    'pmtTyCd': '01',
    'pchsSttsCd': '02',
    'cfmDt': '20200127210300',
    'pchsDt': '20200127',
    'wrhsDt': None,
    'cnclReqDt': None,
    'cnclDt': None,
    'rfdDt': None,
    'totItemCnt': 2,
    'taxblAmtA': 0,
    'taxblAmtB': 10500,
    'taxblAmtC': 0,
    'taxblAmtD': 0,
    'taxblAmtE': 0,
    'taxRtA': 0,
    'taxRtB': 18,
    'taxRtC': 0,
    'taxRtD': 0,
    'taxRtE': 0,
    'taxAmtA': 0,
    'taxAmtB': 1890,
    'taxAmtC': 0,
    'taxAmtD': 0,
    'taxAmtE': 0,
    'totTaxblAmt': 10500,
    'totTaxAmt': 1890,
    'totAmt': 10500,
    'remark': None,
    'regrId': 'Test',
    'regrNm': 'Test',
    'modrId': 'Test',
    'modrNm': 'Test',
    'itemList': [
        {
            'itemSeq': 1,
            'itemCd': 'KE1NTXU0000001',
            'itemClsCd': '5059690800',
            'itemNm': 'test item 1',
            'bcd': None,
            'spplrItemClsCd': None,
            'spplrItemCd': None,
            'spplrItemNm': None,
            'pkgUnitCd': 'NT',
            'pkg': 2,
            'qtyUnitCd': 'U',
            'qty': 2,
            'prc': 3500,
            'splyAmt': 7000,
            'dcRt': 0,
            'dcAmt': 0,
            'taxblAmt': 7000,
            'taxTyCd': 'B',
            'taxAmt': 1260,
            'totAmt': 7000,
            'itemExprDt': None,
        },
        {
            'itemSeq': 2,
            'itemCd': 'KE1NTXU0000002',
            'itemClsCd': '5022110801',
            'itemNm': 'test item 2',
            'bcd': None,
            'spplrItemClsCd': None,
            'spplrItemCd': None,
            'spplrItemNm': None,
            'pkgUnitCd': 'NT',
            'pkg': 1,
            'qtyUnitCd': 'U',
            'qty': 1,
            'prc': 3500,
            'splyAmt': 3500,
            'dcRt': 0,
            'dcAmt': 0,
            'taxblAmt': 3500,
            'taxTyCd': 'B',
            'taxAmt': 630,
            'totAmt': 3500,
            'itemExprDt': None,
        }
    ]
}
response = etims.save_purchase(purchase_data)
if response.get('resultCd') == '000':
    print("✅ Purchase transaction saved successfully")
else:
    print(f"❌ Failed: {response.get('resultMsg')}")
```

  </TabItem>

  <TabItem value="js" label="JavaScript / TypeScript">

```ts
const purchaseData = {
  tin: 'A123456789Z',
  bhfId: '00',
  cmcKey: 'ABC123XYZ', // optional communication key
  invcNo: 1,
  orgInvcNo: 0,
  spplrTin: 'A123456789Z',
  spplrBhfId: null,
  spplrNm: null,
  spplrInvcNo: null,
  regTyCd: 'M',
  pchsTyCd: 'N',
  rcptTyCd: 'P',
  pmtTyCd: '01',
  pchsSttsCd: '02',
  cfmDt: '20200127210300',
  pchsDt: '20200127',
  wrhsDt: null,
  cnclReqDt: null,
  cnclDt: null,
  rfdDt: null,
  totItemCnt: 2,
  taxblAmtA: 0,
  taxblAmtB: 10500,
  taxblAmtC: 0,
  taxblAmtD: 0,
  taxblAmtE: 0,
  taxRtA: 0,
  taxRtB: 18,
  taxRtC: 0,
  taxRtD: 0,
  taxRtE: 0,
  taxAmtA: 0,
  taxAmtB: 1890,
  taxAmtC: 0,
  taxAmtD: 0,
  taxAmtE: 0,
  totTaxblAmt: 10500,
  totTaxAmt: 1890,
  totAmt: 10500,
  remark: null,
  regrId: 'Test',
  regrNm: 'Test',
  modrId: 'Test',
  modrNm: 'Test',
  itemList: [
    {
      itemSeq: 1,
      itemCd: 'KE1NTXU0000001',
      itemClsCd: '5059690800',
      itemNm: 'test item 1',
      bcd: null,
      spplrItemClsCd: null,
      spplrItemCd: null,
      spplrItemNm: null,
      pkgUnitCd: 'NT',
      pkg: 2,
      qtyUnitCd: 'U',
      qty: 2,
      prc: 3500,
      splyAmt: 7000,
      dcRt: 0,
      dcAmt: 0,
      taxblAmt: 7000,
      taxTyCd: 'B',
      taxAmt: 1260,
      totAmt: 7000,
      itemExprDt: null,
    },
    {
      itemSeq: 2,
      itemCd: 'KE1NTXU0000002',
      itemClsCd: '5022110801',
      itemNm: 'test item 2',
      bcd: null,
      spplrItemClsCd: null,
      spplrItemCd: null,
      spplrItemNm: null,
      pkgUnitCd: 'NT',
      pkg: 1,
      qtyUnitCd: 'U',
      qty: 1,
      prc: 3500,
      splyAmt: 3500,
      dcRt: 0,
      dcAmt: 0,
      taxblAmt: 3500,
      taxTyCd: 'B',
      taxAmt: 630,
      totAmt: 3500,
      itemExprDt: null,
    },
  ],
};

const response = await etimsVClient.savePurchase(requestData);
console.log(response.resultMsg);
```

  </TabItem>
</Tabs>

---

## Best Practices

* Validate **supplier PIN, branch, and invoice numbers** before saving
* Ensure **tax, discount, and total amounts** are correct
* Handle non-`000` result codes gracefully
* Store invoice and audit information for reconciliation

---

## Next Steps

* 👉 **[Supplier Search](../suppliers/select-supplier)**
* 👉 **[Item Search](../items/select-items)**
* 👉 **[Purchases & Stock](../purchases/select-purchases)**
