---
title: Authentication
sidebar_label: Authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# OSCU API Authentication

All interactions with the KRA eTIMS OSCU API require **authentication via OAuth 2.0 token**. Use the tabs below to see examples in **PHP**, **JavaScript/ TypeScript**, and **Python**.

---

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
require_once __DIR__ . '/../vendor/autoload.php';

use KraEtimsSdk\Services\AuthOClient;

$config = [
    'env' => 'sbx',
    'auth' => [
        'sbx' => [
            'consumer_key' => getenv('KRA_CONSUMER_KEY'),
            'consumer_secret' => getenv('KRA_CONSUMER_SECRET'),
        ],
        'prod' => [
            'consumer_key' => getenv('KRA_CONSUMER_KEY'),
            'consumer_secret' => getenv('KRA_CONSUMER_SECRET'),
        ]
    ],
    'oscu' => [
        'tin' => getenv('KRA_TIN'),
        'bhf_id' => getenv('KRA_BHF_ID') ?: '01',
        'device_serial' => getenv('DEVICE_SERIAL'),
        'cmc_key': getenv('CMC_KEY'),
    ]
];

$auth = new AuthOClient($config);

try {
    $auth->forgetToken();          // Clear cached token
    $token = $auth->token(true);   // Force refresh
    echo "✅ Token OK: " . substr($token, 0, 25) . "...\n";
} catch (\KraEtimsSdk\Exceptions\AuthenticationException $e) {
    echo "❌ Auth failed: " . $e->getMessage();
}
````

> Once you have the token, initialize the `EtimsOClient` to call API endpoints:

```php
$etims = new EtimsOClient($config, $auth);
```

</TabItem>

<TabItem value="js" label="JavaScript / Typescript">

```ts
import { AuthOClient } from '@paybilldev/kra-etims-sdk';

const config = {
  env: 'sbx',
  auth: {
    sbx: {
      consumer_key: process.env.KRA_CONSUMER_KEY!,
      consumer_secret: process.env.KRA_CONSUMER_SECRET!,
    },
    prod: {
      consumer_key: process.env.KRA_CONSUMER_KEY!,
      consumer_secret: process.env.KRA_CONSUMER_SECRET!,
    }
  },
  oscu: {
    tin: process.env.KRA_TIN!,
    bhf_id: process.env.KRA_BHF_ID || '01',
    device_serial: process.env.DEVICE_SERIAL!,
    cmc_key: process.env.CMC_KEY!,
  }
};

const auth = new AuthOClient(config);

async function main() {
  try {
    const token = await auth.getToken(true); // Force refresh
    console.log(`✅ Token OK: ${token.substring(0, 25)}...`);
  } catch (err) {
    console.error(`❌ Auth failed: ${err}`);
  }
}

main();
```

> Use the token to initialize the `EtimsOClient`:

```ts
import { EtimsOClient } from '@paybilldev/kra-etims-sdk';
const client = new EtimsOClient(config, auth);
```

</TabItem>

<TabItem value="python" label="Python">

```python
import os
from kra_etims_sdk.oauth import AuthOClient

config = {
    'env': 'sbx',
    'auth': {
        'sbx': {
            'consumer_key': os.getenv('KRA_CONSUMER_KEY'),
            'consumer_secret': os.getenv('KRA_CONSUMER_SECRET'),
        }
        'prod': {
            'consumer_key': os.getenv('KRA_CONSUMER_KEY'),
            'consumer_secret': os.getenv('KRA_CONSUMER_SECRET'),
        }
    },
    'oscu': {
        'tin': os.getenv('KRA_TIN'),
        'bhf_id': os.getenv('KRA_BHF_ID') or '01',
        'device_serial': os.getenv('DEVICE_SERIAL'),
        'cmc_key': os.getenv('CMC_KEY'),
    }
}

auth = AuthOClient(config)

try:
    auth.forget_token()            # Clear cached token
    token = auth.token(force=True) # Force refresh
    print(f"✅ Token OK: {token[:25]}...")
except Exception as e:
    print(f"❌ Auth failed: {e}")
```

> Initialize the EtimsOClient after getting the token:

```python
from kra_etims_sdk.oclient import EtimsOClient
etims_client = EtimsOClient(config, auth)
```

</TabItem>
</Tabs>

---

## Next Steps

* 👉 Review **[Initialization](./initialization/)** to configure your OSCU device
* 👉 Check **[Code Lists](./select-code-list)** to retrieve standard codes
* 👉 Explore **[Customers & Branches](./customers/select-customer)** endpoints

