---
title: Introduction
sidebar_label: Introduction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# KRA eTIMS OSCU API SDKs

The **KRA eTIMS SDKs** are a family of **production-ready, community-maintained SDKs** designed to simplify integration with the **Kenya Revenue Authority (KRA) eTIMS OSCU API** across multiple programming languages.

These SDKs abstract the complexity of the OSCU protocol, strict payload validation rules, token lifecycle management, and KRA-specific constraints—allowing developers to focus on **business logic**, not API quirks.

> ⚠️ **Important**: These SDKs are intended **exclusively for OSCU-based integrations**. They are **not** suitable for non-OSCU eTIMS implementations.

---

## Supported Languages & Installation

Paybill currently maintains official SDKs for PHP, JavaScript/ TypeScript, and Python.

<Tabs>
  <TabItem value="php" label="PHP" default>

### PHP SDK

* **Repository**: [GitHub](https://github.com/paybillke/kra-etims-php-sdk)  
* **Packagist**: [Link](https://packagist.org/packages/paybilldev/kra-etims-sdk)

#### Install via Composer

```bash
composer require paybilldev/kra-etims-sdk
````

</TabItem>

<TabItem value="js" label="JavaScript / Typescript">

### JavaScript / Typescript SDK

* **Repository**: [GitHub](https://github.com/paybillke/kra-etims-js-sdk)
* **NPM**: [Link](https://www.npmjs.com/package/@paybilldev/kra-etims-sdk)

#### Install via NPM

```bash
npm install @paybilldev/kra-etims-sdk
```

Or via Yarn:

```bash
yarn add @paybilldev/kra-etims-sdk
```

</TabItem>

<TabItem value="python" label="Python">

### Python SDK

* **Repository**: [GitHub](https://github.com/paybillke/kra-etims-python-sdk)
* **PyPI**: [Link](https://pypi.org/project/kra-etims-sdk/)

#### Install via pip

```bash
pip install kra-etims-sdk
```

</TabItem>
</Tabs>

---

## What These SDKs Solve

All SDKs are built around the same core principles:

* ✅ **Strict compliance** with the official KRA OSCU Postman collections
* ✅ **Exact endpoint naming** (flat endpoints, no undocumented prefixes)
* ✅ **Automatic token management** with caching and refresh handling
* ✅ **Payload validation** before requests reach KRA
* ✅ **Consistent method naming** across languages
* ✅ **Sandbox & production environment support**

This ensures that behavior is predictable and consistent regardless of the language you use.

---

## Who This Is For

These SDKs are ideal for:

* POS systems
* ERP integrations
* Accounting platforms
* Middleware services
* Custom business systems integrating with **KRA eTIMS via OSCU**

---

## Design Philosophy

* One SDK method = one KRA endpoint
* No silent data mutation
* No undocumented defaults
* Validation errors are surfaced **before** API calls

This aligns SDK behavior with KRA audit expectations and simplifies debugging.

---

## Disclaimer

These SDKs are **not officially endorsed by KRA**.
KRA may change API behavior or validation rules without notice. Always test in the sandbox environment and verify requirements before deploying to production.

---

## Next Steps

* 👉 Proceed to **Requirements** to configure your environment
* 👉 Follow **Installation** for your chosen language
* 👉 Explore **API Reference** for detailed endpoint documentation
