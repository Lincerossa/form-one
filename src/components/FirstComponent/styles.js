import styled from 'styled-components'

export const FirstComponet = styled.div`
  font-size: 2rem;
  color: white;
  padding: 1rem;
  text-align: center;
  font-family: sans-serif;
  background-color: ${props => props.theme.colors.primary};
`
