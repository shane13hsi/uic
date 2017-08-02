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
                "props": {
                  "placeholder": "Username"
                }
              }
            ]
          }
        },
        {
          "component": "PropertyFormItem",
          "props": {
            "label": "count",
            "tooltip": "star 总数",
            "children": [
              {
                "component": "Input",
                "props": {
                  "placeholder": "Username"
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
                "props": {
                  "placeholder": "Username"
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
                "props": {}
              }
            ]
          }
        }
      ]
    }
  }
];
