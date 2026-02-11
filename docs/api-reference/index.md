---
title: API Reference
sidebar_label: API Reference
---

# KRA eTIMS OSCU API Reference

This section documents the available **OSCU API functions**, their request/response objects, and preconditions. Each function belongs to a **module** such as Initialization, Code Lists, Customers & Branches, Items, Imported Items, Purchases & Sales, Stock, and Notices.

---

## 3.2.1 List of OSCU Functions

| Section | Class / Module | Method | Description | Precondition | Request Object | Response Object |
|--------|----------------|--------|------------|-------------|----------------|----------------|
| Initialization | Device Verification | execute | Lookup initial setup information of OSCU device | Basic data management | [`DeviceVerificationReq`](initialization) | [`DeviceVerificationRes`](initialization) |
| Code Lists | Code | execute search | Lookup list of codes | - | [`CodeSearchReq`](select-code-list) | [`CodeSearchRes`](select-code-list) |
| Code Lists | Item | execute searchCls | Lookup list of item classifications | - | [`ItemClsSearchReq`](select-code-list) | [`ItemClsSearchRes`](select-code-list) |
| Customers & Branches | Customer | execute search | Lookup taxpayer information | - | [`CustSearchReq`](customers/select-customer) | [`CustSearchRes`](customers/select-customer) |
| Customers & Branches | Branch | execute search | Lookup list of taxpayer branch info | - | [`BhfSearchReq`](customers/select-branches) | [`BhfSearchRes`](customers/select-branches) |
| Customers & Branches | Branch | execute saveCustomer | Save branch customer information | - | [`BhfCustSaveReq`](customers/save-branch-customer) | [`BhfCustSaveRes`](customers/save-branch-customer) |
| Customers & Branches | Branch | execute saveUser | Save branch user account | - | [`BhfUserSaveReq`](customers/save-branch-user) | [`BhfUserSaveRes`](customers/save-branch-user) |
| Customers & Branches | Branch | execute saveInsurance | Save insurance company info | - | [`BhfInsuranceSaveReq`](customers/save-branch-insurance) | [`BhfInsuranceSaveRes`](customers/save-branch-insurance) |
| Items | Item | execute search | Lookup list of items (products) | - | [`ItemSearchReq`](items/select-items) | [`ItemSearchRes`](items/select-items) |
| Items | Item | execute save | Save item information | - | [`ItemSaveReq`](items/save-item) | [`ItemSaveRes`](items/save-item) |
| Items | Item | execute saveComposition | Save item composition | - | [`ItemCompositionSaveReq`](items/save-item-composition) | [`ItemCompositionSaveRes`](items/save-item-composition) |
| Imported Items | ImportItem | execute search | Lookup imported items | - | [`ImportItemSearchReq`](imports/select-imported-items) | [`ImportItemSearchRes`](imports/select-imported-items) |
| Imported Items | ImportItem | execute update | Revise imported item | - | [`ImportItemUpdateReq`](imports/update-imported-item) | [`ImportItemUpdateRes`](imports/update-imported-item) |
| Purchases & Sales | TrnsSales | execute save | Save sales transaction | - | [`TrnsSalesSaveWrReq`](purchases/save-sales-transaction) | [`TrnsSalesSaveWrRes`](purchases/save-sales-transaction) |
| Purchases & Sales | TrnsPurchase | execute searchPurchaseSales | Lookup purchase-sales transactions | - | [`TrnsPurchaseSalesSearchReq`](purchases/select-purchases) | [`TrnsPurchaseSalesSearchRes`](purchases/select-purchases) |
| Purchases & Sales | TrnsPurchase | execute save | Save purchase information | - | [`TrnsPurchaseSaveReq`](purchases/save-purchase) | [`TrnsPurchaseSaveRes`](purchases/save-purchase) |
| Stock | Stock | execute saveMaster | Save stock master info | - | [`StockMasterSaveReq`](stock/save-stock-master) | [`StockMasterSaveRes`](stock/save-stock-master) |
| Stock | Stock | execute getMoveList | Lookup stock movement list | - | [`StockMoveReq`](stock/select-stock-movement) | [`StockMoveRes`](stock/select-stock-movement) |
| Stock | Stock | execute saveIO | Save stock in/out info | - | [`StockIoSaveReq`](stock/save-stock-io) | [`StockIoSaveRes`](stock/save-stock-io) |
| Notices | Notice | execute search | Lookup list of notices | - | [`NoticeSearchReq`](select-notice-list) | [`NoticeSearchRes`](select-notice-list) |

---

### Notes

- Each **Request Object** (`Req`) contains the required fields to execute the function.
- Each **Response Object** (`Res`) contains the results of the API call, including status codes and data.
- Functions are grouped into **modules** for easier navigation.
- Click the links in the table to jump to **detailed API documentation** for each function.
