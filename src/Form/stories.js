import React, { useState } from 'react'
import * as Yup from 'yup'
import Form from './index'

const getRandomInputItems = (length, label) => Array.from({ length }, (e, i) => ({
  label: `${label}${i + 1}`,
  value: Math.random(),
}))

const inputs = [
  {
    type: 'divider',
    name: 'divider',
    orientation: 'left',
    label: 'My main form',
  },
  {
    label: 'First Name',
    name: 'firstName',
    type: 'input',
    defaultValue: 'default value',
    placeholder: 'Egs',
  },
  {
    label: 'Custom Input',
    name: 'customInput',
    type: 'custom',
    CustomRender: ({ name }) => (
      <small>
        Beautiful input
        {' '}
        <strong>{name}</strong>
      </small>
    ),
  },
  {
    label: 'My birthday Name',
    name: 'myBirthday',
    type: 'datepicker',
  },
  {
    label: 'Age',
    name: 'myAge',
    type: 'number',
  },
  {
    label: 'radio example',
    name: 'radio1',
    type: 'radio',
    items: getRandomInputItems(4, 'radio'),
  },

  {
    label: 'sliderone',
    name: 'mySlider',
    type: 'slider',
    min: 1,
    max: 20,
  },
  {
    label: 'email',
    name: 'email',
    type: 'input',
    placeholder: 'test@email.com',
  },
  {
    label: 'Text area',
    name: 'myTextArea',
    type: 'textArea',
    placeholder: 'test@email.com',
  },
  {
    label: 'Tree',
    name: 'myTree',
    type: 'tree',
    items: [
      {
        title: 'parent 1',
        key: '0-0',
        children: [
          {
            title: 'parent 1-0',
            key: '0-0-0',
            children: [
              {
                title: 'leaf',
                key: '0-0-0-0',
                disableCheckbox: true,
              },
              {
                title: 'leaf',
                key: '0-0-0-1',
                children: [
                  {
                    title: 'leaf inner',
                    key: '0-0-0-0-1',
                    disableCheckbox: true,
                  },
                  {
                    title: 'leaffino',
                    key: '0-0-0-1-2',
                  },
                ],
              },
            ],
          },
          {
            title: 'parent 1-1',
            key: '0-0-1',
            children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
          },
        ],
      },
    ],
    placeholder: 'team eglobe',
  },
  {
    label: 'Checkbox input',
    name: 'myCheckbox',
    type: 'checkbox',
    items: getRandomInputItems(4, 'checkbox'),

    condition: ({ watch }) => {
      const myAge = watch('myAge')
      return myAge > 18
    },
  },
  {
    type: 'repeater',
    label: 'Repeater input',
    name: 'myRepeater',

    RenderPreview: ({ watch, name }) => {
      const data = watch(name)
      return (
        <div>
          <div>
            <strong>number:</strong>
            {data?.myNumber}
          </div>
        </div>
      )
    },
    items: [
      {
        type: 'number',
        defaultValue: 2,
        label: 'Choosen number in repeater',
        name: 'myNumber',
      },
      {
        type: 'select',
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
        type: 'repeater',
        label: 'custom repeater inner',
        name: 'myRepeaterInner',
        items: [
          {
            type: 'number',
            label: 'Choosen number in repeater',
            name: 'myNumberInner',
            defaultValue: 4,
          },
          {
            type: 'select',
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
            condition: ({ watch, repeaterName }) => {
              const v = watch(repeaterName)
              return Number(v.myNumberInner) === 666
            },
          },
          {
            type: 'repeater',
            label: 'custom repeater inner',
            name: 'myRepeaterInnerInner',
            items: [
              {
                type: 'number',
                label: 'Choosen number in repeater',
                name: 'myNumberInnerInner',
                defaultValue: 422,
              },
              {
                type: 'select',
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
]

const validationSchema = Yup.object().shape({
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
                    .required('Please, choose a number'),
                ),
              })
              .required('Please, choose a number'),
          ),
        }),
      )
      .required('The repeater has to be fulfilled correctly'),
  }),
})

const initialValues = {
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
}

export default {
  title: 'Form',
  component: Form,
}

export const Default = () => (
  <Form
    layout="horizontal"
    inputs={inputs}
    onSubmit={(values) => console.log({ values })}
  />
)

export const Vertical = () => (
  <Form
    layout="vertical"
    inputs={inputs}
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values) => console.log({ values })}
  />
)

export const Horizontal = () => (
  <Form
    layout="horizontal"
    inputs={inputs}
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values) => console.log({ values })}
  />
)

export const onFormChange = () => {
  const inputsA = [...inputs]
  const inputsB = [{ type: 'TextArea', name: 'myBeautifulTextArea' }, ...inputs]
  const [currentInputs, setCurrentInputs] = useState(inputsA)

  function handleOnChange({ watch }) {
    const over18 = watch('myAge') > 18
    if (over18 && (currentInputs?.length !== inputsA.length)) setCurrentInputs(inputsA)
    if (!over18 && currentInputs?.length !== inputsB.length) setCurrentInputs(inputsB)
  }

  return (
    <Form
      layout="horizontal"
      inputs={currentInputs}
      onChange={handleOnChange}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log({ values })}
    />
  )
}

export const StylingForm = () => (
  <Form
    layout="horizontal"
    inputs={inputs}
    style={{
      submitWrapper: {
        border: '3px dashed black',
        textAlign: 'center',
        padding: '1rem',
      },
      submit: {
        background: 'black',
        color: 'white',
      },
      form: {
        padding: '3rem',
        border: '2px dashed grey',
      },
    }}
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values) => console.log({ values })}
  />
)
