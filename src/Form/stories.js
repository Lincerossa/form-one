import React from 'react'
import * as yup from 'yup'
import Form from './index'

export default {
  title: 'Form',
  component: Form,
}

const inputs = [
  { label: 'field 1', defaultValue: 'default 1', name: 'field1', type: 'text' },
  { label: 'field 2', name: 'field2', defaultValue: 'default 2', type: 'text', condition: ({ watch }) => watch("field1") !== 'marci' },
  { label: 'field 3', name: 'field3', type: 'repeater', items: [
    { label: 'field 4', name: 'field4', type: 'text' },
    { label: 'field 5', name: 'field5', defaultValue: 'default 5', type: 'text', condition: ({watch, name, repeaterName}) => watch(repeaterName)?.field4 !== 'marci' },
    { label: 'field 6', name: 'field6', type: 'repeater', items: [
      { label: 'field 7', name: 'field7', defaultValue: 'default 7 inner', type: 'text'},
      { label: 'field 8', name: 'field8', type: 'text', condition: ({watch, name, repeaterName}) => watch(repeaterName)?.field7 !== 'marci' },
    ]}
  ] },
  { label: 'field1 3', name: 'field13', type: 'repeater', items: [
    { label: 'field1 4', name: 'field14', type: 'text' },
    { label: 'field1 5', name: 'field15', defaultValue: 'default 5', type: 'text' },
    { label: 'field1 6', name: 'field16', type: 'repeater', items: [
      { label: 'field1 7', name: 'field17', defaultValue: 'default 7 inner', type: 'text'},
      { label: 'field1 8', name: 'field18', type: 'text' },
    ]}
  ] },
]

const initialValues = {
  field2: 'initialipsum',
  field3: [
    {
      field4: 'initialipsum repeater',
    },
    {
      field4: 'initial dolor repeater',
      field5: 'initial sit repeater',
    },
  ],
}

const validationSchema = yup.object().shape({
  field1: yup.string().required(),
  field2: yup.string().required(),
  field3: yup.array()
    .of(
      yup.object().shape({
        field4: yup.string().required(),
        field5: yup.string().required(),
      }),
    )
    .required('Required'),
})

const Template = () => <Form inputs={inputs} validationSchema={validationSchema} initialValues={initialValues} onSubmit={(e) => console.log({e})} />

export const Default = Template.bind({})
