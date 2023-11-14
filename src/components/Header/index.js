import {Link, withRouter} from 'react-router-dom'

import {HeaderContainer, ImageE1, DivE1, BtnE1} from './styledComponents'
import ReactContext from '../ReactContext'

const Header = () => (
  <ReactContext.Consumer>
    {value => {
      const {lightTheme, changeTheme} = value
      const onChangeTheme = () => {
        changeTheme()
      }

      return (
        <HeaderContainer light={lightTheme}>
          <Link to="/">
            <ImageE1
              src={
                lightTheme
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
              }
              alt="website logo"
            />
          </Link>
          <DivE1>
            <BtnE1
              dark
              type="button"
              data-testid="theme"
              onClick={onChangeTheme}
              light={lightTheme}
            >
              <ImageE1
                profile="true"
                src={
                  lightTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/light-theme-img.png'
                }
                alt="website logo"
              />
            </BtnE1>
            <ImageE1
              profile="true"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
              alt="profile"
            />
            <BtnE1 type="button" light={lightTheme}>
              Logout
            </BtnE1>
          </DivE1>
        </HeaderContainer>
      )
    }}
  </ReactContext.Consumer>
)

export default withRouter(Header)
