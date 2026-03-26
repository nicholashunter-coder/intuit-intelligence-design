/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Design',
      items: [
        'design/inline-treatments',
        'design/components',
        'design/tokens',
      ],
    },
    {
      type: 'category',
      label: 'Prototypes',
      items: [
        'prototypes/card-interactions',
      ],
    },
    {
      type: 'category',
      label: 'Research',
      items: [
        'research/source-metadata',
      ],
    },
    {
      type: 'category',
      label: 'FAQ',
      items: [
        'faq/index',
      ],
    },
  ],
};

module.exports = sidebars;
