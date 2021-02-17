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
  transition: .2s all;
  position: relative;

  &:hover {
    border: 1px solid #40a9ff;
  }
`

export const HandlerButtonsWrapper = styled.div`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background: white;
`
export const IconWrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) -2px 0px 8px;
  cursor: pointer;
  span {
    padding: .25rem;
    transition: .2s all ease-in-out;
    border-radius: 2px;
    color: ${(props) => (props.danger ? 'red' : 'inherit')};

    &:hover{
      background: ${(props) => (props.danger ? 'red' : '#40a9ff')};
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
`

export const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  padding: .25rem;
  position: relative;
  
  ${(props) => props.hasError && `
    box-shadow: 0 0 0 2px rgb(255 77 79 / 20%);
  `}

  ${(props) => props.layout === 'horizontal' && `
    display: flex;
  `}
`

export const InputLabel = styled.label`
  display: block; 
  margin-bottom: .5rem;
  font-size: 1rem;
  line-height: 1;
  ${(props) => props.layout === 'horizontal' && `
    display: flex;
    flex-basis: 200px;
  `}
`
export const InputWrapper = styled.div`
  ${(props) => props.layout === 'horizontal' && `

    flex-basis: 100%;
    width: 100%;
  `}
`

export const InputError = styled.div`
  color: red;
  font-size: .75rem;
  margin-top: .25rem;

  svg {
    background: red;
    border-radius: 50%;
    color: white;
    font-size: .75rem;
    padding: .125rem;
    margin-right: .25rem;
  }
`
