---
title: Requirements
sidebar_label: Requirements
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Requirements

Before integrating with the **KRA eTIMS OSCU API** using any of the Paybill SDKs ([PHP](https://github.com/paybillke/kra-etims-php-sdk), [JavaScript](https://github.com/paybillke/kra-etims-js-sdk), or [Python](https://github.com/paybillke/kra-etims-python-sdk)), ensure that **all technical, regulatory, and environment requirements** below are met.

Failure to meet these requirements will result in authentication errors, rejected payloads, or failed audits.

---

## 1. KRA Prerequisites (Mandatory)

### OSCU Registration
You **must** be approved by KRA to integrate using the **OSCU (Online Sales Control Unit)** flow.

- Your business must be registered on **[GavaConnect](https://developer.go.ke)**
- OSCU credentials must be issued by KRA
- Sandbox credentials are different from production credentials

> ⚠️ These SDKs are **OSCU-only**. They will not work with non-OSCU eTIMS integrations.

---

### Required KRA Credentials

You will receive the following from KRA:

| Variable | Description |
|--------|-------------|
| `consumer_key` | OAuth client key |
| `consumer_secret` | OAuth client secret |
| `tin` | Taxpayer Identification Number |
| `bhfId` | Branch ID (default: `01`) |
| `dvcSrlNo` | OSCU device serial number |
| `cmcKey` | Branch communication key (issued after [initialization](../api-reference/initialization)) |

> 🔑 **Important**: `cmcKey` is obtained dynamically via [`selectInitOsdcInfo`](../api-reference/initialization) and must be stored securely.

---

## 2. Supported Environments

All SDKs support both **sandbox** and **production** environments.

| Environment | Purpose |
|-----------|--------|
| Sandbox | Development & testing |
| Production | Live KRA submissions |

Sandbox behavior may differ slightly from production (e.g., relaxed serial validation), but **payload validation rules are identical**.

---

## 3. Language-Specific Requirements

<Tabs>
  <TabItem value="php" label="PHP" default>

### PHP

- PHP **8.1+**
- Extensions:
  - `curl`
  - `json`
  - `openssl`
- Composer ([Packagist](https://packagist.org/packages/paybilldev/kra-etims-sdk))

```bash
php -v
composer -V
````

</TabItem>

<TabItem value="js" label="JavaScript / Typescript">

### JavaScript / Typescript

* Node.js **18+**
* npm ([NPM](https://www.npmjs.com/package/@paybilldev/kra-etims-sdk)) or yarn
* HTTPS support enabled

```bash
node -v
npm -v
```

</TabItem>

<TabItem value="python" label="Python">

### Python

* Python **3.9+**
* `pip` package manager ([PyPI](https://pypi.org/project/kra-etims-sdk/))
* Virtual environment recommended

```bash
python --version
pip --version
```

</TabItem>
</Tabs>

---

## 4. System & Network Requirements

* Outbound HTTPS access to:

  * `https://sbx.kra.go.ke`
  * `https://etims-api.kra.go.ke`
* TLS 1.2 or higher
* Valid system clock (time drift can cause token failures)

> ⏱️ **Time synchronization is critical**. OAuth tokens and request timestamps are time-sensitive.

---

## 5. Invoice & Date Rules (Critical)

### Invoice Numbering

* Must be **sequential integers**
* Must be unique per branch (`bhfId`)
* **Strings are rejected**

```php
'invcNo' => 1   // ✅ Correct
'invcNo' => 'INV001' // ❌ Rejected
```

> See [Field Validation Rules](../api-reference/index#field-validation-rules) for more details.

### Date & Time Formats

| Field                 | Format           | Example          |
| --------------------- | ---------------- | ---------------- |
| `salesDt`, `pchsDt`   | `YYYYMMDD`       | `20260131`       |
| `cfmDt`, `stockRlsDt` | `YYYYMMDDHHmmss` | `20260131143022` |
| `lastReqDt`           | `YYYYMMDDHHmmss` | `20260130143022` |

* Future dates are rejected
* `lastReqDt` must not be older than 7 days

---

## 6. Validation Behavior

All Paybill SDKs perform **local validation before sending requests** to KRA:

* Required fields are enforced
* Data types are validated
* KRA-specific constraints are checked early

This reduces failed submissions and simplifies debugging.

---

## 7. Security Best Practices

* Store credentials outside source code
* Restrict access to token cache files
* Rotate production credentials when staff changes
* Log KRA responses securely (avoid exposing secrets)

---

## Next Steps

* 👉 Continue to **[Installation](../getting-started/installation)**
* 👉 Review **[Configuration](../getting-started/configuration)**

