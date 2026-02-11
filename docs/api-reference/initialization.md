---
title: Device Initialization
sidebar_label: Device Initialization
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Device Initialization (OSCU)

The **Device Initialization** endpoint is used to **authenticate and initialize an OSCU device** with KRA eTIMS.

This is a **mandatory first step** after authentication and before submitting **sales, purchases, stock, or items**.

**Endpoint**
```

POST /selectInitOsdcInfo

````

---

## Purpose

This API:

* Authenticates the OSCU device
* Verifies the taxpayer and branch
* Returns the **`cmcKey` (Communication Key)**  
* Synchronizes taxpayer, branch, and device metadata

> 🔑 The returned **`cmcKey` must be stored securely** and reused in all subsequent OSCU requests.

---

## Request Object: `DeviceVerificationReq`

### Request Fields

| Field | Description | Type | Required | Length |
|-----|------------|------|----------|--------|
| `tin` | Taxpayer PIN | CHAR | ✅ Yes | 11 |
| `bhfId` | Branch ID | CHAR | ✅ Yes | 2 |
| `dvcSrlNo` | Device Serial Number | CHAR | ✅ Yes | ≤ 100 |

---

### JSON Request Example

```json
{
  "tin": "A123456789Z",
  "bhfId": "00",
  "dvcSrlNo": "dvcv1130"
}
````

---

## Response Object: `DeviceVerificationRes`

### Top-Level Fields

| Field       | Description                   | Type     |
| ----------- | ----------------------------- | -------- |
| `resultCd`  | Result code (`000` = success) | CHAR(3)  |
| `resultMsg` | Result message                | CHAR     |
| `resultDt`  | Response timestamp            | CHAR(14) |

---

### Taxpayer Information (`InitTaxpayer`)

| Field      | Description       | Type |
| ---------- | ----------------- | ---- |
| `tin`      | Taxpayer PIN      | CHAR |
| `taxprNm`  | Taxpayer Name     | CHAR |
| `bsnsActv` | Business Activity | CHAR |

---

### Branch Information (`InitBranch`)

| Field       | Description              | Type    |
| ----------- | ------------------------ | ------- |
| `bhfId`     | Branch ID                | CHAR    |
| `bhfNm`     | Branch Name              | CHAR    |
| `bhfOpenDt` | Branch Registration Date | CHAR(8) |
| `prvncNm`   | County Name              | CHAR    |
| `dstrtNm`   | Sub-County Name          | CHAR    |
| `sctrNm`    | Tax Locality             | CHAR    |
| `locDesc`   | Location Description     | CHAR    |
| `hqYn`      | Head Office Flag (`Y/N`) | CHAR(1) |
| `mgrNm`     | Manager Name             | CHAR    |
| `mgrTelNo`  | Manager Phone            | CHAR    |
| `mgrEmail`  | Manager Email            | CHAR    |

---

### Device Information (`InitDevice`)

| Field    | Description                  | Type      |
| -------- | ---------------------------- | --------- |
| `dvcId`  | Device ID                    | CHAR      |
| `sdicId` | Sales Device Control Unit ID | CHAR      |
| `mrcNo`  | MRC Number                   | CHAR      |
| `cmcKey` | Communication Key            | CHAR(255) |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226143124",
  "data": {
    "info": {
      "tin": "A123456789Z",
      "taxprNm": "Taxpayer1130",
      "bsnsActv": "business",
      "bhfId": "00",
      "bhfNm": "Headquater",
      "bhfOpenDt": "20200226",
      "prvncNm": "NAIROBI CITY",
      "dstrtNm": "WESTLANDS",
      "sctrNm": "WON",
      "locDesc": "Westlands Towers",
      "hqYn": "Y",
      "mgrNm": "manage1130_00",
      "mgrTelNo": "0789001130",
      "mgrEmail": "manage113000@test.com",
      "dvcId": "9999911300000001",
      "sdcId": "KRACU013000001",
      "mrcNo": "WIS01000150",
      "cmcKey": "f0b9831bd2334874b7ec815e40347bc4"
    }
  }
}
```

---

## SDK Usage Examples

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
$init = $etims->selectInitOsdcInfo([
    'tin' => getenv('KRA_TIN'),
    'bhfId' => getenv('KRA_BHF_ID') ?: '01',
    'dvcSrlNo' => getenv('DEVICE_SERIAL'),
]);

$cmcKey = $init['data']['info']['cmcKey'] ?? null;

if (!$cmcKey) {
    throw new Exception('Initialization failed');
}

echo "CMC Key: $cmcKey\n";
```

</TabItem>

<TabItem value="js" label="JavaScript / Typescript">

```ts
const response = await client.selectInitOsdcInfo({
  tin: process.env.KRA_TIN!,
  bhfId: process.env.KRA_BHF_ID || '01',
  dvcSrlNo: process.env.DEVICE_SERIAL!,
});

const cmcKey = response.data?.info?.cmcKey;
console.log('CMC Key:', cmcKey);
```

</TabItem>

<TabItem value="python" label="Python">

```python
init_data = etims.select_init_osdc_info({
    'tin': os.getenv('KRA_TIN'),
    'bhfId': os.getenv('KRA_BHF_ID') or '01',
    'dvcSrlNo': os.getenv('DEVICE_SERIAL'),
})

cmc_key = init_data['data']['info']['cmcKey']
print('CMC Key:', cmc_key)
```

</TabItem>
</Tabs>

---

## Important Notes

* This endpoint **must be called at least once per device**
* Store `cmcKey` securely (environment variable or secrets manager)
* Do **not** regenerate unless:

  * Device changes
  * Branch changes
  * KRA instructs re-initialization

---

## Next Steps

* 👉 Continue to **[Code Lists](./select-code-list)**
* 👉 Review **[Customers](./customers/select-customer)**
* 👉 Start **[Sales Transactions](./purchases/save-sales-transaction)**

---
