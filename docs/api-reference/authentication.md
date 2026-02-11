---
title: Authentication
sidebar_label: Authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# OSCU API Authentication

All interactions with the KRA eTIMS OSCU API require **authentication via OAuth 2.0 token**. Use the tabs below to see examples in **PHP**, **JavaScript/Node.js**, and **Python**.

---

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
require_once __DIR__ . '/../vendor/autoload.php';

use KraEtimsSdk\Services\AuthClient;

$config = [
    'env' => 'sbx',
    'auth' => [
        'sbx' => [
            'token_url' => 'https://sbx.kra.go.ke/v1/token/generate',
            'consumer_key' => getenv('KRA_CONSUMER_KEY'),
            'consumer_secret' => getenv('KRA_CONSUMER_SECRET'),
        ]
    ],
    'oscu' => [
        'tin' => getenv('KRA_TIN'),
        'bhf_id' => getenv('KRA_BHF_ID') ?: '01',
        'device_serial' => getenv('DEVICE_SERIAL'),
    ]
];

$auth = new AuthClient($config);

try {
    $auth->forgetToken();          // Clear cached token
    $token = $auth->token(true);   // Force refresh
    echo "✅ Token OK: " . substr($token, 0, 25) . "...\n";
} catch (\KraEtimsSdk\Exceptions\AuthenticationException $e) {
    echo "❌ Auth failed: " . $e->getMessage();
}
````

> Once you have the token, initialize the `EtimsClient` to call API endpoints:

```php
$etims = new EtimsClient($config, $auth);
```

</TabItem>

<TabItem value="js" label="JavaScript / Typescript">

```ts
import { AuthClient } from '@paybilldev/kra-etims-sdk';

const config = {
  env: 'sandbox',
  auth: {
    sandbox: {
      token_url: 'https://sbx.kra.go.ke/v1/token/generate',
      consumer_key: process.env.KRA_CONSUMER_KEY!,
      consumer_secret: process.env.KRA_CONSUMER_SECRET!,
    },
  },
  oscu: {
    tin: process.env.KRA_TIN!,
    bhf_id: process.env.KRA_BHF_ID || '01',
    device_serial: process.env.DEVICE_SERIAL!,
  }
};

const authClient = new AuthClient(config);

async function main() {
  try {
    const token = await authClient.getToken(true); // Force refresh
    console.log(`✅ Token OK: ${token.substring(0, 25)}...`);
  } catch (err) {
    console.error(`❌ Auth failed: ${err}`);
  }
}

main();
```

> Use the token to initialize the `EtimsClient`:

```ts
import { EtimsClient } from '@paybilldev/kra-etims-sdk';
const etimsClient = new EtimsClient(config, authClient);
```

</TabItem>

<TabItem value="python" label="Python">

```python
import os
from kra_etims_sdk.auth import AuthClient

config = {
    'env': 'sbx',
    'auth': {
        'sbx': {
            'token_url': 'https://sbx.kra.go.ke/v1/token/generate',
            'consumer_key': os.getenv('KRA_CONSUMER_KEY'),
            'consumer_secret': os.getenv('KRA_CONSUMER_SECRET'),
        }
    },
    'oscu': {
        'tin': os.getenv('KRA_TIN'),
        'bhf_id': os.getenv('KRA_BHF_ID') or '01',
        'device_serial': os.getenv('DEVICE_SERIAL'),
    }
}

auth = AuthClient(config)

try:
    auth.forget_token()            # Clear cached token
    token = auth.token(force=True) # Force refresh
    print(f"✅ Token OK: {token[:25]}...")
except Exception as e:
    print(f"❌ Auth failed: {e}")
```

> Initialize the EtimsClient after getting the token:

```python
from kra_etims_sdk.client import EtimsClient
etims_client = EtimsClient(config, auth)
```

</TabItem>
</Tabs>

---

## Next Steps

* 👉 Review **[Initialization](./initialization/)** to configure your OSCU device
* 👉 Check **[Code Lists](./select-code-list)** to retrieve standard codes
* 👉 Explore **[Customers & Branches](./customers/select-customer)** endpoints

