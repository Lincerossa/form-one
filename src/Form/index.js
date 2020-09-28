import React, { useEffect, useMemo } from 'react'
import { Form, Button } from 'antd'
import { yupResolver } from '@hookform/resolvers'
import { useForm, useFieldArray, Controller, FormProvider, useFormContext } from 'react-hook-form'

import * as I from './Inputs'
import * as S from './styles'

const InputSwitch = React.memo((props) => {
  const { name, type, CustomRender } = props
  const { register, unregister } = useFormContext()

  useEffect(() => {
    if (!name) return null
    register({ name })
    return () => unregister(name)
  }, [name, register, unregister])

  if (type === 'custom') return <CustomRender {...props} />
  if (type === 'repeater') return <Repeater {...props} />
  const Input = I[type]
  return <Input {...props} />
})

const Repeater = React.memo(({ name, items, initialValues, repeatButtonLabel, ...props }) => {
  const { errors, control } = useFormContext()
  const { fields, append } = useFieldArray({ name, control })

  return (
    <>
      {
        fields.map((field, index) => (
          <S.Repeater key={field.name}>
            {
              items.map((item) => (
                <FormGroup
                  {...props}
                  {...item}
                  repeaterName={`${name}.${index}`}
                  key={`${name}.${item.name}`}
                  error={errors?.[name]?.[index]?.[item.name]}
                  name={`${name}.${index}.${item.name}`}
                />
              ))
            }
          </S.Repeater>
        ))
      }
      <S.RepeatButtonWrapper>
        <Button icon="plus" type={null} onClick={() => append({}, true)}>
          {repeatButtonLabel}
        </Button>
      </S.RepeatButtonWrapper>
    </>
  )
})

const FormGroup = React.memo(({ label, name, condition, error, defaultValue, repeaterName, ...props }) => {
  const { control, getValues, setValue, watch } = useFormContext()
  const currentValue = useMemo(() => getValues(name), [getValues, name])

  useEffect(() => {
    if (defaultValue && !currentValue) {
      setValue(name, defaultValue)
    }
  }, [currentValue, name, defaultValue, setValue])

  const render = useMemo(() => (!condition || condition({ watch, name, repeaterName })), [condition, watch, name, repeaterName])

  if (!render) return null

  return (
    <Form.Item
      label={label}
      name={name}
      hasFeedback
      validateStatus={error ? 'error' : ''}
      help={error?.message || ''}
    >
      <Controller
        as={<InputSwitch />}
        {...props}
        {...(currentValue ? {} : { defaultValue })}
        control={control}
        name={name}
      />
    </Form.Item>
  )
})

export default ({ onSubmit, inputs, validationSchema = {}, initialValues = {}, formLayout = {}, submitLabel = 'Save' }) => {
  const methods = useForm({ defaultValues: initialValues, mode: 'onBlur', resolver: yupResolver(validationSchema) })
  const { handleSubmit, errors } = methods
  return (
    <FormProvider {...methods}>
      <Form onFinish={handleSubmit(onSubmit)} {...formLayout}>
        { inputs.map((input) => <FormGroup key={input.name} {...input} error={errors[input.name]} />)}
        <S.SubmitButtonWrapper>
          <Button htmlType="submit" type="submit">
            {submitLabel}
          </Button>
        </S.SubmitButtonWrapper>
      </Form>
    </FormProvider>
  )
}
