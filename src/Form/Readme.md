VERTICAL

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
  onChange={({ watch, setValue }) => {
    const name = watch('firstName')
    const age = watch('myAge')
    if (name === 'marco' && age !== 99) {
      setValue('myAge', 99)
    }
  }}
  layout="vertical"
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
      label: 'Custom Input',
      name: 'customInput',
      type: 'Custom',
      CustomRender: ({ name }) => (
        <small>
          Beautiful input <strong>{name}</strong>
        </small>
      ),
    },
    {
      label: 'My birthday Name',
      name: 'myBirthday',
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
      condition: ({ watch }) => {
        const myAge = watch('myAge')
        return myAge > 18
      },
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
              name: 'myRepeaterInnerInner',
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
                  name: 'mySelectInnerInner',
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
    firstName: Yup.string().required('The Firstname is required').nullable(),
    myBirthday: Yup.string().required('The Birthday is required').nullable(),
    myAge: Yup.string().required('The Age is required').nullable(),
    myCheckbox: Yup.array().min(1).required('The Checkbox has to be checked somehow').nullable(),
    myRepeater: Yup.array().when('myAge', {
      is: (age) => age && age > 18,
      then: Yup.array()
        .of(
          Yup.object().shape({
            myNumber: Yup.string().required('Please, choose a number'),
            myRepeaterInner: Yup.array().of(
              Yup.object()
                .shape({
                  myNumberInner: Yup.string().required('Please, choose a number'),
                  myRepeaterInnerInner: Yup.array().of(
                    Yup.object()
                      .shape({
                        myNumberInnerInner: Yup.string().required('Please, choose a number'),
                      })
                      .required('Please, choose a number')
                  ),
                })
                .required('Please, choose a number')
            ),
          })
        )
        .required('The repeater has to be fulfilled correctly'),
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

HORIZONTAL

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
  onChange={({ watch, setValue }) => {
    const name = watch('firstName')
    const age = watch('myAge')
    if (name === 'marco' && age !== 99) {
      setValue('myAge', 99)
    }
  }}
  layout="horizontal"
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
      label: 'Custom Input',
      name: 'customInput',
      type: 'Custom',
      CustomRender: ({ name }) => (
        <small>
          Beautiful input <strong>{name}</strong>
        </small>
      ),
    },
    {
      label: 'My birthday Name',
      name: 'myBirthday',
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
      condition: ({ watch }) => {
        const myAge = watch('myAge')
        return myAge > 18
      },
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
              name: 'myRepeaterInnerInner',
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
                  name: 'mySelectInnerInner',
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
    firstName: Yup.string().required('The Firstname is required').nullable(),
    myBirthday: Yup.string().required('The Birthday is required').nullable(),
    myAge: Yup.string().required('The Age is required').nullable(),
    myCheckbox: Yup.array().min(1).required('The Checkbox has to be checked somehow').nullable(),
    myRepeater: Yup.array().when('myAge', {
      is: (age) => age && age > 18,
      then: Yup.array()
        .of(
          Yup.object().shape({
            myNumber: Yup.string().required('Please, choose a number'),
            myRepeaterInner: Yup.array().of(
              Yup.object()
                .shape({
                  myNumberInner: Yup.string().required('Please, choose a number'),
                  myRepeaterInnerInner: Yup.array().of(
                    Yup.object()
                      .shape({
                        myNumberInnerInner: Yup.string().required('Please, choose a number'),
                      })
                      .required('Please, choose a number')
                  ),
                })
                .required('Please, choose a number')
            ),
          })
        )
        .required('The repeater has to be fulfilled correctly'),
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
