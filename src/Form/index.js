import React, { useEffect, useMemo, useState } from 'react'
import Space from 'antd/lib/space'
import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import get from 'get-value'
import { UpOutlined, DownOutlined, EditOutlined, ExpandOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons'
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
          <CloseOutlined />
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
  if (type === 'custom') return <CustomRender {...props} />

  const Input = I[type]
  const { repeaterName, condition, switchLabel, ...rest } = props
  return <Input {...rest} />
}

const Repeater = (props) => {
  const { name, items, label, layout } = props
  const { control, errors, watch } = useFormContext()
  const { fields, append, remove, swap } = useFieldArray({ name, control })
  const [previewRepeaters, setPreviewRepeaters] = useState([])

  const { RenderPreview, ...rest } = props
  return (
    <InputGroup label={label} error={errors[name]}>
      {fields.map((field, index) => {
        const previewIndex = previewRepeaters?.findIndex((id) => id === field.id)
        const editMode = previewIndex === -1

        function handleSetEditMode() {
          if (!editMode) {
            setPreviewRepeaters((e) => [...e.slice(0, previewIndex), ...e.slice(previewIndex + 1)])
          }
        }
        function handleSetPreviewMode() {
          setPreviewRepeaters([...previewRepeaters, field.id])
        }

        return (
          <S.Repeater key={field.id} layout={layout}>
            {RenderPreview && !editMode && <RenderPreview name={`${name}[${index}]`} watch={watch} />}
            <S.FormGroupWrapper visible={editMode}>
              {items.map((item) => (
                <FormGroup
                  {...rest}
                  {...item}
                  key={`${field.id}-${item.name}`}
                  repeaterName={`${name}[${index}]`}
                  name={`${name}[${index}].${item.name}`}
                  defaultValue={field[item.name] || item.defaultValue}
                />
              ))}
            </S.FormGroupWrapper>

            <S.HandlerButtonsWrapper>
              <Space>
                {RenderPreview && (
                  <S.RenderPreviewHandlers>
                    <Space>
                      <S.IconWrapper active={editMode} onClick={handleSetEditMode}>
                        <EditOutlined />
                      </S.IconWrapper>
                      <S.IconWrapper active={!editMode} onClick={handleSetPreviewMode}>
                        <ExpandOutlined />
                      </S.IconWrapper>
                    </Space>
                  </S.RenderPreviewHandlers>
                )}
                <S.IconWrapper danger onClick={() => remove(index)}>
                  <DeleteOutlined />
                </S.IconWrapper>
                <S.IconWrapper onClick={() => index > 0 && swap(index, index - 1)}>
                  <UpOutlined />
                </S.IconWrapper>
                <S.IconWrapper onClick={() => index < (fields.length - 1) && swap(index, index + 1)}>
                  <DownOutlined />
                </S.IconWrapper>
              </Space>
            </S.HandlerButtonsWrapper>
          </S.Repeater>
        )
      })}
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
  if (type === 'repeater') return <Repeater {...props} />

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

export default ({ onSubmit, style = {}, onChange, inputs, validationSchema, initialValues, submitLabel = 'Save', layout }) => {
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
      <Form onFinish={methods.handleSubmit(onSubmit)} style={style.form}>
        {inputs.map((i) => <FormGroup {...i} key={i.name} layout={layout} />)}
        <S.SubmitButtonWrapper style={style.submitWrapper}>
          <Button htmlType="submit" type="submit" style={style.submit}>{submitLabel}</Button>
        </S.SubmitButtonWrapper>
      </Form>
    </FormProvider>
  )
}
