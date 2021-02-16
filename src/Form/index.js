import React, { useEffect, useMemo } from 'react'
import { Button, Space } from 'antd'
import { Icon } from '@ant-design/compatible'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray, Controller, FormProvider, useFormContext } from 'react-hook-form'

import * as I from './Inputs'
import * as S from './styles'

const InputSwitch = (props) => {
  const { type, CustomRender, name } = props
  const { unregister } = useFormContext()

  useEffect(() => () => unregister(name), [name, unregister])

  if (type === 'Custom') return <CustomRender {...props} />

  const Input = I[type]
  return <Input {...props} />
}

const Repeater = (props) => {
  const { name, items } = props
  const { control } = useFormContext()

  const { fields, append, remove, swap } = useFieldArray({ name, control })

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
    </>
  )
}

const FormGroup = (props) => {
  const { name, defaultValue, condition, repeaterName, label, type } = props
  const { control, errors, watch } = useFormContext()

  const render = useMemo(() => !condition || condition({ watch, name, repeaterName }), [condition, watch, name, repeaterName])

  if (!render) return null

  if (type === 'Repeater') return <Repeater {...props} />

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue || null}
      render={(a, b) => (
        <S.InputWrapper hasError={errors[name]}>
          <S.InputLabel>{label}</S.InputLabel>
          <InputSwitch {...props} {...b} {...a} />
          {errors[name] && <S.InputError>{errors[name].message || 'Validation error'}</S.InputError>}
        </S.InputWrapper>
      )}
    />
  )
}

export default ({ onSubmit, onChange, inputs, validationSchema, initialValues, submitLabel = 'Save' }) => {
  const methods = useForm({
    mode: 'onBlur',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    ...(initialValues ? { defaultValues: initialValues } : {}),
    ...(validationSchema ? { resolver: yupResolver(validationSchema) } : {}),
  })

  useEffect(() => {
    if (onChange && methods) onChange(methods)
  }, [onChange, methods])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {inputs.map((i) => <FormGroup {...i} key={i.name} />)}
        <S.SubmitButtonWrapper>
          <Button htmlType="submit" type="submit">{submitLabel}</Button>
        </S.SubmitButtonWrapper>
      </form>
    </FormProvider>
  )
}
