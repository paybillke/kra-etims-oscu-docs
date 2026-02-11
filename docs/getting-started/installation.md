---
title: Installation
sidebar_label: Installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installation

Follow the instructions below to install the **KRA eTIMS OSCU SDKs** for your preferred programming language. Each SDK is **production-ready** and maintained by Paybill.

---

<Tabs>
  <TabItem value="php" label="PHP" default>

## PHP SDK Installation

1. Ensure **Composer** is installed:

```bash
composer -V
````

2. Install the **KRA eTIMS PHP SDK** via Composer:

```bash
composer require paybilldev/kra-etims-sdk
```

3. Verify installation:

```bash
php -r "require 'vendor/autoload.php'; echo 'SDK installed successfully';"
```

</TabItem>

<TabItem value="js" label="JavaScript / Typescript">

## JavaScript / Typescript SDK Installation

1. Ensure **Node.js 18+** is installed:

```bash
node -v
npm -v
```

2. Install the **KRA eTIMS Node.js SDK** via npm:

```bash
npm install @paybilldev/kra-etims-sdk
```

> Alternatively, use **yarn**:

```bash
yarn add @paybilldev/kra-etims-sdk
```

</TabItem>

<TabItem value="python" label="Python">

## Python SDK Installation

1. Ensure **Python 3.9+** is installed:

```bash
python --version
pip --version
```

2. Install the **KRA eTIMS Python SDK** via pip:

```bash
pip install kra-etims-sdk
```

3. Verify installation:

```bash
python -c "import kra_etims_sdk; print('SDK installed successfully')"
```

4. **Optional**: Set up a virtual environment:

```bash
python -m venv venv
source venv/bin/activate   # Linux / macOS
venv\Scripts\activate      # Windows
```

</TabItem>
</Tabs>

---

## Next Steps

* 👉 Review **[Configuration](../getting-started/configuration)** to set up your environment variables
* 👉 Check **[API Reference](../api-reference/index)** for detailed endpoint documentation
