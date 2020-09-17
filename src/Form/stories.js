import React from 'react'
import Form from './index'

export default {
  title: 'Form',
  component: Form,
}

const Template = (args) => <Form inputs={[{ label:"My first input", name: "input", type:"text" }]} initialValues={{}} />

export const Default = Template.bind({})
