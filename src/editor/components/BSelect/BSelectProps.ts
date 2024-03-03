const BSelectProps = [
  {
    name: 'disabled',
    label: '禁用',
    type: 'switch'
  }
];

const BSelectDefaultProps = () => ({
  defaultValue: 'lucy',
  options: [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'Yiminghe', label: 'yiminghe' },
  ],
  disabled: true
});

export { BSelectProps, BSelectDefaultProps };