---
title: Customer Search
sidebar_label: Customer Search
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Customer Search 

The **Customer Search API** retrieves **taxpayer (customer) information** registered in **KRA eTIMS** using a customer PIN (TIN).

In eTIMS terminology, a **Customer = Taxpayer**.

**Endpoint**
```

POST /selectCustomer

````

---

## Purpose

This API:

* Validates whether a **customer PIN exists** in KRA systems
* Returns **official taxpayer details** registered to that PIN
* Is commonly used **before issuing invoices** (buyer validation)

> ℹ️ The server returns customer data **based on `custmTin`** provided in the request.

---

## Request Object: `CustSearchReq`

### Request Fields

| Field | Description | Type | Required | Length |
|------|------------|------|----------|--------|
| `custmTin` | Customer PIN | CHAR | ✅ Yes | 11 |

---

### JSON Request Example

```json
{
  "custmTin": "A123456789Z"
}
````

---

## Response Object: `CustSearchRes`

### Top-Level Fields

| Field       | Description                   | Type     |
| ----------- | ----------------------------- | -------- |
| `resultCd`  | Result code (`000` = success) | CHAR(3)  |
| `resultMsg` | Result message                | CHAR     |
| `resultDt`  | Response timestamp            | CHAR(14) |

---

### Customer List (`custList`)

The response always returns a **list of customers**, even if only one record matches.

| Field         | Description          | Type | Length |
| ------------- | -------------------- | ---- | ------ |
| `tin`         | Taxpayer PIN         | CHAR | 11     |
| `taxprNm`     | Taxpayer Name        | CHAR | 60     |
| `taxprSttsCd` | Taxpayer Status Code | CHAR | 5      |
| `prvncNm`     | County Name          | CHAR | 100    |
| `dstrtNm`     | Sub-County Name      | CHAR | 100    |
| `sctrNm`      | Tax Locality Name    | CHAR | 100    |
| `locDesc`     | Location Description | CHAR | 100    |

> 📘 `taxprSttsCd` values are defined in **Taxpayer Status Codes** (see API reference section 4.2).

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226192053",
  "data": {
    "custList": [
      {
        "tin": "A123456789Z",
        "taxprNm": "TAXPAYER1",
        "taxprSttsCd": "A",
        "prvncNm": "NAIROBI CITY",
        "dstrtNm": "WESTLANDS",
        "sctrNm": "WON",
        "locDesc": "Westlands Towers"
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
$customers = $etims->selectCustomer([
    'custmTin' => 'A123456789Z'
]);

$custList = $customers['data']['custList'] ?? [];

echo "Customers found: " . count($custList) . PHP_EOL;

foreach ($custList as $cust) {
    echo "- TIN: {$cust['tin']}" . PHP_EOL;
    echo "  Name: {$cust['taxprNm']}" . PHP_EOL;
    echo "  Status: {$cust['taxprSttsCd']}" . PHP_EOL;
    echo "  County: {$cust['prvncNm']}" . PHP_EOL;
    echo "  Sub-County: {$cust['dstrtNm']}" . PHP_EOL;
    echo "  Tax Locality: {$cust['sctrNm']}" . PHP_EOL;
    echo "  Location: {$cust['locDesc']}" . PHP_EOL . PHP_EOL;
}

```

  </TabItem>

  <TabItem value="js" label="JavaScript / Typescript">

```ts
const response = await etimsVClient.selectCustomer({
  custmTin: 'A123456789Z'
});

const custList = response.data?.custList || [];
console.log(`Customers found: ${custList.length}`);

custList.forEach(cust => {
  console.log(`- ${cust.tin}`);
  console.log(`  Name: ${cust.taxprNm}`);
  console.log(`  Status: ${cust.taxprSttsCd}`);
});
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
customers = etims.select_customer({
    'custmTin': 'A123456789Z'
})

cust_list = customers.get('data', {}).get('custList', [])
print(f"Customers found: {len(cust_list)}")

for cust in cust_list:
    print(f"- TIN: {cust['tin']}")
    print(f"  Name: {cust['taxprNm']}")
    print(f"  Status: {cust['taxprSttsCd']}")
    print(f"  County: {cust['prvncNm']}")
    print(f"  Sub-County: {cust['dstrtNm']}")
    print(f"  Location: {cust['locDesc']}\n")
```

  </TabItem>
</Tabs>

---

## Best Practices

* Always validate **buyer PIN** before invoice issuance
* Do not cache customer data permanently (details may change)
* Handle non-`000` result codes gracefully
* Expect `custList` to be empty if PIN is invalid or inactive

---

## Next Steps

* 👉 **[Code Lists](../select-code-list)**
* 👉 **[Item Search](../items/select-items)**
* 👉 **[Sales / Invoice Submission](../sales/select-sales)**

