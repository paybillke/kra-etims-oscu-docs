---
id: item-code
title: Item Code
---

# Item Code

Each item has a unique **itemCd**. This code is **mandatory** and cannot be duplicated.  

## Structure of `itemCd`

`itemCd` is generated using a combination of country, product type, packaging, quantity unit, and a sequential number.

### Example:

```

KE2NTBA0000012

```

### Meaning:

| Segment       | Description                                      |
|---------------|--------------------------------------------------|
| KE            | Country of Origin (Kenya)                        |
| 2             | Product Type (Finished Product)                  |
| NT            | Packaging Unit (NET)                             |
| BA            | Quantity Unit (Barrel)                           |
| 0000012       | Incremental sequence number (from 0000001 to N) |
