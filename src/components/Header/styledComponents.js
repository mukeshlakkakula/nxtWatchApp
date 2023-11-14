import styled from 'styled-components'

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;

  justify-content: space-between;
  align-items: center;

  background-color: ${props => (props.light ? '#ffffff' : '#0f0f0f')};
`
export const ImageE1 = styled.img`
  width: ${props => (props.profile ? '50px' : '120px')};
  margin: 10px;
`
export const BtnE1 = styled.button`
  margin: 10px;
  padding: 10px;
  border-style: ${props => (props.dark ? 'none' : 'solid')};
  background-color: transparent;
  border-color: ${props => (props.light ? '#3b82f6' : '#ffffff')};
  color: ${props => (props.light ? '#3b82f6' : '#ffffff')};
  border-radius: 5px;
`
export const DivE1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
