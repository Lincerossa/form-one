import styled from 'styled-components'



export const Form = styled.div`
  .ant-form-item-children,
  .ant-legacy-form-item-children {
    display: block;
  }

  .ant-form-item,
  .ant-legacy-form-item {
    width: 100%;
    margin-bottom: .5rem;
  }
`


export const FormGroup = styled.div`
  width: 100%;
  ${(props) => props.hidden
    && `
    display: none;
  `};
  ${(props) => props.hasError
    && `
    .ant-collapse{
      border: 1px solid red;
  `};
  ${(props) => props.hasSuccess
    && `
    .ant-collapse{
      border: 1px solid green;
  `};
  ${(props) => props.hasMargin
    && `
    
    margin-bottom: 2rem;
  `};

  .ant-form-item{
    margin-bottom: .5rem;
    width: 100%;
  }

  .ant-collapse {
    margin-top: .25rem;
  }
  .ant-collapse-header {
    min-height: 30px;
    padding-top: .25rem !important;
    padding-bottom: .25rem !important;
  }

`

export const Repeater = styled.div`
  border: 1px solid #d9d9d9;
  padding: 1rem;
  margin-bottom: 0.5rem;
  position: relative;
`

export const HandlerButtonsWrapper = styled.div`
  position: absolute;
  display: grid;
  top: 0;
  right: 0;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: .25rem;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.1) -2px 0px 8px;
`
export const IconWrapper = styled.div`
  span {
    padding: .25rem;
    transition: .2s all ease-in-out;
    border-radius: 2px;

    color: ${(props) => (props.danger ? props.theme.colors.red.main : 'inherit')};

    &:hover{
      background: ${(props) => (props.danger ? props.theme.colors.red.main : props.theme.colors.blue.main)};
      color: white;
    }
  }
`

export const RepeatButtonWrapper = styled.div`
  text-align: center;
`
export const SubmitButtonWrapper = styled.div`
  text-align: right;
  margin-top: 1rem;
  ${props => props.submitButtonWrapperStyle && {
    ...props.submitButtonWrapperStyle
  } }
`
