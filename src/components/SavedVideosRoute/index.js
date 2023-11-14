// import {Component} from 'react'
import {Link} from 'react-router-dom'
// import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'

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
  NavListSplElContainer,
  //   BannerPara,
} from './styledComponents'
import ReactContext from '../ReactContext'

// const apiStatusConstants = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   inProgress: 'INPROGRESS',
//   failure: 'FAILURE',
// }

const SavedVideosRoute = () => (
  //   state = {
  //     initialVideos: [],
  //     apiStatus: apiStatusConstants.initial,
  //     // searchInputVal: '',
  //     closeVal: false,
  //   }

  //   componentDidMount() {
  //     this.videosFetch()
  //   }

  //   //   searchInputChange = event => {
  //   //     this.setState({searchInputVal: event.target.value})
  //   //   }

  //   videosFetch = async () => {
  //     this.setState({apiStatus: apiStatusConstants.inProgress})
  //     // const {searchInputVal} = this.state
  //     const jwtToken = Cookies.get('jwt_token')
  //     const url = `https://apis.ccbp.in/videos/trending`
  //     const options = {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${jwtToken}`,
  //       },
  //     }
  //     const response = await fetch(url, options)
  //     if (response.ok) {
  //       const data = await response.json()

  //       this.setState({
  //         apiStatus: apiStatusConstants.success,
  //         initialVideos: data.videos,
  //       })
  //     } else if (response.status === 401) {
  //       this.setState({apiStatus: apiStatusConstants.failure})
  //     }
  //   }

  // const {initialVideos, apiStatus, closeVal} = this.state
  // console.log('inl', initialVideos.length, apiStatus, searchInputVal)
  // console.log(formatDistanceToNow(new Date(2021, 8, 20)))

  <ReactContext.Consumer>
    {value => {
      const {lightTheme, savedVideoList} = value
      console.log('scav', savedVideoList)

      let bannerView = (
        <BannerContainer data-testid="banner">
          <div>
            <AiOutlineBars />
          </div>
          <div>
            <h1>Saved Videos</h1>
          </div>
        </BannerContainer>
      )

      const noVideoView = (
        <FailureViewsAndDateContainer light={lightTheme}>
          <FailureViewProfileImage
            src={
              lightTheme
                ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png'
            }
            alt="no saved videos"
          />
          <FailureViewHeading>No saved videos found</FailureViewHeading>
          <FailureViewPara>
            Save your videos by clicking a button
          </FailureViewPara>
        </FailureViewsAndDateContainer>
      )

      const succesView = savedVideoList.map(each => (
        <Link
          to={`/videos/${each.id}`}
          style={{textDecoration: 'none', padding: '10px'}}
          key={each.id}
        >
          <SuccesViewFullContainer key={each.id}>
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
                <ParaName light={lightTheme}>{each.channel.name}</ParaName>
                <SuccesViewViewsAndDateContainer>
                  <ParaName light={lightTheme}>{each.view_count}views</ParaName>
                  <ParaName light={lightTheme}>
                    .{formatDistanceToNow(new Date(each.published_at))} ago
                  </ParaName>
                </SuccesViewViewsAndDateContainer>
              </SuccesViewProfilaAndTitleContainer>
            </SuccesViewProfilaAndTitleContainer>
          </SuccesViewFullContainer>
        </Link>
      ))

      let resultView = ''
      switch (true) {
        case savedVideoList.length !== 0:
          resultView = succesView
          break

        case savedVideoList.length === 0:
          bannerView = ''
          resultView = noVideoView
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
                  <NavListSplElContainer navContainer light={lightTheme}>
                    {lightTheme ? <AiOutlineBars /> : <AiOutlineBars />}
                    <ParaEl>Saved videos</ParaEl>
                  </NavListSplElContainer>
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

                {resultView}
              </VideoListElContainer>
            </UnOrderVideoListContainer>
          </HomeUnOrderDivContainer>
        </HomeFullContainer>
      )
    }}
  </ReactContext.Consumer>
)

export default SavedVideosRoute
