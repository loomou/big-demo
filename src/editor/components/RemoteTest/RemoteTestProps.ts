const PieProps = [
  {
    name: 'title',
    label: '标题',
    type: 'input',
  },
  {
    name: 'label.position',
    label: '标签位置',
    type: 'select',
    options: [
      {
        label: '内部',
        value: 'inside'
      },
      {
        label: '外部',
        value: 'outside'
      }
    ]
  }
];

const PieDefaultProps = () => ({
  data: [
    { type: '分类一', value: 27 },
    { type: '分类二', value: 25 },
    { type: '分类三', value: 18 },
    { type: '分类四', value: 15 },
    { type: '分类五', value: 10 },
    { type: '其他', value: 5 },
  ],
  title: '456',
  angleField: 'value',
  colorField: 'type',
  label: {
    position: 'outside',
    text: 'value',
    style: {
      fontWeight: 'bold',
    },
  },
  legend: {
    color: {
      title: false,
      position: 'top',
      rowPadding: 5,
    },
  }
});

export { PieProps, PieDefaultProps };