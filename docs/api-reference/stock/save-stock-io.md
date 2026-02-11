---
title: Stock In/Out
sidebar_label: Stock In/Out
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Stock In/Out

The **Stock In/Out Save API** allows you to save stock movements (in/out) in the system. It records stock items, quantities, pricing, taxation, and related customer/branch details.

**Endpoint**

```
POST /insertStockIO
```

---

## Purpose

This API:

* Records **stock in/out transactions** for a branch
* Supports **item-level stock information** including quantities, unit price, and tax amounts
* Useful for **inventory management, reconciliation, and auditing**

> ℹ️ Each request must include at least the branch ID, stored/released number, registration type, and item list.

---

## Request Object: `StockIOSaveReq`

| Field         | Description                     | Type   | Required | Length | Notes    |
| ------------- | ------------------------------- | ------ | -------- | ------ | -------- |
| `sarNo`       | Stored/Released Number          | NUMBER | ✅ Yes    | 38     | —        |
| `orgSarNo`    | Original Stored/Released Number | NUMBER | ✅ Yes    | 38     | —        |
| `regTyCd`     | Registration Type Code          | CHAR   | ✅ Yes    | 5      | —        |
| `custTin`     | Customer PIN                    | CHAR   | ❌ No     | 11     | Optional |
| `custNm`      | Customer Name                   | CHAR   | ❌ No     | 100    | Optional |
| `custBhfId`   | Customer Branch ID              | CHAR   | ❌ No     | 2      | Optional |
| `sarTyCd`     | Stock In/Out Type Code          | CHAR   | ✅ Yes    | 5      | —        |
| `ocrnDt`      | Occurred Date                   | CHAR   | ✅ Yes    | 8      | YYYYMMDD |
| `totItemCnt`  | Total Item Count                | NUMBER | ✅ Yes    | 10     | —        |
| `totTaxblAmt` | Total Supply Price              | NUMBER | ✅ Yes    | 18,2   | —        |
| `totTaxAmt`   | Total VAT                       | NUMBER | ✅ Yes    | 18,2   | —        |
| `totAmt`      | Total Amount                    | NUMBER | ✅ Yes    | 18,2   | —        |
| `remark`      | Remark                          | CHAR   | ❌ No     | 400    | Optional |
| `regrId`      | Registration ID                 | CHAR   | ✅ Yes    | 20     | —        |
| `regrNm`      | Registration Name               | CHAR   | ✅ Yes    | 60     | —        |
| `modrId`      | Modifier ID                     | CHAR   | ✅ Yes    | 20     | —        |
| `modrNm`      | Modifier Name                   | CHAR   | ✅ Yes    | 60     | —        |

---

### Stock Item List (`itemList`)

| Field        | Description          | Type   | Required | Notes    |
| ------------ | -------------------- | ------ | -------- | -------- |
| `itemSeq`    | Item Sequence Number | NUMBER | ✅ Yes    | —        |
| `itemClsCd`  | Item Class Code      | CHAR   | ✅ Yes    | —        |
| `itemCd`     | Item Code            | CHAR   | ❌ No     | Optional |
| `itemNm`     | Item Name            | CHAR   | ✅ Yes    | —        |
| `bcd`        | Barcode              | CHAR   | ❌ No     | Optional |
| `pkgUnitCd`  | Package Unit Code    | CHAR   | ✅ Yes    | —        |
| `pkg`        | Package Quantity     | NUMBER | ✅ Yes    | —        |
| `qtyUnitCd`  | Quantity Unit Code   | CHAR   | ✅ Yes    | —        |
| `qty`        | Unit Quantity        | NUMBER | ✅ Yes    | —        |
| `itemExprDt` | Item Expiration Date | CHAR   | ❌ No     | YYYYMMDD |
| `prc`        | Unit Price           | NUMBER | ✅ Yes    | —        |
| `splyAmt`    | Supply Amount        | NUMBER | ✅ Yes    | —        |
| `totDcAmt`   | Discount Amount      | NUMBER | ✅ Yes    | —        |
| `taxblAmt`   | Taxable Amount       | NUMBER | ✅ Yes    | —        |
| `taxTyCd`    | Tax Type Code        | CHAR   | ✅ Yes    | —        |
| `taxAmt`     | Tax Amount           | NUMBER | ✅ Yes    | —        |
| `totAmt`     | Total Amount         | NUMBER | ✅ Yes    | —        |

---

### JSON Request Example

```json
{
  "sarNo": 2,
  "orgSarNo": 2,
  "regTyCd": "M",
  "custTin": "A123456789Z",
  "custNm": null,
  "custBhfId": null,
  "sarTyCd": "11",
  "ocrnDt": "20260106",
  "totItemCnt": 2,
  "totTaxblAmt": 70000,
  "totTaxAmt": 10677.96,
  "totAmt": 70000,
  "remark": null,
  "regrId": "Test",
  "regrNm": "Test",
  "modrId": "Test",
  "modrNm": "Test",
  "itemList": [
    {
      "itemSeq": 1,
      "itemCd": "KE1NTXU0000001",
      "itemClsCd": "5059690800",
      "itemNm": "test item1",
      "bcd": null,
      "pkgUnitCd": "NT",
      "pkg": 10,
      "qtyUnitCd": "U",
      "qty": 10,
      "itemExprDt": null,
      "prc": 3500,
      "splyAmt": 35000,
      "totDcAmt": 0,
      "taxblAmt": 35000,
      "taxTyCd": "B",
      "taxAmt": 5338.98,
      "totAmt": 35000
    }
  ]
}
```

---

## Response Object: `StockIOSaveRes`

| Field       | Description                   | Type     | Notes             |
| ----------- | ----------------------------- | -------- | ----------------- |
| `resultCd`  | Result code (`000` = success) | CHAR(3)  | —                 |
| `resultMsg` | Result message                | CHAR     | —                 |
| `resultDt`  | Response timestamp            | CHAR(14) | YYYYMMDDhhmmss    |
| `data`      | Response data                 | Object   | Null for this API |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20260211120000",
  "data": null
}
```

## SDK Usage Examples

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
$requestData = [
    'sarNo'     => 2,
    'orgSarNo'  => 2,
    'regTyCd'   => 'M',
    'custTin'   => 'A123456789Z',
    'custNm'    => null,
    'custBhfId' => null,
    'sarTyCd'   => '11',
    'ocrnDt'    => '20260106',
    'totItemCnt'=> 2,
    'totTaxblAmt'=> 70000,
    'totTaxAmt' => 10677.96,
    'totAmt'    => 70000,
    'remark'    => null,
    'regrId'    => 'Test',
    'regrNm'    => 'Test',
    'modrId'    => 'Test',
    'modrNm'    => 'Test',
    'itemList'  => [
        [
            'itemSeq'     => 1,
            'itemCd'      => 'KE1NTXU0000001',
            'itemClsCd'   => '5059690800',
            'itemNm'      => 'test item1',
            'bcd'         => null,
            'pkgUnitCd'   => 'NT',
            'pkg'         => 10,
            'qtyUnitCd'   => 'U',
            'qty'         => 10,
            'itemExprDt'  => null,
            'prc'         => 3500,
            'splyAmt'     => 35000,
            'totDcAmt'    => 0,
            'taxblAmt'    => 35000,
            'taxTyCd'     => 'B',
            'taxAmt'      => 5338.98,
            'totAmt'      => 35000
        ],
        [
            'itemSeq'     => 2,
            'itemCd'      => 'KE1NTXU0000002',
            'itemClsCd'   => '5059690800',
            'itemNm'      => 'test item2',
            'bcd'         => null,
            'pkgUnitCd'   => 'BL',
            'pkg'         => 10,
            'qtyUnitCd'   => 'U',
            'qty'         => 10,
            'itemExprDt'  => null,
            'prc'         => 3500,
            'splyAmt'     => 35000,
            'totDcAmt'    => 0,
            'taxblAmt'    => 35000,
            'taxTyCd'     => 'B',
            'taxAmt'      => 5338.98,
            'totAmt'      => 35000
        ]
    ]
];

$response = $etims->saveStockIO($requestData);

if (($response['resultCd'] ?? '') === '000') {
    echo "✅ Stock In/Out saved successfully\n";
} else {
    abort("Failed to save Stock In/Out: " . ($response['resultMsg'] ?? 'Unknown error'));
}
```

  </TabItem>

  <TabItem value="js" label="JavaScript / TypeScript">

```ts
const stock_io_data = {
    sarNo: 2,
    orgSarNo: 2,
    regTyCd: 'M',
    custTin: 'A123456789Z',
    custNm: null,
    custBhfId: null,
    sarTyCd: '11',
    ocrnDt: '20260106',
    totItemCnt: 2,
    totTaxblAmt: 70000,
    totTaxAmt: 10677.96,
    totAmt: 70000,
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
            itemNm: 'test item1',
            bcd: null,
            pkgUnitCd: 'NT',
            pkg: 10,
            qtyUnitCd: 'U',
            qty: 10,
            itemExprDt: null,
            prc: 3500,
            splyAmt: 35000,
            totDcAmt: 0,
            taxblAmt: 35000,
            taxTyCd: 'B',
            taxAmt: 5338.98,
            totAmt: 35000
        },
        {
            itemSeq: 2,
            itemCd: 'KE1NTXU0000002',
            itemClsCd: '5059690800',
            itemNm: 'test item2',
            bcd: null,
            pkgUnitCd: 'BL',
            pkg: 10,
            qtyUnitCd: 'U',
            qty: 10,
            itemExprDt: null,
            prc: 3500,
            splyAmt: 35000,
            totDcAmt: 0,
            taxblAmt: 35000,
            taxTyCd: 'B',
            taxAmt: 5338.98,
            totAmt: 35000
        }
    ]
};

const response = await client.saveStockIO(stock_io_data);
console.log(`✅ Stock In/Out saved: ${response.resultMsg}`);
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
stock_io_data = {
    'sarNo': 2,
    'orgSarNo': 2,
    'regTyCd': 'M',
    'custTin': 'A123456789Z',
    'custNm': None,
    'custBhfId': None,
    'sarTyCd': '11',
    'ocrnDt': '20260106',
    'totItemCnt': 2,
    'totTaxblAmt': 70000,
    'totTaxAmt': 10677.96,
    'totAmt': 70000,
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
            'itemNm': 'test item1',
            'bcd': None,
            'pkgUnitCd': 'NT',
            'pkg': 10,
            'qtyUnitCd': 'U',
            'qty': 10,
            'itemExprDt': None,
            'prc': 3500,
            'splyAmt': 35000,
            'totDcAmt': 0,
            'taxblAmt': 35000,
            'taxTyCd': 'B',
            'taxAmt': 5338.98,
            'totAmt': 35000
        },
        {
            'itemSeq': 2,
            'itemCd': 'KE1NTXU0000002',
            'itemClsCd': '5059690800',
            'itemNm': 'test item2',
            'bcd': None,
            'pkgUnitCd': 'BL',
            'pkg': 10,
            'qtyUnitCd': 'U',
            'qty': 10,
            'itemExprDt': None,
            'prc': 3500,
            'splyAmt': 35000,
            'totDcAmt': 0,
            'taxblAmt': 35000,
            'taxTyCd': 'B',
            'taxAmt': 5338.98,
            'totAmt': 35000
        }
    ]
}

response = etims.save_stock_io(stock_io_data)
if response.get('resultCd') == '000':
    print("✅ Stock In/Out saved successfully")
else:
    abort(f"Failed to save Stock In/Out: {response.get('resultMsg', 'Unknown error')}")
```

  </TabItem>
</Tabs>

---

## Best Practices

* Validate `resultCd` before assuming the save succeeded.
* Include all required fields for both header and `itemList`.
* Handle optional customer fields (`custTin`, `custNm`, `custBhfId`) appropriately.
* Use `ocrnDt` to indicate the actual stock in/out date.
