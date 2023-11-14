import styled from 'styled-components'

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 1px 2px 2px;
  padding: 20px;
  border-radius: 10px;
  min-height: 60vh;
`

export const FullLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`
export const ImgLogo = styled.img`
  width: 50%;
`

export const ErrorInput = styled.p`
  color: #ff0000;
`

export const SubmitBtn = styled.button`
  width: 80%;
  padding: 10px;
  border-radius: 10px;
  background-color: #3b82f6;
  font-weight: bold;
  color: #ffffff;
  border-style: none;
  outline: none;
  margin: 2px;
`

export const InputE1 = styled.input`
  height: 40px;
`

export const InputDiv = styled.div`
  display: flex;
  justify-content: ${props => (props.logo ? 'center' : 'flex - start')};
  align-items: center;
  width: 100%;
`
export const InputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`
