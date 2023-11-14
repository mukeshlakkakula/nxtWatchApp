import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {
  FullLoginContainer,
  FormContainer,
  ImgLogo,
  ErrorInput,
  SubmitBtn,
  InputContainer,
  InputE1,
  InputDiv,
} from './styledComponents'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    checkVal: false,
    showSubmitError: false,
    errorMsg: '',
  }

  checkBoxChange = () => {
    this.setState(prevState => ({checkVal: !prevState.checkVal}))
  }

  changeUserName = event => {
    this.setState({username: event.target.value})
  }

  changeUserPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, checkVal, showSubmitError, errorMsg} = this.state
    console.log(username, password, checkVal)
    let typePass = 'password'
    if (checkVal) {
      typePass = 'text'
    }
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <FullLoginContainer>
        <FormContainer onSubmit={this.onSubmitForm}>
          <InputDiv logo>
            <ImgLogo
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
            />
          </InputDiv>
          <InputContainer className="inputContainer">
            <label htmlFor="username">USERNAME</label>
            <InputE1
              id="username"
              placeholder="Username"
              type="text"
              value={username}
              onChange={this.changeUserName}
            />
          </InputContainer>
          <InputContainer className="inputContainer">
            <label htmlFor="password">PASSWORD</label>
            <InputE1
              id="password"
              placeholder="Password"
              type={typePass}
              value={password}
              onChange={this.changeUserPassword}
            />
          </InputContainer>
          <InputDiv>
            <InputE1
              id="checkbox"
              type="checkbox"
              onChange={this.checkBoxChange}
            />
            <label htmlFor="checkbox">SHOW PASSWORD</label>
          </InputDiv>

          <SubmitBtn type="submit" className="submitBtn">
            Login
          </SubmitBtn>
          {showSubmitError ? (
            <ErrorInput className="errorInput">*{errorMsg}</ErrorInput>
          ) : (
            ''
          )}
        </FormContainer>
      </FullLoginContainer>
    )
  }
}

export default LoginRoute
