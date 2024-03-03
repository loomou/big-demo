import type { ColumnConfig } from '@ant-design/charts';

const BColumnProps = [
  {
    name: 'title',
    label: '标题',
    type: 'input',
  },
  {
    name: 'label.position',
    label: '标签位置',
    type: 'select',
    // defaultValue: 'inside',
    options: [
      {
        label: '顶部',
        value: 'top'
      },
      {
        label: '内部',
        value: 'inside'
      },
      {
        label: '底部',
        value: 'bottom'
      }
    ]
  }
];

const BColumnDefaultProps = (): ColumnConfig => ({
  data: [
    {
      type: '家具家电',
      sales: 38,
    },
    {
      type: '粮油副食',
      sales: 52,
    },
    {
      type: '生鲜水果',
      sales: 61,
    },
    {
      type: '美容洗护',
      sales: 145,
    },
    {
      type: '母婴用品',
      sales: 48,
    },
    {
      type: '进口食品',
      sales: 38,
    },
    {
      type: '食品饮料',
      sales: 38,
    },
    {
      type: '家庭清洁',
      sales: 38,
    },
  ],
  title: '123',
  xField: 'type',
  yField: 'sales',
  label: {
    position: 'inside',
    style: {
      fill: '#FFFFFF',
      opacity: 0.6,
    },
  },
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
  yAxis: {
    label: {
      autoHide: false,
      autoRotate: false
    }
  },
  tooltip: {
    visible: false
  }
});

export { BColumnProps, BColumnDefaultProps };