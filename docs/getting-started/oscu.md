---
title: OSCU Service
sidebar_label: OSCU Service
---

# Online Sales Control Unit (OSCU)

The **Online Sales Control Unit (OSCU)** is a communication module for private **Trader Invoicing System (TIS) applications** to send and receive data to and from the **KRA eTIMS API server**.  

OSCU includes **SKMM** to manage encryption, signatures, internal data, and keys.

> ⚠️ Note: These instructions apply to **OSCU-based integrations only**. Non-OSCU applications can directly connect to the eTIMS API.

---

## 1. Environment

OSCU is available in **two types**:

| Type | Description |
|------|------------|
| **Production OSCU** | Sends/receives live data to/from KRA eTIMS production server |
| **Test OSCU** | Sends/receives sandbox data to/from KRA eTIMS test server |

### Technical Information

| Parameter | Production | Test |
|-----------|------------|------|
| Interface Data Format | JSON | JSON |
| API Server | https://etims-api.kra.go.ke/etims-api/ | https://etims-api-sbx.kra.go.ke/etims-api/ |

---

## 2. Application Process to Use OSCU

1. Apply for **OSCU service** and receive approval from KRA.  
2. Install OSCU on a server and activate it.  
3. Call the **Initialization Method** with:
   - **PIN**
   - **Branch office**
   - **Equipment information**  

OSCU will authenticate the device and retrieve the **communication key** from KRA.

> ⚠️ Device registration is a **one-time process per device**.

---

## 3.OSCU Running Process & Configurations

Key policies for OSCU users:

1. Internet connection is required, as OSCU communicates directly with KRA eTIMS.  
2. All data exchange is performed via **OSCU library methods**.  
3. Always send the **latest ‘Date and Time’** of retrieved data to avoid conflicts.  

> 💡 Non-Java applications can also connect directly to eTIMS without OSCU.

### Sample Initialization Call

```json
POST /selectInitOsdcInfo
{
  "tin": "A123456789Z",
  "bhfId": "00",
  "dvcSrlNo": "dvc999993204"
}
```

### Sample Response 

```json
{
  'data': {
    'info': {
      'bhfId': '01',
      'bhfNm': 'Headquarter',
      'bhfOpenDt': '20260204',
      'bsnsActv': 'Others',
      'cmcKey': '<cmc_key>',
      'dstrtNm': 'Nairobi District',
      'dvcId': '<dvc_id>',
      'hqYn': 'Y',
      'locDesc': None,
      'mgrEmail': 'info@paybill.ke',
      'mgrNm': 'Paybill Kenya Limited',
      'mgrTelNo': '+254757807150',
      'mrcNo': '<mrc_no>',
      'prvncNm': 'Nairobi',
      'sctrNm': 'Langata',
      'sdcId': '<sdc_id>',
      'taxprNm': 'Paybill Kenya Limited',
      'tin': '<tin>'
    }
  },
 'resultCd': '000',
 'resultDt': '20260204171710',
 'resultMsg': 'Successful'
}
```

---

## OSCU Business Functions

OSCU methods are grouped into **8 categories**:

| Category                 | Action     | Description                                                             |
| ------------------------ | ---------- | ----------------------------------------------------------------------- |
| **Initialization**       | Send only  | Device authentication; registration and approval                        |
| **Code Data**            | Get only   | Retrieve standard codes, item classifications, PIN list, notices        |
| **Branch Information**   | Get & Send | Send customer, branch, and user info; request branch codes              |
| **Item Information**     | Get & Send | Send items and compositions; retrieve items from eTIMS                  |
| **Imported Item**        | Get & Send | Receive imported item data; send confirmation                           |
| **Sales Management**     | Send only  | Send sales transactions and invoices                                    |
| **Purchase Information** | Get & Send | Retrieve purchases; send confirmation                                   |
| **Stock Information**    | Get & Send | Send stock in/out and inventory updates; request stock from head office |

> 💡 Always ensure **stock data** is sent **after corresponding sales transactions**.

---

## 5. Next Steps

* Review **Initialization** examples to start device registration.
* Explore **API Reference** for full endpoint documentation.
* Use **sandbox/test environment** before production deployment.

