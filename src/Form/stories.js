import React from 'react'
import * as yup from 'yup'
import Form from './index'

export default {
  title: 'Form',
  component: Form,
}

const inputs = [
  { label: 'field 1', name: 'field1', type: 'text' },
  { label: 'field 2', name: 'field2', defaultValue: 'default value', type: 'text', condition: (e) => console.log(e) || e.field1 !== 'marci' },
  { label: 'field 3', name: 'field3', type: 'repeater', items: [
    { label: 'field 4', name: 'field4', type: 'text' },
    { label: 'field 5', name: 'field5', type: 'text', condition: (e, c) => c?.field4 !== 'marci' },
    { label: 'field 6', name: 'field6', type: 'repeater', items: [
      { label: 'field 7', name: 'field7', type: 'text'},
      { label: 'field 8', name: 'field8', type: 'text', condition: (e, c) => c?.field7 !== 'marci' },
    ]}
  ] },
]

const initialValues = {
  field1: 'lorem',
  field2: 'lorem init',
  field3: [
    {
      field4: 'ipsum',
    },
    {
      field4: 'dolor',
      field5: 'sit',
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
