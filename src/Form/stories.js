import React from 'react'
import Form from './index'

export default {
  title: 'Form',
  component: Form,
}

const inputs = [
  { label:"field 1", name: "field1", type:"text", marci: true},
  { label:"field 2", defaultValue: "maeas", name: "field2", type:"text", condition: (e) => e.field1 !== "marci" },
  { label:"field 3", name: "field3", type:"repeater", items: [
    { label:"field 1", name: "field", type:"text", marci: true},
    { label:"field 2", name: "field2", type:"text", condition: (e,c) => c?.field !== "marci" },
    { label:"field 3", name: "field3", type:"repeater", items: [
      { label:"field 1", defaultValue: "maeas", name: "field", type:"text", marci: true},
      { label:"field 2", name: "field2", type:"text", condition: (e,c) => c?.field !== "marci" },
      
    ]}
  ] },
]

const initialValues = {
  field1: "first",
  field2: "second",
  field3 : [{
    field: "inner repeater one"
  }]
}

const Template = (args) => <Form inputs={inputs} initialValues={initialValues} onSubmit={e => console.log({e})} />

export const Default = Template.bind({})
