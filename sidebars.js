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
          id: 'index',
          label: 'Introduction',
        },
        'getting-started/requirements',
        'getting-started/oscu',
        'getting-started/installation',
        'getting-started/configuration',
      ],
    },

    {
      type: 'category',
      label: 'API Reference',
      className: 'category-as-header api-reference-header',
      collapsed: false,
      items: [
        'api-reference/index',
        'api-reference/authentication',
        'api-reference/initialization',
        'api-reference/select-code-list',
        {
          type: 'category',
          label: 'Customers & Branches',
          items: [
            'api-reference/customers/select-customer',
            'api-reference/branches/select-branches',
            'api-reference/branches/save-branch-customer',
            'api-reference/branches/save-branch-user',
            'api-reference/branches/save-branch-insurance',
          ],
        },

        {
          type: 'category',
          label: 'Items',
          items: [
            'api-reference/items/select-item-classes',
            'api-reference/items/select-items',
            'api-reference/items/save-item',
            'api-reference/items/save-item-composition',
          ],
        },

        {
          type: 'category',
          label: 'Imported Items',
          items: [
            'api-reference/imports/select-imported-items',
            'api-reference/imports/update-imported-item',
          ],
        },

        {
          type: 'category',
          label: 'Purchases & Sales',
          items: [
            'api-reference/purchases/select-purchases',
            'api-reference/purchases/save-purchase',
            'api-reference/purchases/save-sales-transaction',
          ],
        },

        {
          type: 'category',
          label: 'Stock',
          items: [
            'api-reference/stock/select-stock-movement',
            'api-reference/stock/save-stock-io',
            'api-reference/stock/save-stock-master',
          ],
        },
        'api-reference/select-notice-list'
      ],
    },

    {
      type: 'category',
      label: 'Error Handling',
      className: 'category-as-header error-handling-header',
      collapsed: true,
      items: [
        'error-handling/index',
        'error-handling/exceptions',
        'error-handling/common-error-codes',
      ],
    },

    {
      type: 'category',
      label: 'Troubleshooting',
      className: 'category-as-header troubleshooting-header',
      collapsed: true,
      items: [
        'troubleshooting/index',
      ],
    },
  ],
};

module.exports = sidebars;
