import React, { useEffect, useCallback, useMemo } from 'react'
import { Form, Button } from 'antd'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray, Controller, FormProvider, useFormContext } from 'react-hook-form'

import * as I from './Inputs'
import * as S from './styles'

const InputSwitch = (props) => {
  const { type, CustomRender, name } = props
  const { unregister } = useFormContext()

  useEffect(() => () => unregister(name), [name, unregister])

  if (type === 'Custom') return <CustomRender {...props} />
  if (type === 'Repeater') return <Repeater {...props} />
  const Input = I[type]
  return <Input {...props} />
}

const Repeater = (props) => {
  const { name, items, defaultValue } = props
  const { control } = useFormContext()
  const { fields, append, remove, swap } = useFieldArray({ name, control })

  const handleAppend = useCallback(() => {
    append({ defaultValue }, true)
  }, [defaultValue, append])

  return (
    <>
      {fields.map((field, index) => (
        <S.Repeater key={field.id}>
          {items.map((item) => {
            const itemName = item.name

            return (
              <FormGroup
                {...props}
                {...item}
                key={`${field.id}-${item.name}`}
                repeaterName={`${name}[${index}]`}
                name={`${name}[${index}].${itemName}`}
                defaultValue={field[itemName] || item.defaultValue}
              />
            )
          })}

          <Button onClick={() => remove(index)}>remove</Button>
          <Button onClick={() => index > 0 && swap(index, index - 1)}>UP</Button>
          <Button onClick={() => index < fields.length - 1 && swap(index, index + 1)}>DOWN</Button>
        </S.Repeater>
      ))}
      <S.RepeatButtonWrapper>
        <Button onClick={handleAppend}>add</Button>
      </S.RepeatButtonWrapper>
    </>
  )
}

const FormGroup = (props) => {
  const { name, label, defaultValue, condition, repeaterName } = props
  const { control, errors, watch } = useFormContext()

  const render = useMemo(() => !condition || condition({ watch, name, repeaterName }), [condition, watch, name, repeaterName])

  if (!render) return null

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={(a, b) => (
        <Form.Item
          label={label}
          name={name}
          hasFeedback
          validateStatus={errors[name] ? 'error' : ''}
          help={errors[name]?.message || ''}
        >
          <><InputSwitch {...props} {...b} {...a} /></>
        </Form.Item>
      )}
    />
  )
}

export default ({ onSubmit, onChange, inputs, validationSchema = {}, initialValues = {}, formLayout = {}, submitLabel = 'Save' }) => {
  const methods = useForm({
    defaultValues: initialValues,
    mode: 'onBlur',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    resolver: yupResolver(validationSchema),
  })

  useEffect(() => {
    if (onChange && methods) onChange(methods)
  }, [onChange, methods])

  return (
    <FormProvider {...methods}>
      <Form onFinish={methods.handleSubmit(onSubmit)} {...formLayout}>
        {inputs.map((i) => <FormGroup {...i} key={i.name} />)}
        <S.SubmitButtonWrapper>
          <Button htmlType="submit" type="submit">{submitLabel}</Button>
        </S.SubmitButtonWrapper>
      </Form>
    </FormProvider>
  )
}
