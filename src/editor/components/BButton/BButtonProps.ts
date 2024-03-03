const BButtonProps = [
  {
    name: 'type',
    label: '按钮类型',
    type: 'select',
    options: [
      { label: '主按钮', value: 'primary' },
      { label: '次按钮', value: 'default' }
    ]
  },
  {
    name: 'text',
    label: '文本',
    type: 'input',
  }
];

const BButtonDefaultProps = () => ({
  danger: false,
  disabled: false,
  shape: 'default',
  size: 'middle',
  type: 'default',
  text: 'Button'
});

export { BButtonProps, BButtonDefaultProps };