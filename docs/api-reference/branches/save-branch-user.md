---
title: Branch Users
sidebar_label: Branch Users
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Save Branch User

This API function creates or updates a branch user account (employee) on the server.  
It includes required user credentials, branch info, authority, and status.

**Endpoint**
```

POST /saveBhfUser

````

---

## Request Object: `BhfUserSaveReq`

### Request Fields

| Field | Description | Type | Required | Length |
|-------|------------|------|----------|--------|
| `userId` | User ID | CHAR | ✅ Yes | 20 |
| `userNm` | User Name | CHAR | ✅ Yes | 60 |
| `pwd` | Password | CHAR | ✅ Yes | 255 |
| `adrs` | Address | CHAR | ❌ No | 200 |
| `cntc` | Contact Number | CHAR | ❌ No | 20 |
| `authCd` | Authority Code | CHAR | ❌ No | 100 |
| `remark` | Remarks | CHAR | ❌ No | 2000 |
| `useYn` | Active Status (Y/N) | CHAR | ✅ Yes | 1 |
| `regrId` | Registration ID | CHAR | ✅ Yes | 20 |
| `regrNm` | Registration Name | CHAR | ✅ Yes | 60 |
| `modrId` | Modifier ID | CHAR | ✅ Yes | 20 |
| `modrNm` | Modifier Name | CHAR | ✅ Yes | 60 |

---

### JSON Request Example

```json
{
  "userId": "userId3",
  "userNm": "User Name3",
  "pwd": "12341234",
  "adrs": null,
  "cntc": null,
  "authCd": null,
  "remark": null,
  "useYn": "Y",
  "regrId": "Test",
  "regrNm": "Test",
  "modrId": "Test",
  "modrNm": "Test"
}
````

---

## Response Object: `BhfUserSaveRes`

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
  "resultDt": "20200226192427",
  "data": null
}
```

---

## SDK Usage Examples

<Tabs>
  <TabItem value="python" label="Python" default>

```python
user_data = {
    'tin': config['oscu']['tin'],
    'bhfId': config['oscu']['bhf_id'],
    'cmcKey': config['oscu']['cmc_key'],
    'userId': 'userId3',
    'userNm': 'User Name3',
    'pwd': '12341234',
    'adrs': None,
    'cntc': None,
    'authCd': None,
    'remark': None,
    'useYn': 'Y',
    'regrId': 'Test',
    'regrNm': 'Test',
    'modrId': 'Test',
    'modrNm': 'Test',
}

response = etims.save_branch_user(user_data)

if response.get('resultCd') == '000':
    print("✅ Branch user saved successfully")
else:
    abort(f"Failed to save branch user: {response.get('resultMsg', 'Unknown error')}")
```

  </TabItem>

  <TabItem value="js" label="JavaScript / Node.js">

```ts
const response = await etimsClient.saveBranchUser({
  userId: `user_${Date.now()}`,
  userNm: `Test User ${Date.now()}`,
  pwd: 'SecurePass123!',
  useYn: 'Y',
  regrId: 'Test',
  regrNm: 'Test',
  modrId: 'Test',
  modrNm: 'Test',
});

console.log(`✅ Branch user saved: ${response.resultMsg}`);
```

  </TabItem>

  <TabItem value="php" label="PHP">

```php
$requestData = [
    'tin'       => $config['oscu']['tin'],
    'bhfId'     => $config['oscu']['bhf_id'],
    'cmcKey'    => $config['oscu']['cmc_key'] ?? '',
    'userId'    => 'userId3',
    'userNm'    => 'User Name3',
    'pwd'       => '12341234',
    'adrs'      => null,
    'cntc'      => null,
    'authCd'    => null,
    'remark'    => null,
    'useYn'     => 'Y',
    'regrId'    => 'Test',
    'regrNm'    => 'Test',
    'modrId'    => 'Test',
    'modrNm'    => 'Test',
];

$response = $etims->saveBranchUser($requestData);

if (($response['resultCd'] ?? '') === '000') {
    echo "✅ Branch user saved successfully\n";
} else {
    abort("Failed to save branch user: " . ($response['resultMsg'] ?? 'Unknown error'));
}
```

  </TabItem>
</Tabs>

---

## Best Practices

* Always use a **unique `userId`** for each branch user.
* Ensure `useYn` reflects whether the user is active.
* Store `regrId` and `modrId` for auditing.
* Optional fields (`adrs`, `cntc`, `authCd`, `remark`) can be left null.
