import React from 'react'
import Form from './index'

export default {
  title: 'Form',
  component: Form,
}

const inputs = [
  { label:"My first input", name: "input", type:"text" },
  { label:"My first input", name: "input2", type:"text", condition: (e) => e.input !== "marci" },
]

const Template = (args) => <Form inputs={inputs} initialValues={{name: "asd"}} />

export const Default = Template.bind({})
