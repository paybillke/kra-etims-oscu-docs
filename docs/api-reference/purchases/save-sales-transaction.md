---
title: Save Sales Transaction
sidebar_label: Save Sales Transaction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Save Sales Transaction

The **Sales Transaction Save API** registers a sales transaction in the system. It captures invoice details, customer information, payment, tax amounts, and itemized sale records.

**Endpoint**
```

POST /saveTrnsSalesOsdc

````

---

## Purpose

This API:

* Saves a **sales transaction** with header, receipt, and itemized details
* Supports **tax calculation, discounts, and optional insurance**
* Returns a receipt reference and internal control data upon success

> ℹ️ Ensure **PIN, branch, and invoice numbers** are valid before calling this API.

---

## Request Object: `TrnsSalesSaveWrReq`

### Request Fields (Header)

| Field       | Description                  | Type   | Required | Length | Notes |
|------------|-------------------------------|-------|---------|--------|-------|
| `trdInvcNo`| Trader Invoice Number        | CHAR  | ✅ Yes  | 50     |       |
| `invcNo`   | Invoice Number               | NUMBER| ✅ Yes  | 38     |       |
| `orgInvcNo`| Original Invoice Number      | NUMBER| ✅ Yes  | 38     |       |
| `custTin`  | Customer PIN                 | CHAR  | ❌ No   | 11     | Optional |
| `custNm`   | Customer Name                | CHAR  | ❌ No   | 60     |       |
| `rcptTyCd` | Receipt Type Code            | CHAR  | ✅ Yes  | 5      | See Sale Receipt Type |
| `pmtTyCd`  | Payment Type Code            | CHAR  | ❌ No   | 5      | See Payment Method |
| `salesSttsCd`| Invoice Status Code         | CHAR  | ✅ Yes  | 5      | See Transaction Progress |
| `cfmDt`    | Validated Date               | CHAR  | ✅ Yes  | 14     | YYYYMMDDhhmmss |
| `salesDt`  | Sale Date                    | CHAR  | ✅ Yes  | 8      | YYYYMMDD |
| `stockRlsDt`| Stock Released Date          | CHAR  | ❌ No   | 14     | YYYYMMDDhhmmss |
| `cnclReqDt`| Cancel Requested Date        | CHAR  | ❌ No   | 14     | YYYYMMDDhhmmss |
| `cnclDt`   | Canceled Date                | CHAR  | ❌ No   | 14     | YYYYMMDDhhmmss |
| `rfdDt`    | Credit Note Date             | CHAR  | ❌ No   | 14     | YYYYMMDDhhmmss |
| `rfdRsnCd` | Credit Note Reason Code      | CHAR  | ❌ No   | 5      | See Credit Note Reason |
| `totItemCnt`| Total Item Count            | NUMBER| ✅ Yes  | 10     |       |
| `taxblAmtA`..`taxblAmtE` | Taxable Amounts A–E | NUMBER | ✅ Yes | 18,2 |       |
| `taxRtA`..`taxRtE`       | Tax Rates A–E     | NUMBER | ✅ Yes | 7,2  |       |
| `taxAmtA`..`taxAmtE`     | Tax Amounts A–E   | NUMBER | ✅ Yes | 18,2 |       |
| `totTaxblAmt` | Total Taxable Amount      | NUMBER | ✅ Yes | 18,2 |       |
| `totTaxAmt`   | Total Tax Amount           | NUMBER | ✅ Yes | 18,2 |       |
| `totAmt`      | Total Amount               | NUMBER | ✅ Yes | 18,2 |       |
| `prchrAcptcYn`| Purchase Accept Y/N        | CHAR   | ✅ Yes | 1    |       |
| `remark`      | Optional remark            | CHAR   | ❌ No  | 400   |       |
| `regrId`      | Registration ID            | CHAR   | ✅ Yes | 20    |       |
| `regrNm`      | Registration Name          | CHAR   | ✅ Yes | 60    |       |
| `modrId`      | Modifier ID                | CHAR   | ✅ Yes | 20    |       |
| `modrNm`      | Modifier Name              | CHAR   | ✅ Yes | 60    |       |

---

### Request Fields (Receipt & Items)

**Receipt (`receipt`)**

| Field       | Description                  | Type   | Required | Notes |
|------------|-------------------------------|-------|---------|-------|
| `custTin`  | Customer PIN                 | CHAR  | ❌ No   |       |
| `custMblNo`| Customer Mobile Number       | CHAR  | ❌ No   |       |
| `rcptPbctDt`| Receipt Published Date      | CHAR  | ✅ Yes  | YYYYMMDDhhmmss |
| `trdeNm`   | Trader Name                  | CHAR  | ❌ No   |       |
| `adrs`     | Address                      | CHAR  | ❌ No   |       |
| `topMsg`   | Top Message                  | CHAR  | ❌ No   |       |
| `btmMsg`   | Bottom Message               | CHAR  | ❌ No   |       |
| `prchrAcptcYn`| Purchase Accept Y/N       | CHAR  | ✅ Yes  | 1     |

**Item List (`itemList`)**

| Field        | Description                  | Type   | Required | Notes |
|-------------|-------------------------------|-------|---------|-------|
| `itemSeq`   | Item Sequence Number          | NUMBER| ✅ Yes  |       |
| `itemClsCd` | Item Code                     | CHAR  | ❌ No   |       |
| `itemCd`    | Item Classification Code      | CHAR  | ✅ Yes  |       |
| `itemNm`    | Item Name                     | CHAR  | ✅ Yes  |       |
| `bcd`       | Barcode                       | CHAR  | ❌ No   |       |
| `pkgUnitCd` | Packaging Unit Code            | CHAR  | ✅ Yes  | See Packaging Unit |
| `pkg`       | Package Quantity               | NUMBER| ✅ Yes  | 13,2 |
| `qtyUnitCd` | Quantity Unit Code             | CHAR  | ✅ Yes  | See Unit of Quantity |
| `qty`       | Quantity                       | NUMBER| ✅ Yes  | 13,2 |
| `prc`       | Unit Price                     | NUMBER| ✅ Yes  | 18,2 |
| `splyAmt`   | Supply Amount                  | NUMBER| ✅ Yes  | 18,2 |
| `dcRt`      | Discount Rate                  | NUMBER| ✅ Yes  | 5,2  |
| `dcAmt`     | Discount Amount                | NUMBER| ✅ Yes  | 18,2 |
| `isrccCd`   | Insurance Company Code         | CHAR  | ❌ No   |       |
| `isrccNm`   | Insurance Company Name         | CHAR  | ❌ No   |       |
| `isrcRt`    | Insurance Rate                 | NUMBER| ❌ No   | 3     |
| `isrcAmt`   | Insurance Amount               | NUMBER| ❌ No   | 18,2 |
| `taxTyCd`   | Taxation Type Code             | CHAR  | ✅ Yes  | See TaxType |
| `taxblAmt`  | Taxable Amount                 | NUMBER| ✅ Yes  | 18,2 |
| `totTaxAmt` | Tax Amount                     | NUMBER| ✅ Yes  | 18,2 |
| `totAmt`    | Total Amount                   | NUMBER| ✅ Yes  | 18,2 |

---

### JSON Request Example

```json
{
  "trdInvcNo": 123,
  "invcNo": 1,
  "orgInvcNo": 0,
  "custTin": "A123456789Z",
  "custNm": "Taxpayer1112",
  "salesTyCd": "N",
  "rcptTyCd": "S",
  "pmtTyCd": "01",
  "salesSttsCd": "02",
  "cfmDt": "20200127210300",
  "salesDt": "20200127",
  "totItemCnt": 2,
  "taxblAmtA": 0,
  "taxblAmtB": 10500,
  "taxAmtB": 1602,
  "totTaxblAmt": 10500,
  "totTaxAmt": 1602,
  "totAmt": 10500,
  "prchrAcptcYn": "N",
  "regrId": "Test",
  "regrNm": "Test",
  "modrId": "Test",
  "modrNm": "Test",
  "receipt": {
    "custTin": "A123456789Z",
    "rcptPbctDt": "20201118120300",
    "prchrAcptcYn": "N"
  },
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
````

---

## Response Object: `TrnsSalesSaveWrRes`

| Field       | Description                   | Type     | Notes          |
| ----------- | ----------------------------- | -------- | -------------- |
| `resultCd`  | Result code (`000` = success) | CHAR(3)  |                |
| `resultMsg` | Result message                | CHAR     |                |
| `resultDt`  | Response timestamp            | CHAR(14) | YYYYMMDDhhmmss |
| `data`      | Response data                 | Object   | See below      |

**Response Data**

| Field         | Description            | Type   |
| ------------- | ---------------------- | ------ |
| `curRcptNo`   | Current Receipt Number | NUMBER |
| `totRcptNo`   | Total Receipt Number   | NUMBER |
| `intrlData`   | Internal Data          | CHAR   |
| `rcptSign`    | Receipt Signature      | CHAR   |
| `sdcDateTime` | Control Unit Date Time | CHAR   |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226194328",
  "data": {
    "curRcptNo": "1",
    "totRcptNo": "1",
    "intrlData": "EAHSAV6ECUUXSY6PCCJYAUP6MI",
    "rcptSign": "QUII27MATATSHFRB",
    "sdcDateTime": "20210502115145"
  }
}
```

---

## SDK Usage Examples

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
$requestData = [
    'trdInvcNo'      => 123,
    'invcNo'         => 1,
    'orgInvcNo'      => 0,
    'custTin'        => 'A123456789Z',
    'custNm'         => 'Taxpayer1112',
    'salesTyCd'      => 'N',
    'rcptTyCd'       => 'S',
    'pmtTyCd'        => '01',
    'salesSttsCd'    => '02',
    'cfmDt'          => '20200127210300',
    'salesDt'        => '20200127',
    'totItemCnt'     => 2,
    'taxblAmtA'      => 0,
    'taxblAmtB'      => 10500,
    'taxAmtB'        => 1602,
    'totTaxblAmt'    => 10500,
    'totTaxAmt'      => 1602,
    'totAmt'         => 10500,
    'prchrAcptcYn'   => 'N',
    'regrId'         => 'Test',
    'regrNm'         => 'Test',
    'modrId'         => 'Test',
    'modrNm'         => 'Test',
    'receipt' => [
        'custTin'      => 'A123456789Z',
        'rcptPbctDt'   => '20201118120300',
        'prchrAcptcYn' => 'N'
    ],
    'itemList' => [
        [
            'itemSeq'    => 1,
            'itemCd'     => 'KE1NTXU0000001',
            'itemClsCd'  => '5059690800',
            'itemNm'     => 'test item 1',
            'pkgUnitCd'  => 'NT',
            'pkg'        => 2,
            'qtyUnitCd'  => 'U',
            'qty'        => 2,
            'prc'        => 3500,
            'splyAmt'    => 7000,
            'taxTyCd'    => 'B',
            'taxblAmt'   => 7000,
            'taxAmt'     => 1068,
            'totAmt'     => 7000
        ]
    ]
];

$response = $etims->saveSalesTransaction($requestData);
```

  </TabItem>

  <TabItem value="js" label="JavaScript / TypeScript">

```ts
const requestData = {
  trdInvcNo: 123,
  invcNo: 1,
  orgInvcNo: 0,
  custTin: 'A123456789Z',
  custNm: 'Taxpayer1112',
  salesTyCd: 'N',
  rcptTyCd: 'S',
  pmtTyCd: '01',
  salesSttsCd: '02',
  cfmDt: '20200127210300',
  salesDt: '20200127',
  totItemCnt: 2,
  taxblAmtA: 0,
  taxblAmtB: 10500,
  taxAmtB: 1602,
  totTaxblAmt: 10500,
  totTaxAmt: 1602,
  totAmt: 10500,
  prchrAcptcYn: 'N',
  regrId: 'Test',
  regrNm: 'Test',
  modrId: 'Test',
  modrNm: 'Test',
  receipt: {
    custTin: 'A123456789Z',
    rcptPbctDt: '20201118120300',
    prchrAcptcYn: 'N'
  },
  itemList: [
    {
      itemSeq: 1,
      itemCd: 'KE1NTXU0000001',
      itemClsCd: '5059690800',
      itemNm: 'test item 1',
      pkgUnitCd: 'NT',
      pkg: 2,
      qtyUnitCd: 'U',
      qty: 2,
      prc: 3500,
      splyAmt: 7000,
      taxTyCd: 'B',
      taxblAmt: 7000,
      taxAmt: 1068,
      totAmt: 7000
    }
  ]
};

const response = await client.saveSalesTransaction(requestData);
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
requestData = {
    'trdInvcNo': 123,
    'invcNo': 1,
    'orgInvcNo': 0,
    'custTin': 'A123456789Z',
    'custNm': 'Taxpayer1112',
    'salesTyCd': 'N',
    'rcptTyCd': 'S',
    'pmtTyCd': '01',
    'salesSttsCd': '02',
    'cfmDt': '20200127210300',
    'salesDt': '20200127',
    'totItemCnt': 2,
    'taxblAmtA': 0,
    'taxblAmtB': 10500,
    'taxAmtB': 1602,
    'totTaxblAmt': 10500,
    'totTaxAmt': 1602,
    'totAmt': 10500,
    'prchrAcptcYn': 'N',
    'regrId': 'Test',
    'regrNm': 'Test',
    'modrId': 'Test',
    'modrNm': 'Test',
    'receipt': {
        'custTin': 'A123456789Z',
        'rcptPbctDt': '20201118120300',
        'prchrAcptcYn': 'N'
    },
    'itemList': [
        {
            'itemSeq': 1,
            'itemCd': 'KE1NTXU0000001',
            'itemClsCd': '5059690800',
            'itemNm': 'test item 1',
            'pkgUnitCd': 'NT',
            'pkg': 2,
            'qtyUnitCd': 'U',
            'qty': 2,
            'prc': 3500,
            'splyAmt': 7000,
            'taxTyCd': 'B',
            'taxblAmt': 7000,
            'taxAmt': 1068,
            'totAmt': 7000
        }
    ]
}

response = etims.save_sales_transaction(requestData)
```

  </TabItem>
</Tabs>

---

## Best Practices

* Ensure **customer PIN, branch, and invoice numbers** are valid
* Validate **tax and discount calculations** before saving
* Handle non-`000` result codes gracefully
* Confirm receipt and control unit references are stored for audit

---

## Next Steps

* 👉 **[Customer Search](../customers/select-customer)**
* 👉 **[Item Search](../items/select-items)**
* 👉 **[Purchases & Stock](../purchases/select-purchases)**
