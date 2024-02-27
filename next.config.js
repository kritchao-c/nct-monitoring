/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  i18n,
  localePath: path.resolve('./public/locales'),
  transpilePackages: [
    '@amcharts/amcharts5',
    '@amcharts/amcharts5-geodata',
    // antd & deps
    '@ant-design',
    '@rc-component',
    'antd',
    'rc-cascader',
    'rc-checkbox',
    'rc-collapse',
    'rc-dialog',
    'rc-drawer',
    'rc-dropdown',
    'rc-field-form',
    'rc-image',
    'rc-input',
    'rc-input-number',
    'rc-mentions',
    'rc-menu',
    'rc-motion',
    'rc-notification',
    'rc-pagination',
    'rc-picker',
    'rc-progress',
    'rc-rate',
    'rc-resize-observer',
    'rc-segmented',
    'rc-select',
    'rc-slider',
    'rc-steps',
    'rc-switch',
    'rc-table',
    'rc-tabs',
    'rc-textarea',
    'rc-tooltip',
    'rc-tree',
    'rc-tree-select',
    'rc-upload',
    'rc-util',
  ],
};

module.exports = nextConfig;
