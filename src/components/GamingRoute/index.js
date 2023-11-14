import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import {
  AiOutlineHome,
  AiFillHome,
  AiFillFire,
  AiOutlineFire,
  AiOutlineBars,
  //   AiOutlineClose,
} from 'react-icons/ai'

import {SiYoutubegaming} from 'react-icons/si'

import Header from '../Header'
import {
  HomeFullContainer,
  HomeUnOrderDivContainer,
  UnOrderNavListContainer,
  VideoListElContainer,
  NavListElContainer,
  UnOrderVideoListContainer,
  ParaEl,
  //   SearchInputEl,
  SuccesViewFullContainer,
  SuccesViewThumbNailImage,
  SuccesViewProfilaAndTitleContainer,
  //   SuccesViewProfileImage,
  //   SuccesViewProfileContainer,
  SuccesViewViewsAndDateContainer,
  ParaName,
  SearchInputContainer,
  //   SearchBtnEl,
  FbTwtLnContainer,
  FbTwtLnImg,
  BannerContainer,
  //   BannerNxtImg,
  //   BannerBtn,
  FailureViewsAndDateContainer,
  FailureViewHeading,
  FailureViewProfileImage,
  FailureViewPara,
  FailureBtn,
  NavListSplElContainer,
  //   BannerPara,
} from './styledComponents'
import ReactContext from '../ReactContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class GamingRoute extends Component {
  state = {
    initialVideos: [],
    apiStatus: apiStatusConstants.initial,
    searchInputVal: '',
    closeVal: false,
  }

  componentDidMount() {
    this.videosFetch()
  }

  inputSearchFun = () => {
    this.videosFetch()
  }

  closeBanner = () => {
    this.setState({closeVal: true})
  }

  searchInputChange = event => {
    this.setState({searchInputVal: event.target.value})
  }

  videosFetch = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    // const {searchInputVal} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/gaming`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      this.setState({
        apiStatus: apiStatusConstants.success,
        initialVideos: data.videos,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    const {initialVideos, apiStatus, searchInputVal, closeVal} = this.state
    console.log('inl', initialVideos.length, apiStatus, searchInputVal)
    console.log(formatDistanceToNow(new Date(2021, 8, 20)))

    const loadingContainer = (
      <SearchInputContainer
        data-testid="loader"
        className="products-loader-container"
        loading="true"
      >
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </SearchInputContainer>
    )

    const bannerView = (
      <BannerContainer data-testid="banner" close={closeVal}>
        <div>
          <SiYoutubegaming />
        </div>
        <div>
          <h1>Gaming</h1>
        </div>
      </BannerContainer>
    )

    return (
      <ReactContext.Consumer>
        {value => {
          const {lightTheme} = value

          const failureView = (
            <FailureViewsAndDateContainer light={lightTheme}>
              <FailureViewProfileImage
                src={
                  lightTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                }
                alt="failure view"
              />
              <FailureViewHeading>
                Oops! Something Went Wrong
              </FailureViewHeading>
              <FailureViewPara>
                We are having some trouble to complete your request. Please try
                again
              </FailureViewPara>
              <FailureBtn type="button" onClick={this.inputSearchFun}>
                Retry
              </FailureBtn>
            </FailureViewsAndDateContainer>
          )
          const succesView = initialVideos.map(each => (
            <SuccesViewFullContainer key={each.id}>
              <Link
                to={`/videos/${each.id}`}
                style={{textDecoration: 'none'}}
                key={each.id}
              >
                <SuccesViewThumbNailImage
                  src={each.thumbnail_url}
                  alt="video thumbnail"
                />
                <SuccesViewProfilaAndTitleContainer>
                  {/* <SuccesViewProfileContainer>
                    <SuccesViewProfileImage
                      src={each.channel.profile_image_url}
                      alt="channel logo"
                    />
                  </SuccesViewProfileContainer> */}
                  <SuccesViewProfilaAndTitleContainer divId>
                    <ParaName light={lightTheme}>{each.title}</ParaName>
                    {/* <ParaName light={lightTheme}>{each.channel.name}</ParaName> */}
                    <SuccesViewViewsAndDateContainer>
                      <ParaName light={lightTheme}>
                        {each.view_count}views Watching Worldwide
                      </ParaName>
                      {/* <ParaName light={lightTheme}>
                        .{formatDistanceToNow(new Date(each.published_at))} ago
                      </ParaName> */}
                    </SuccesViewViewsAndDateContainer>
                  </SuccesViewProfilaAndTitleContainer>
                </SuccesViewProfilaAndTitleContainer>
              </Link>
            </SuccesViewFullContainer>
          ))

          let noVideoView = ''
          if (
            initialVideos.length === 0 &&
            apiStatus === apiStatusConstants.success
          ) {
            noVideoView = (
              <FailureViewsAndDateContainer light={lightTheme}>
                <FailureViewProfileImage
                  src={
                    lightTheme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png'
                  }
                  alt="no videos"
                />
                <FailureViewHeading>No Search results found</FailureViewHeading>
                <FailureViewPara>
                  Try different key words or remove search filter
                </FailureViewPara>
                <FailureBtn type="button" onClick={this.inputSearchFun}>
                  Retry
                </FailureBtn>
              </FailureViewsAndDateContainer>
            )
          }

          let resultView = ''
          switch (apiStatus) {
            case apiStatusConstants.success:
              resultView = succesView
              break

            case apiStatusConstants.inProgress:
              resultView = loadingContainer
              break
            case apiStatusConstants.failure:
              resultView = failureView
              break
            default:
              resultView = null
          }

          return (
            <HomeFullContainer data-testid="home" light={lightTheme}>
              <Header />
              <HomeUnOrderDivContainer>
                <UnOrderNavListContainer navContainer light={lightTheme}>
                  <div>
                    <Link to="/" style={{textDecoration: 'none'}}>
                      <NavListElContainer navContainer light={lightTheme}>
                        {lightTheme ? <AiFillHome /> : <AiOutlineHome />}

                        <ParaEl>Home</ParaEl>
                      </NavListElContainer>
                    </Link>
                    <Link to="/trending" style={{textDecoration: 'none'}}>
                      <NavListElContainer navContainer light={lightTheme}>
                        {lightTheme ? <AiFillFire /> : <AiOutlineFire />}
                        <ParaEl>Trending</ParaEl>
                      </NavListElContainer>
                    </Link>
                    <Link to="/gaming" style={{textDecoration: 'none'}}>
                      <NavListSplElContainer navContainer light={lightTheme}>
                        {lightTheme ? <SiYoutubegaming /> : <SiYoutubegaming />}

                        <ParaEl>Gaming</ParaEl>
                      </NavListSplElContainer>
                    </Link>
                    <Link to="/saved-videos" style={{textDecoration: 'none'}}>
                      <NavListElContainer navContainer light={lightTheme}>
                        {lightTheme ? <AiOutlineBars /> : <AiOutlineBars />}
                        <ParaEl>Saved videos</ParaEl>
                      </NavListElContainer>
                    </Link>
                  </div>
                  <FbTwtLnContainer columnSide>
                    <p>CONTACT US</p>
                    <FbTwtLnContainer>
                      <FbTwtLnImg
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                        alt="facebook logo"
                      />
                      <FbTwtLnImg
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                        alt="twitter logo"
                      />
                      <FbTwtLnImg
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                        alt="linked in logo"
                      />
                    </FbTwtLnContainer>
                    <p>Enjoy! Now to see your channels and recommendations!</p>
                  </FbTwtLnContainer>
                </UnOrderNavListContainer>

                <UnOrderVideoListContainer light={lightTheme}>
                  <VideoListElContainer light={lightTheme}>
                    {bannerView}
                    {/* <SearchInputContainer search>
                      <SearchInputEl
                        placeholder="Search"
                        type="search"
                        value={searchInputVal}
                        onChange={this.searchInputChange}
                      />
                      <SearchBtnEl
                        type="button"
                        onClick={this.inputSearchFun}
                        data-testid="searchButton"
                      >
                        search
                      </SearchBtnEl>
                    </SearchInputContainer> */}
                    {noVideoView}
                    {resultView}
                  </VideoListElContainer>
                </UnOrderVideoListContainer>
              </HomeUnOrderDivContainer>
            </HomeFullContainer>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}

export default GamingRoute
