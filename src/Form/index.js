import React, { useState, useCallback, useRef, useEffect} from "react";
import { Form, message, Popconfirm, Button } from 'antd'
import { Icon } from '@ant-design/compatible';
import { useForm, useFieldArray, Controller, FormProvider, useFormContext,   } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers';

import * as I from './Inputs'
import * as S from './styles'

const InputSwitch = (props) => {
  const { name, type } = props
  const { register, unregister } = useFormContext();
  useEffect(() => {
    if(!name) return
    register({ name })
    return () => {
      unregister(name)
    }
  }, [name, register, unregister]);


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
      return <I.TreeSelect {...props}  />
    case 'slider':
      return <I.Slider {...props}  />
    case 'date':
      return <I.Datepicker {...props} />
    case 'repeater':
      return <Repeater {...props} />
    case 'custom':
      const CustomRender = props.CustomRender
      return <CustomRender {...props}/>
    case 'autocomplete':
      return <I.Autocomplete {...props}  />
    default:
      return null
  }
}

const Repeater = (props) => {
  const {name, items, repeatButtonLabel} = props
  const { control, watch, watchedValues } = useFormContext()
  const { fields, append, move, remove } = useFieldArray({name})

  return (
    <>
      {
        fields.map((field, outerIndex) => {

          return <S.Repeater>
            {
              items.map((item) => {
                const { condition } = item

                const watchedRepeaterValues = watch(`${name}[${outerIndex}]`)

                if(condition && !condition(watchedRepeaterValues, watchedValues)) return null
          
                return (
                  <Form.Item label={item.label} key={field.id}>
                    <Controller
                      as={<InputSwitch {...item} />}
                      control={control}
                      name={`${name}[${outerIndex}].${item.name}`}
                    />
                  </Form.Item>
                )
              })
            }

            <S.HandlerButtonsWrapper>
              <S.IconWrapper><Icon type="up" onClick={() => move(outerIndex, outerIndex-1)} /></S.IconWrapper>
              <S.IconWrapper><Icon type="down" onClick={() => move(outerIndex, outerIndex+1)} /></S.IconWrapper>
              <S.IconWrapper danger>
                <Popconfirm
                  title="Are you sure delete this repeated element?"
                  onConfirm={() => remove(outerIndex)}
                  onCancel={null}
                  okText="Yes"
                  cancelText="No"
                >
                  <Icon type="delete" />
                </Popconfirm>
              </S.IconWrapper>
            </S.HandlerButtonsWrapper>
            </S.Repeater>
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



export default ({ onSubmit, inputs, validationSchema, initialValues = {}, formLayout = {}, submit = { label: "Save"}}) => {

  const methods = useForm({ ...(validationSchema ? { resolver: yupResolver(validationSchema)} : {}), defaultValues: initialValues, mode:"onBlur"})
  const { handleSubmit, control, errors, isSubmitting, watch } = methods
  const watchedValues = watch()

  return (
    <FormProvider {...methods} watchedValues={watchedValues}> 
      <Form onFinish={handleSubmit(onSubmit)} {...formLayout}>
        {
          inputs.map(input => {
            const { hidden, label, name, condition } = input

            if(condition && !condition(watchedValues)) return null

            return (
              <S.FormGroup hidden={hidden}>
                <Form.Item
                  label={label}
                  validateStatus={errors?.[name] && 'error'}
                  help={errors?.[name]?.message}
                  hasFeedback
                  required={validationSchema?.fields?.[name]}
                >
                  <Controller 
                    as={<InputSwitch />}
                    control={control}
                    initialValues={initialValues?.[name]}
                    {...input}
                  />
                </Form.Item>
              </S.FormGroup>
            )
          })
        }

        {submit.label && (
          <S.SubmitButtonWrapper submitButtonWrapperStyle={submit.style}>
            <Button
              htmlType="submit"
              type="submit"
              icon={submit.icon}
              loading={!!isSubmitting}
              disabled={!!isSubmitting}
              iconPosition="right"
            >
              {submit.label}
            </Button>
          </S.SubmitButtonWrapper>
        )}
      </Form>
    </FormProvider>
  );
};