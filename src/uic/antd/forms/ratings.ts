export const uiSchema = [
  {
    "_id": "Form",
    "component": "Form",
    "props": {
      "children": [
        {
          "_id": "PropertyFormItem_1",
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
          "_id": "PropertyFormItem_2",
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
          "_id": "PropertyFormItem_3",
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
                "component": "Switch"
              }
            ]
          }
        }
      ]
    }
  }
];
