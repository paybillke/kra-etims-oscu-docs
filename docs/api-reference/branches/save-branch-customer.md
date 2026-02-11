---
title: Branch Customers
sidebar_label: Branch Customers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Save Branch Customer

The **Save Branch Customer API** stores or updates customer information for a specific branch.  
It includes essential customer details such as PIN, name, contact info, and status.

**Endpoint**
```

POST /saveBhfCustomer

````

---

## Request Object: `BhfCustSaveReq`

### Request Fields

| Field | Description | Type | Required | Length |
|-------|------------|------|----------|--------|
| `custNo` | Customer Number | CHAR | ✅ Yes | 9 |
| `custTin` | Customer PIN | CHAR | ✅ Yes | 11 |
| `custNm` | Customer Name | CHAR | ✅ Yes | 60 |
| `adrs` | Address | CHAR | ❌ No | 300 |
| `telNo` | Contact Number | CHAR | ❌ No | 20 |
| `email` | Email | CHAR | ❌ No | 50 |
| `faxNo` | Fax Number | CHAR | ❌ No | 20 |
| `useYn` | Active Status (Y/N) | CHAR | ✅ Yes | 1 |
| `remark` | Remarks | CHAR | ❌ No | 1000 |
| `regrId` | Registration ID | CHAR | ✅ Yes | 20 |
| `regrNm` | Registration Name | CHAR | ✅ Yes | 60 |
| `modrId` | Modifier ID | CHAR | ✅ Yes | 20 |
| `modrNm` | Modifier Name | CHAR | ✅ Yes | 60 |

---

### JSON Request Example

```json
{
  "custNo": "999991113",
  "custTin": "A123456789Z",
  "custNm": "Taxpayer1113",
  "adrs": null,
  "telNo": null,
  "email": null,
  "faxNo": null,
  "useYn": "Y",
  "remark": null,
  "regrId": "Test",
  "regrNm": "Test",
  "modrId": "Test",
  "modrNm": "Test"
}
````

---

## Response Object: `BhfCustSaveRes`

### Response Fields

| Field       | Description                   | Type     | Length |
| ----------- | ----------------------------- | -------- | ------ |
| `resultCd`  | Result Code (`000` = success) | CHAR(3)  | 3      |
| `resultMsg` | Result Message                | CHAR     | -      |
| `resultDt`  | Response Timestamp            | CHAR(14) | 14     |
| `data`      | Always null                   | -        | -      |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226193115",
  "data": null
}
```

---

## SDK Usage Examples

<Tabs>
  <TabItem value="python" label="Python" default>

```python
customer_data = {
    'custNo': '999991113',
    'custTin': 'A123456789Z',
    'custNm': 'Taxpayer1113',
    'adrs': None,
    'telNo': None,
    'email': None,
    'faxNo': None,
    'useYn': 'Y',
    'remark': None,
    'regrId': 'Test',
    'regrNm': 'Test',
    'modrId': 'Test',
    'modrNm': 'Test',
}

response = etims.save_branch_customer(customer_data)

if response.get('resultCd') == '000':
    print("✅ Branch customer saved successfully")
else:
    abort(f"Failed to save branch customer: {response.get('resultMsg', 'Unknown error')}")
```

  </TabItem>

  <TabItem value="js" label="JavaScript / TypeScript">

```ts
const response = await client.saveBranchCustomer({
  custNo: `CUST123456`,
  custTin: 'A123456789Z',
  custNm: `Test Customer ${Date.now()}`,
  useYn: 'Y',
  regrId: 'Test',
  regrNm: 'Test',
  modrId: 'Test',
  modrNm: 'Test',
});

console.log(`✅ Branch customer saved: ${response.resultMsg}`);
expect(response.resultCd).toBe('000');
```

  </TabItem>

  <TabItem value="php" label="PHP">

```php
$requestData = [
    'custNo'    => '999991113',
    'custTin'   => 'A123456789Z',
    'custNm'    => 'Taxpayer1113',
    'adrs'      => null,
    'telNo'     => null,
    'email'     => null,
    'faxNo'     => null,
    'useYn'     => 'Y',
    'remark'    => null,
    'regrId'    => 'Test',
    'regrNm'    => 'Test',
    'modrId'    => 'Test',
    'modrNm'    => 'Test',
];

$response = $etims->saveBranchCustomer($requestData);

if (($response['resultCd'] ?? '') === '000') {
    echo "✅ Branch customer saved successfully\n";
} else {
    abort("Failed to save branch customer: " . ($response['resultMsg'] ?? 'Unknown error'));
}
```

  </TabItem>
</Tabs>

---

## Best Practices

* Ensure `custNo` and `custTin` are **unique for each branch**.
* Use `useYn` flag to deactivate customers without deleting them.
* Provide `regrId` and `modrId` for audit tracking.
* Optional fields like address, email, and phone can be left null if unavailable.
