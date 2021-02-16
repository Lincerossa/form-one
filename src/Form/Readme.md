```jsx
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'
import 'antd/dist/antd.css'
const getRandomInputItems = (length, label) =>
  Array.from({ length }, (e, i) => ({
    label: `${label}${i + 1}`,
    value: uuidv4(),
  }))

;<Form
  inputs={[
    {
      type: 'Divider',
      name: 'divider',
      orientation: 'left',
      label: 'My main form',
    },
    {
      label: 'First Name',
      name: 'firstName',
      type: 'Input',
      placeholder: 'Egs',
    },
    {
      label: 'My birthday Name',
      name: 'birthday',
      type: 'Datepicker',
    },
    {
      label: 'Age',
      name: 'myAge',
      type: 'Number',
    },
    {
      label: 'Checkbox input',
      name: 'myCheckbox',
      type: 'CheckboxGroup',
      items: getRandomInputItems(4, 'checkbox'),
    },
    {
      type: 'Repeater',
      label: 'Repeater input',
      name: 'myRepeater',
      items: [
        {
          type: 'Number',
          label: 'Choosen number in repeater',
          name: 'myNumber',
        },
        {
          type: 'Select',
          label: 'select',
          name: 'mySelect',
          items: [
            {
              value: 0,
              label: 'LABEL 1',
            },
            {
              value: 1,
              label: 'Label 2',
            },
          ],
        },
        {
          type: 'Repeater',
          label: 'custom repeater inner',
          name: 'myRepeaterInner',
          items: [
            {
              type: 'Number',
              label: 'Choosen number in repeater',
              name: 'myNumberInner',
            },
            {
              type: 'Select',
              label: 'select',
              name: 'mySelectInner',
              items: [
                {
                  value: 0,
                  label: 'LABEL 1',
                },
                {
                  value: 1,
                  label: 'Label 2',
                },
              ],
            },
            {
              type: 'Repeater',
              label: 'custom repeater inner',
              name: 'myRepeaterInner',
              items: [
                {
                  type: 'Number',
                  label: 'Choosen number in repeater',
                  name: 'myNumberInnerInner',
                },
                {
                  type: 'Select',
                  label: 'select',
                  name: 'mySelecteInnerInner',
                  items: [
                    {
                      value: 0,
                      label: 'LABEL 1',
                    },
                    {
                      value: 1,
                      label: 'Label 2',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ]}
  onSubmit={(values) => console.log({ values })}
/>
```

```jsx
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'
import 'antd/dist/antd.css'
const getRandomInputItems = (length, label) =>
  Array.from({ length }, (e, i) => ({
    label: `${label}${i + 1}`,
    value: uuidv4(),
  }))

;<Form
  inputs={[
    {
      type: 'Divider',
      name: 'divider',
      orientation: 'left',
      label: 'My main form',
    },
    {
      label: 'First Name',
      name: 'firstName',
      type: 'Input',
      defaultValue: 'default value',
      placeholder: 'Egs',
    },
    {
      label: 'My birthday Name',
      name: 'birthday',
      type: 'Datepicker',
    },
    {
      label: 'Age',
      name: 'myAge',
      type: 'Number',
    },
    {
      label: 'Checkbox input',
      name: 'myCheckbox',
      type: 'CheckboxGroup',
      items: getRandomInputItems(4, 'checkbox'),
    },
    {
      type: 'Repeater',
      label: 'Repeater input',
      name: 'myRepeater',
      items: [
        {
          type: 'Number',
          defaultValue: 2,
          label: 'Choosen number in repeater',
          name: 'myNumber',
        },
        {
          type: 'Select',
          label: 'select',
          defaultValue: 1,
          name: 'mySelect',
          items: [
            {
              value: 0,
              label: 'LABEL 1',
            },
            {
              value: 1,
              label: 'Label 2',
            },
          ],
        },
        {
          type: 'Repeater',
          label: 'custom repeater inner',
          name: 'myRepeaterInner',
          items: [
            {
              type: 'Number',
              label: 'Choosen number in repeater',
              name: 'myNumberInner',
              defaultValue: 4,
            },
            {
              type: 'Select',
              label: 'select',
              name: 'mySelectInner',
              items: [
                {
                  value: 0,
                  label: 'LABEL 1',
                },
                {
                  value: 1,
                  label: 'Label 2',
                },
              ],
            },
            {
              type: 'Repeater',
              label: 'custom repeater inner',
              name: 'myRepeaterInner',
              items: [
                {
                  type: 'Number',
                  label: 'Choosen number in repeater',
                  name: 'myNumberInnerInner',
                  defaultValue: 422,
                },
                {
                  type: 'Select',
                  label: 'select',
                  name: 'mySelecteInnerInner',
                  items: [
                    {
                      value: 0,
                      label: 'LABEL 1',
                    },
                    {
                      value: 1,
                      label: 'Label 2',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ]}
  validationSchema={Yup.object().shape({
    firstName: Yup.string().required('The Firstname is required'),
    myRepeater: Yup.array().when('myAge', {
      is: (age) => age && age > 18,
      then: Yup.array()
        .of(
          Yup.object().shape({
            myNumber: Yup.number().required('has to be a number'),
            myRepeaterInner: Yup.array().of(
              Yup.object().shape({
                myNumberInner: Yup.number().required(),
              })
            ),
          })
        )
        .required('Required'),
    }),
  })}
  initialValues={{
    firstName: 'Marcello',
    myAge: 19,
    myRepeater: [
      {
        myNumber: 1,
        mySelect: 0,
        myRepeaterInner: [
          {
            myNumberInner: 2,
          },
        ],
      },
    ],
  }}
  onSubmit={(values) => console.log({ values })}
/>
```
