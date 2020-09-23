import React, { useEffect, useMemo } from 'react'
import { Form, Button } from 'antd'
import { useForm, useFieldArray, Controller, FormProvider, useFormContext } from 'react-hook-form'

import * as I from './Inputs'
import * as S from './styles'

const InputSwitch = (props) => {
  const { name, type } = props
  const { register, unregister } = useFormContext()

  useEffect(() => {
    if (!name) return null
    register({ name })
    return () => unregister(name)
  }, [name, register, unregister])

  switch (type) {
  case 'textarea':
    return <I.TextArea {...props} />
  case 'text':
  case 'password':
  case 'number':
    return <I.Input {...props} />
  case 'simpleLabel':
    return <I.SimpleLabel {...props} />
  case 'divider':
    return <I.Divider {...props} />
  case 'checkbox':
    return <I.CheckboxGroup {...props} />
  case 'radio':
    return <I.RadioGroup {...props} />
  case 'select':
    return <I.Select {...props} />
  case 'cascader':
    return <I.Cascader {...props} />
  case 'tree':
    return <I.Tree {...props} />
  case 'treeSelect':
    return <I.TreeSelect {...props} />
  case 'slider':
    return <I.Slider {...props} />
  case 'date':
    return <I.Datepicker {...props} />
  case 'repeater':
    return <Repeater {...props} />
  case 'custom':
    const CustomRender = props.CustomRender
    return <CustomRender {...props} />
  case 'autocomplete':
    return <I.Autocomplete {...props} />
  default:
    return null
  }
}

const FormGroup = ({ initialValues, watchedValues, watchedRepeaterValues, name, defaultValue = '', condition, ...props }) => {
  const { control } = useFormContext()

  const render = useMemo(() => (!condition || condition(watchedValues, watchedRepeaterValues)), [condition, watchedValues, watchedRepeaterValues])

  if (!render) return null

  return (
    <Controller
      as={<InputSwitch />}
      {...props}
      initialValues={initialValues?.[name]}
      defaultValue={defaultValue}
      control={control}
      name={name}
    />
  )
}

const Repeater = ({ name, items, initialValues, repeatButtonLabel, ...props }) => {
  const { watch, watchedValues } = useFormContext()
  const { fields, append } = useFieldArray({ name })

  return (
    <>
      {
        fields.map((field, index) => {
          const watchedRepeaterValues = watch(`${name}[${index}]`)
          return (
            <S.Repeater>
              {
                items.map((item) => (
                  <FormGroup
                    key={`${name}[${index}].${item.name}`}
                    id={`${name}[${index}].${item.name}`}
                    {...props}
                    {...item}
                    name={`${name}[${index}].${item.name}`}
                    watchedValues={watchedValues}
                    watchedRepeaterValues={watchedRepeaterValues}
                    initialValues={initialValues}
                  />
                ))
              }
            </S.Repeater>
          )
        })
      }
      <S.RepeatButtonWrapper>
        <Button icon="plus" type={null} onClick={() => append({}, true)}>
          {repeatButtonLabel}
        </Button>
      </S.RepeatButtonWrapper>
    </>
  )
}

export default ({ onSubmit, inputs, initialValues = {}, formLayout = {}, submitLabel = 'Save' }) => {
  const methods = useForm({ defaultValues: initialValues, mode: 'onBlur' })
  const { handleSubmit, watch } = methods
  const watchedValues = watch()
  return (
    <FormProvider {...methods}>
      <Form onFinish={handleSubmit(onSubmit)} {...formLayout}>
        { inputs.map((input) => <FormGroup key={input.name} {...input} watchedValues={watchedValues} initialValues={initialValues} />)}
        <S.SubmitButtonWrapper>
          <Button htmlType="submit" type="submit">
            {submitLabel}
          </Button>
        </S.SubmitButtonWrapper>
      </Form>
    </FormProvider>
  )
}
