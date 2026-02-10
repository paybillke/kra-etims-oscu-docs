/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      className: 'category-as-header getting-started-header',
      collapsed: false,
      collapsible: false,
      items: [
        {
          type: 'doc',
          id: 'kra-etims-oscu/index',
          label: 'Introduction',
        },
        'kra-etims-oscu/getting-started/requirements',
        'kra-etims-oscu/getting-started/oscu',
        'kra-etims-oscu/getting-started/installation',
        'kra-etims-oscu/getting-started/configuration',
      ],
    },

    {
      type: 'category',
      label: 'API Reference',
      className: 'category-as-header api-reference-header',
      collapsed: false,
      items: [
        'kra-etims-oscu/api-reference/index',
        'kra-etims-oscu/api-reference/authentication',
        'kra-etims-oscu/api-reference/initialization',
        'kra-etims-oscu/api-reference/select-code-list',
        {
          type: 'category',
          label: 'Customers & Branches',
          items: [
            'kra-etims-oscu/api-reference/customers/select-customer',
            'kra-etims-oscu/api-reference/branches/select-branches',
            'kra-etims-oscu/api-reference/branches/save-branch-customer',
            'kra-etims-oscu/api-reference/branches/save-branch-user',
            'kra-etims-oscu/api-reference/branches/save-branch-insurance',
          ],
        },

        {
          type: 'category',
          label: 'Items',
          items: [
            'kra-etims-oscu/api-reference/items/select-item-classes',
            'kra-etims-oscu/api-reference/items/select-items',
            'kra-etims-oscu/api-reference/items/save-item',
            'kra-etims-oscu/api-reference/items/save-item-composition',
          ],
        },

        {
          type: 'category',
          label: 'Imported Items',
          items: [
            'kra-etims-oscu/api-reference/imports/select-imported-items',
            'kra-etims-oscu/api-reference/imports/update-imported-item',
          ],
        },

        {
          type: 'category',
          label: 'Purchases & Sales',
          items: [
            'kra-etims-oscu/api-reference/purchases/select-purchases',
            'kra-etims-oscu/api-reference/purchases/save-purchase',
            'kra-etims-oscu/api-reference/purchases/save-sales-transaction',
          ],
        },

        {
          type: 'category',
          label: 'Stock',
          items: [
            'kra-etims-oscu/api-reference/stock/select-stock-movement',
            'kra-etims-oscu/api-reference/stock/save-stock-io',
            'kra-etims-oscu/api-reference/stock/save-stock-master',
          ],
        },
        'kra-etims-oscu/api-reference/select-notice-list'
      ],
    },

    {
      type: 'category',
      label: 'Error Handling',
      className: 'category-as-header error-handling-header',
      collapsed: true,
      items: [
        'kra-etims-oscu/error-handling/index',
        'kra-etims-oscu/error-handling/exceptions',
        'kra-etims-oscu/error-handling/common-error-codes',
      ],
    },

    {
      type: 'category',
      label: 'Troubleshooting',
      className: 'category-as-header troubleshooting-header',
      collapsed: true,
      items: [
        'kra-etims-oscu/troubleshooting/index',
      ],
    },
  ],
};

module.exports = sidebars;
