import React, { useEffect, useMemo } from 'react'
import { Button, Space, Form } from 'antd'
import get from 'get-value'
import { Icon } from '@ant-design/compatible'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray, Controller, FormProvider, useFormContext } from 'react-hook-form'

import * as I from './Inputs'
import * as S from './styles'

const InputGroup = ({ label, error, children, layout }) => (
  <S.InputGroup hasError={error} layout={layout}>
    <S.InputLabel layout={layout}>{label}</S.InputLabel>
    <S.InputWrapper layout={layout}>
      {children}
      {error && (
        <S.InputError>
          <Icon type="close" />
          {error.message || 'error'}
        </S.InputError>
      )}
    </S.InputWrapper>
  </S.InputGroup>
)

const InputSwitch = (props) => {
  const { type, CustomRender, name } = props
  const { unregister } = useFormContext()
  useEffect(() => () => unregister(name), [name, unregister])
  if (type === 'Custom') return <CustomRender {...props} />

  const Input = I[type]
  return <Input {...props} />
}

const Repeater = (props) => {
  const { name, items, label } = props
  const { control, errors } = useFormContext()
  const { fields, append, remove, swap } = useFieldArray({ name, control })

  return (
    <InputGroup label={label} error={errors[name]}>
      {fields.map((field, index) => (
        <S.Repeater key={field.id}>
          {items.map((item) => (
            <FormGroup
              {...props}
              {...item}
              key={`${field.id}-${item.name}`}
              repeaterName={`${name}[${index}]`}
              name={`${name}[${index}].${item.name}`}
              defaultValue={field[item.name] || item.defaultValue}
            />
          ))}
          <S.HandlerButtonsWrapper>
            <Space>
              <S.IconWrapper danger onClick={() => remove(index)}>
                <Icon type="delete" />
              </S.IconWrapper>
              <S.IconWrapper onClick={() => index > 0 && swap(index, index - 1)}>
                <Icon type="up" />
              </S.IconWrapper>
              <S.IconWrapper onClick={() => index < (fields.length - 1) && swap(index, index + 1)}>
                <Icon type="down" />
              </S.IconWrapper>
            </Space>
          </S.HandlerButtonsWrapper>
        </S.Repeater>
      ))}
      <S.RepeatButtonWrapper>
        <Button onClick={() => append({})}>add</Button>
      </S.RepeatButtonWrapper>
    </InputGroup>
  )
}

const FormGroup = (props) => {
  const { name, defaultValue, condition, repeaterName, label, type, layout } = props
  const { control, errors, watch } = useFormContext()
  const renderable = useMemo(() => !condition || condition({ watch, name, repeaterName }), [condition, watch, name, repeaterName])
  const error = get(errors, name.replaceAll('[', '.').replaceAll('].', '.'))

  if (!renderable) return null
  if (type === 'Repeater') return <Repeater {...props} />

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue || null}
      render={(a, b) => (
        <InputGroup label={label} error={error} layout={layout}>
          <InputSwitch {...props} {...b} {...a} />
        </InputGroup>
      )}
    />
  )
}

export default ({ onSubmit, onChange, inputs, validationSchema, initialValues, submitLabel = 'Save', layout }) => {
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    ...(initialValues ? { defaultValues: initialValues } : {}),
    ...(validationSchema ? { resolver: yupResolver(validationSchema) } : {}),
  })

  useEffect(() => {
    if (onChange && methods) onChange(methods)
  }, [onChange, methods])

  return (
    <FormProvider {...methods}>
      <Form onFinish={methods.handleSubmit(onSubmit)}>
        {inputs.map((i) => <FormGroup {...i} key={i.name} layout={layout} />)}
        <S.SubmitButtonWrapper>
          <Button htmlType="submit" type="submit">{submitLabel}</Button>
        </S.SubmitButtonWrapper>
      </Form>
    </FormProvider>
  )
}
