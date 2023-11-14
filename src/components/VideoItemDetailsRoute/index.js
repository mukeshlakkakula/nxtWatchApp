import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'

// import React from 'react'
import ReactPlayer from 'react-player'

import {
  AiOutlineHome,
  AiFillHome,
  AiFillFire,
  AiOutlineFire,
  AiOutlineBars,
  AiFillLike,
  AiTwotoneDislike,
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
  SuccessViewSaveLikeBtnEl,
  SuccessViewdisLikeBtnEl,
  SuccessViewLikeBtnEl,
  //   SuccesViewThumbNailImage,
  SuccesViewProfilaAndTitleContainer,
  SuccesViewProfileImage,
  SuccesViewProfileContainer,
  SuccesViewViewsAndDateContainer,
  SuccesViewHr,
  SuccesViewLogoAndSubsciberContainer,
  ParaName,
  SearchInputContainer,
  //   SearchBtnEl,
  FbTwtLnContainer,
  FbTwtLnImg,
  //   BannerContainer,
  //   BannerNxtImg,
  //   BannerBtn,
  FailureViewsAndDateContainer,
  FailureViewHeading,
  FailureViewProfileImage,
  FailureViewPara,
  FailureBtn,
  //   NavListSplElContainer,
  //   BannerPara,
} from './styledComponents'
import ReactContext from '../ReactContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class VideoItemDetailsRoute extends Component {
  state = {
    initialVideos: {},
    apiStatus: apiStatusConstants.initial,
    likeVal: false,
    dislikeVal: false,
    savedLocal: false,
  }

  componentDidMount() {
    this.videosFetch()
    this.onChangedSavedLocalVal()
  }

  onChangeLikeVal = () => {
    const {dislikeVal} = this.state
    if (dislikeVal === true) {
      this.setState(prevState => ({
        dislikeVal: false,
        likeVal: !prevState.likeVal,
      }))
    } else {
      this.setState(prevState => ({likeVal: !prevState.likeVal}))
    }
  }

  onChangedisLikeVal = () => {
    const {likeVal} = this.state
    if (likeVal === true) {
      this.setState(prevState => ({
        likeVal: false,
        dislikeVal: !prevState.dislikeVal,
      }))
    } else {
      this.setState(prevState => ({dislikeVal: !prevState.dislikeVal}))
    }
  }

  onChangedSavedLocalVal = () => {
    this.setState(prevState => ({savedLocal: !prevState.savedLocal}))
  }

  //   closeBanner = () => {
  //     this.setState({closeVal: true})
  //   }

  videosFetch = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    // const {searchInputVal} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      let importantVid = ''
      importantVid = data.video_details
      importantVid.savedVal = false
      this.setState({
        apiStatus: apiStatusConstants.success,
        initialVideos: importantVid,
      })
      //   console.log('g', data)
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    const {
      initialVideos,
      apiStatus,
      likeVal,
      dislikeVal,
      savedLocal,
    } = this.state
    // console.log('inl', initialVideos.length, apiStatus)
    console.log('initialVideos', likeVal, dislikeVal, savedLocal)

    console.log('homw', initialVideos)

    const loadingContainer = (
      <SearchInputContainer
        data-testid="loader"
        className="products-loader-container"
        loading="true"
      >
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </SearchInputContainer>
    )

    // const bannerView = (
    //   <BannerContainer data-testid="banner" close={closeVal}>
    //     <div>
    //       <BannerNxtImg
    //         src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
    //         alt="nxt watch logo"
    //       />
    //       <BannerPara>Buy Nxt Watch Premium</BannerPara>
    //       <BannerBtn type="button">GET IT NOW</BannerBtn>
    //     </div>
    //     <div>
    //       <BannerBtn
    //         type="button"
    //         data-testid="close"
    //         close
    //         onClick={this.closeBanner}
    //       >
    //         <AiOutlineClose />
    //       </BannerBtn>
    //     </div>
    //   </BannerContainer>
    // )

    return (
      <ReactContext.Consumer>
        {value => {
          const {
            lightTheme,
            changeSavedVideo,
            onSavedChange,
            savedVideoList,
            removeCartItem,
          } = value
          const vidId = initialVideos.id

          const addList = () => {
            changeSavedVideo(initialVideos)
          }

          const removeList = () => {
            removeCartItem(vidId)
          }

          const selectVideoVal = () => {
            onSavedChange(vidId)
            this.onChangedSavedLocalVal()

            if (savedLocal) {
              addList()
            } else if (savedLocal === false) {
              removeList()
            }
          }
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
          let channelLogo = ''
          let channelSubscribers = ''
          let nameVal = ''
          let saveReturn = false
          if (savedVideoList !== undefined) {
            savedVideoList.map(each => {
              if (each.id === initialVideos.id) {
                console.log(each.id, initialVideos.id)
                saveReturn = true
                return saveReturn
              }
              return saveReturn
            })
          }

          let publishDate = 'Apr 19, 2019'
          let descriptionVal = ''
          if (initialVideos === undefined) {
            publishDate = 'Apr 19, 2019'
          } else if (initialVideos.channel !== undefined) {
            const {channel} = initialVideos
            const {name} = channel
            channelSubscribers = channel.subscriber_count
            descriptionVal = initialVideos.description
            nameVal = name

            channelLogo = channel.profile_image_url

            publishDate = formatDistanceToNow(
              new Date(initialVideos.published_at),
            )
          }
          console.log('vidoesId', saveReturn, savedVideoList)
          const succesView = (
            <SuccesViewFullContainer key={initialVideos.id}>
              <ReactPlayer url={initialVideos.video_url} width="100%" />

              <SuccesViewProfilaAndTitleContainer>
                <ParaName light={lightTheme}>{initialVideos.title}</ParaName>
                <SuccesViewProfileContainer>
                  <SuccesViewViewsAndDateContainer>
                    <ParaName light={lightTheme}>
                      {initialVideos.view_count}views.
                    </ParaName>
                    <ParaName light={lightTheme}>.{publishDate} ago</ParaName>
                  </SuccesViewViewsAndDateContainer>
                  <SuccesViewProfileContainer>
                    <SuccessViewLikeBtnEl
                      onClick={this.onChangeLikeVal}
                      likeVal={likeVal}
                    >
                      <AiFillLike />
                      Like
                    </SuccessViewLikeBtnEl>
                    <SuccessViewdisLikeBtnEl
                      disLike={dislikeVal}
                      onClick={this.onChangedisLikeVal}
                    >
                      <AiTwotoneDislike />
                      Dislike
                    </SuccessViewdisLikeBtnEl>
                    <SuccessViewSaveLikeBtnEl
                      onClick={selectVideoVal}
                      saved={saveReturn}
                    >
                      <AiOutlineBars />
                      Save
                    </SuccessViewSaveLikeBtnEl>
                  </SuccesViewProfileContainer>
                </SuccesViewProfileContainer>
              </SuccesViewProfilaAndTitleContainer>
              <SuccesViewHr />

              <SuccesViewLogoAndSubsciberContainer>
                <SuccesViewProfileImage
                  src={channelLogo}
                  alt="channel logo"
                  channelogo
                />
                <SuccesViewProfileContainer name>
                  <ParaName light={lightTheme}>
                    {/* {initialVideos.channel.name}. */}
                    {nameVal}
                  </ParaName>
                  <ParaName light={lightTheme}>
                    {/* {initialVideos.channel.name}. */}

                    {channelSubscribers}
                  </ParaName>
                </SuccesViewProfileContainer>
              </SuccesViewLogoAndSubsciberContainer>
              <ParaName light={lightTheme}>{descriptionVal}</ParaName>
            </SuccesViewFullContainer>
          )

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
                      <NavListElContainer navContainer light={lightTheme}>
                        {lightTheme ? <SiYoutubegaming /> : <SiYoutubegaming />}

                        <ParaEl>Gaming</ParaEl>
                      </NavListElContainer>
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
                    {/* {bannerView} */}
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

export default VideoItemDetailsRoute
