export const uiSchema = [
  {
    "component": "Form",
    "props": {
      "children": [
        {
          "component": "PropertyFormItem",
          "props": {
            "label": "count",
            "tooltip": "star 总数",
            "children": [
              {
                "component": "Input",
                "binding": 'count',
                "props": {
                }
              }
            ]
          }
        },
        {
          "component": "PropertyFormItem",
          "props": {
            "label": "value",
            "tooltip": "当前数，受控值",
            "children": [
              {
                "component": "Input",
                "binding": 'value',
                "props": {
                }
              }
            ]
          }
        },
        {
          "component": "PropertyFormItem",
          "props": {
            "label": "allowHalf",
            "tooltip": "是否允许半选",
            "children": [
              {
                "component": "Switch",
                "binding": 'allowHalf',
                "props": {}
              }
            ]
          }
        }
      ]
    }
  }
];

export const formSchema = {
  count: {
    rules: 'required|string',
  },
  value: {
    rules: 'required|string',

  },
  allowHalf: {
    rules: 'required|boolean',
  }
};
