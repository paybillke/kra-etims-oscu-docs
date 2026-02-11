---
title: Branches
sidebar_label: Branches
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Branch Search 

The **Branch Search API** retrieves branch information for a taxpayer.  
This includes details such as branch name, location, manager, and head office status.

**Endpoint**
```

POST /selectBhfList

````

---

## Purpose

This API:

- Retrieves **branch master data** for a taxpayer
- Returns all branches updated since a specified date
- Provides **manager and location details** for each branch

> ⚠️ Always verify branch status codes (`bhfSttsCd`) and head office flag (`hqYn`) before performing operations.

---

## Request Object: `BhfSearchReq`

### Request Fields

| Field | Description | Type | Required | Length |
|-------|------------|------|----------|--------|
| `lastReqDt` | Last request date (YYYYMMDDHHmmss) | CHAR | ✅ Yes | 14 |

---

### JSON Request Example

```json
{
  "lastReqDt": "20191130000000"
}
````

---

## Response Object: `BhfSearchRes`

### Top-Level Fields

| Field       | Description                   | Type     |
| ----------- | ----------------------------- | -------- |
| `resultCd`  | Result code (`000` = success) | CHAR(3)  |
| `resultMsg` | Result message                | CHAR     |
| `resultDt`  | Response timestamp            | CHAR(14) |

---

### Branch List (`bhfList`)

Each entry represents a **branch**.

| Field       | Description            | Type | Length |
| ----------- | ---------------------- | ---- | ------ |
| `tin`       | Taxpayer PIN           | CHAR | 11     |
| `bhfId`     | Branch Office ID       | CHAR | 2      |
| `bhfNm`     | Branch Name            | CHAR | 60     |
| `bhfSttsCd` | Branch Status Code     | CHAR | 5      |
| `prvncNm`   | County Name            | CHAR | 100    |
| `dstrtNm`   | Sub-County Name        | CHAR | 100    |
| `sctrNm`    | Tax Locality Name      | CHAR | 100    |
| `locDesc`   | Location Description   | CHAR | 100    |
| `mgrNm`     | Manager Name           | CHAR | 60     |
| `mgrTelNo`  | Manager Phone          | CHAR | 20     |
| `mgrEmail`  | Manager Email          | CHAR | 100    |
| `hqYn`      | Head Office Flag (Y/N) | CHAR | 1      |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226193023",
  "data": {
    "bhfList": [
      {
        "tin": "A123456789Z",
        "bhfId": "00",
        "bhfNm": "Headquarter",
        "bhfSttsCd": "01",
        "prvncNm": "NAIROBI CITY",
        "dstrtNm": "WESTLANDS",
        "sctrNm": "WON",
        "locDesc": "Westlands Towers",
        "mgrNm": "manage1130_00",
        "mgrTelNo": "0789001130",
        "mgrEmail": "manage113000@test.com",
        "hqYn": "Y"
      },
      {
        "tin": "A123456789Z",
        "bhfId": "01",
        "bhfNm": "Branch01",
        "bhfSttsCd": "01",
        "prvncNm": "NAIROBI CITY",
        "dstrtNm": "WESTLANDS",
        "sctrNm": "WON",
        "locDesc": "Westlands Towers",
        "mgrNm": "manage1130_01",
        "mgrTelNo": "0789011130",
        "mgrEmail": "manage113001@test.com",
        "hqYn": "N"
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
branches = etims.select_branches({'lastReqDt': last_req_dt(-30)})
bhf_list = branches.get('data', {}).get('bhfList', [])
print(f"Branches found: {len(bhf_list)}")

for branch in bhf_list:
    print(f"- Branch ID: {branch['bhfId']}")
    print(f"  Name: {branch['bhfNm']}")
    print(f"  Status: {branch['bhfSttsCd']}")
    print(f"  County: {branch['prvncNm']}")
    print(f"  Sub-County: {branch['dstrtNm']}")
    print(f"  Locality: {branch['sctrNm']}")
    print(f"  Location: {branch['locDesc']}")
    print(f"  Manager: {branch['mgrNm']}")
    print(f"  Phone: {branch['mgrTelNo']}")
    print(f"  Email: {branch['mgrEmail']}")
    print(f"  Head Office: {branch['hqYn']}\n")
```

  </TabItem>

  <TabItem value="js" label="JavaScript / Node.js">

```ts
const response = await etimsClient.selectBranches({
  lastReqDt: formatDateForEtims(-30)
});

const branches = response.data?.bhfList || [];
console.log(`Found ${branches.length} branches`);

branches.forEach(branch =>
  console.log(`- ${branch.bhfId}: ${branch.bhfNm} (${branch.bhfSttsCd})`)
);
```

  </TabItem>

  <TabItem value="php" label="PHP">

```php
$requestData = [
    'lastReqDt' => last_req_dt('-30 days'),
];

$branches = $etims->selectBranches($requestData);
$bhfList = $branches['data']['bhfList'] ?? [];

echo "Branches found: " . count($bhfList) . "\n";

foreach ($bhfList as $branch) {
    echo "- Branch ID: {$branch['bhfId']}\n";
    echo "  Name: {$branch['bhfNm']}\n";
    echo "  Status: {$branch['bhfSttsCd']}\n";
    echo "  County: {$branch['prvncNm']}\n";
    echo "  Sub-County: {$branch['dstrtNm']}\n";
    echo "  Locality: {$branch['sctrNm']}\n";
    echo "  Location: {$branch['locDesc']}\n";
    echo "  Manager: {$branch['mgrNm']}\n";
    echo "  Phone: {$branch['mgrTelNo']}\n";
    echo "  Email: {$branch['mgrEmail']}\n";
    echo "  Head Office: {$branch['hqYn']}\n\n";
}
```

  </TabItem>
</Tabs>

---

## Best Practices

* Use `lastReqDt` to fetch **recently updated branches**
* Verify `hqYn` to differentiate **head office vs branch**
* Cache branch data locally for faster lookups in other operations
* Ensure correct branch IDs when creating or updating items or notices

---

## Related APIs

* 👉 **[Customers](../customers/select-customer)**
* 👉 **[Notices](../select-notice-list)**
* 👉 **[Items](../items/select-item-list)**
