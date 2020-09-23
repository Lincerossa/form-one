import React, { useEffect, useMemo } from 'react'
import { Form, Button } from 'antd'
import { yupResolver } from '@hookform/resolvers'
import { useForm, useFieldArray, Controller, FormProvider, useFormContext } from 'react-hook-form'

import * as I from './Inputs'
import * as S from './styles'

const InputSwitch = (props) => {
  const { name, type, CustomRender } = props
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
    return <CustomRender {...props} />
  case 'autocomplete':
    return <I.Autocomplete {...props} />
  default:
    return null
  }
}

const Repeater = ({ name, items, initialValues, repeatButtonLabel, ...props }) => {
  const { watch, watchedValues, errors, control } = useFormContext()
  const { fields, append } = useFieldArray({ name, control })


  return (
    <>
      {
        fields.map((field, index) => {
          const watchedRepeaterValues = watch(`${name}.${index}`)
          return (
            <S.Repeater>
              {
                items.map((item) => (
                  <FormGroup
                    {...props}
                    {...item}
                    key={`${name}.${index}.${item.name}`}  
                    error={errors?.[name]?.[index]?.[item.name]}
                    name={`${name}.${index}.${item.name}`}
                    watchedValues={watchedValues}
                    watchedRepeaterValues={watchedRepeaterValues}
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

const FormGroup = ({ label, watchedValues, watchedRepeaterValues, name, condition, error, defaultValue, ...props }) => {
  const { control } = useFormContext()

  const render = useMemo(() => (!condition || condition(watchedValues, watchedRepeaterValues)), [condition, watchedValues, watchedRepeaterValues])

  if (!render) return null

  return (
    <>
      <Controller
        as={<InputSwitch />}
        {...props}
        {...(watchedValues?.[name] ? {} : { defaultValue })}
        control={control}
        name={name}
      />
      {error && error.message}
    </>
  )
}

export default ({ onSubmit, inputs, validationSchema = {}, initialValues = {}, formLayout = {}, submitLabel = 'Save' }) => {
  const methods = useForm({ defaultValues: initialValues, mode: 'onBlur', resolver: yupResolver(validationSchema) })
  const { handleSubmit, watch, errors } = methods
  const watchedValues = watch()

  return (
    <FormProvider {...methods}>
      <Form onFinish={handleSubmit(onSubmit)} {...formLayout}>
        { inputs.map((input) => <FormGroup key={input.name} {...input} watchedValues={watchedValues} error={errors[input.name]} />)}
        <S.SubmitButtonWrapper>
          <Button htmlType="submit" type="submit">
            {submitLabel}
          </Button>
        </S.SubmitButtonWrapper>
      </Form>
    </FormProvider>
  )
}
