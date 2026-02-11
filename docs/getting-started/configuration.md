---
title: Configuration
sidebar_label: Configuration
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configuration

Before using the **KRA eTIMS OSCU SDKs**, you must configure your environment variables and SDK bootstrap settings. This ensures proper authentication, OSCU initialization, and API usage.

> ⚠️ **Important:** `CMC_KEY` is obtained via [`selectInitOsdcInfo`](../api-reference/initialization) and must be stored securely. Do **not** commit secrets to version control.

---

<Tabs>
  <TabItem value="php" label="PHP" default>

## PHP SDK Configuration

Load environment variables and bootstrap the SDK:

```php
require_once __DIR__ . '/vendor/autoload.php';

use KraEtimsSdk\Services\AuthVClient;
use KraEtimsSdk\Services\EtimsVClient;

// Load env variables using dotenv if needed
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// SDK Config
$config = [
    'env' => getenv('KRA_ENV') ?: 'sbx',
    'auth' => [
        'sbx' => [
            'consumer_key' => getenv('KRA_CONSUMER_KEY'),
            'consumer_secret' => getenv('KRA_CONSUMER_SECRET')
        ],
        'prod' => [
            'consumer_key' => getenv('KRA_CONSUMER_KEY'),
            'consumer_secret' => getenv('KRA_CONSUMER_SECRET')
        ]
    ],
    'oscu' => [
        'tin' => getenv('KRA_TIN'),
        'bhf_id' => getenv('KRA_BHF_ID') ?: '01',
        'device_serial' => getenv('DEVICE_SERIAL'),
        'cmc_key' => getenv('CMC_KEY') ?: '',
    ]
];

$auth = new AuthVClient($config);
$etims = new EtimsVClient($config, $auth);
```

</TabItem>

<TabItem value="js" label="JavaScript / Typescript">

## Node.js / JavaScript SDK Configuration

Load env variables and bootstrap the SDK:

```javascript
import dotenv from 'dotenv';
import { AuthVClient, EtimsVClient } from 'kra-etims-sdk';

dotenv.config();

const config = {
  env: process.env.KRA_ENV || 'sbx',
  auth: {
    sbx: {
      consumer_key: process.env.KRA_CONSUMER_KEY,
      consumer_secret: process.env.KRA_CONSUMER_SECRET
    },
    prod: {
      consumer_key: process.env.KRA_CONSUMER_KEY,
      consumer_secret: process.env.KRA_CONSUMER_SECRET
    }
  },
  oscu: {
    tin: process.env.KRA_TIN,
    bhf_id: process.env.KRA_BHF_ID || '01',
    device_serial: process.env.DEVICE_SERIAL,
    cmc_key: process.env.CMC_KEY || ''
  }
};

const auth = new AuthVClient(config);
const etims = new EtimsVClient(config, auth);
```

</TabItem>

<TabItem value="python" label="Python">

## Python SDK Configuration

Load environment variables and bootstrap the SDK:

```python
import os
from kra_etims_sdk.auth import AuthVClient
from kra_etims_sdk.client import EtimsVClient
from dotenv import load_dotenv

load_dotenv()

config = {
    "env": os.getenv("KRA_ENV", "sbx"),
    "auth": {
        "sbx": {
            "consumer_key": os.getenv("KRA_CONSUMER_KEY"),
            "consumer_secret": os.getenv("KRA_CONSUMER_SECRET")
        },
        "prod": {
            "consumer_key": os.getenv("KRA_CONSUMER_KEY"),
            "consumer_secret": os.getenv("KRA_CONSUMER_SECRET")
        }
    },
    "oscu": {
        "tin": os.getenv("KRA_TIN"),
        "bhf_id": os.getenv("KRA_BHF_ID") or "01",
        "device_serial": os.getenv("DEVICE_SERIAL"),
        "cmc_key": os.getenv("CMC_KEY") or ""
    }
}

auth = AuthVClient(config)
etims = EtimsVClient(config, auth)
```

</TabItem>
</Tabs>

---

## Notes

* Always use **sandbox environment** for development and testing.
* Production credentials must **never** be used in dev or test environments.
* Secure `CMC_KEY` properly; it's required for OSCU operations.
* Refer to **[Initialization API](../api-reference/initialization)** to complete device registration.
