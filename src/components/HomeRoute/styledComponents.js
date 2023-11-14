import styled from 'styled-components'

export const HomeFullContainer = styled.div`
  margin: 0px;
  min-height: 100vh;
  background-color: ${props => (props.light ? '#ffffff' : ' #000000')};
`

export const HomeUnOrderDivContainer = styled.div`
  display: flex;
  width: 100%;
`

export const UnOrderNavListContainer = styled.ul`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;

  height: 90vh;
  color: ${props =>
    props.navContainer && props.light ? '#231f20' : '#ffffff'};
  background-color: ${props =>
    props.navContainer && props.light ? '#ffffff' : ' #231f20'};
  margin: 0px;
`

export const NavListElContainer = styled.li`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  margin: 10px;

  text-decoration: none;
  color: ${props =>
    props.navContainer && props.light ? '#231f20' : '#ffffff'};
  font-weight: bold;
`
export const NavListSplElContainer = styled.li`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  margin: 10px;
  background-color: ${props => (props.light ? '#f4f4f4' : '#f4f4f4')};

  text-decoration: none;
  color: #000000;
  font-weight: bold;
`

export const ParaEl = styled.p`
  text-decoration: none;
  text-decoration-color: #ffffff;
  font-weight: bold;
`

export const FbTwtLnContainer = styled.div`
  display: flex;
  flex-direction: ${props => (props.columnSide ? 'column' : ' row')};
  justify-content: space-around;
  align-items: center;
`

export const BannerContainer = styled.div`
  display: ${props => (props.close ? 'none' : 'flex')};
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  min-height: 20vh;
  background-size: cover;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  align-items: flex-start;
`

export const BannerNxtImg = styled.img`
  width: 120px;
  padding: 10px;
`

export const BannerPara = styled.p`
  font-size: 25px;
  color: #000000;
`

export const BannerBtn = styled.button`
  border-style: ${props => (props.close ? 'none' : 'solid')};
  background-color: transparent;
  padding: 10px;
`
export const FbTwtLnImg = styled.img`
  width: 60px;
  padding: 10px;
`

export const UnOrderVideoListContainer = styled.ul`
  width: 80%;
  text-decoration: none;
  overflow: auto;
  height: 90vh;
  background-color: ${props => (props.light ? '#ffffff' : ' #000000')};
  margin: 0px;
`

export const VideoListElContainer = styled.div`
  background-color: ${props => (props.light ? ' #f1f1f1' : ' #000000')};
  color: ${props => (props.light ? '#231f20' : '#ffffff')};
  display: flex;
  min-height: 100vh;
  flex-wrap: wrap;
  flex-grow: 1;
`

export const SearchInputContainer = styled.div`
  width: 100%;
  display: ${props => (props.loading ? 'flex' : 'flex')};
  justify-content: ${props => (props.loading ? 'center' : '')};
  padding: 10px;
  height: 40px;
`
export const SearchInputEl = styled.input`
  width: 30%;
  background-color: transparent;
  padding: 10px;
`

export const SuccesViewFullContainer = styled.li`
  padding: none;
  list-style: none;
  width: 30%;
  text-decoration: none;
  margin: 10px;
`
export const SuccesViewThumbNailImage = styled.img`
  width: 100%;
`
export const SuccesViewProfilaAndTitleContainer = styled.div`
  width: 100%;
  display: flex;
`

export const SearchBtnEl = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`

export const SuccesViewProfileImage = styled.img`
  width: 100%;
`
export const SuccesViewProfileContainer = styled.div`
  width: 30%;
  padding: 10px;
`

export const ParaName = styled.p`
  margin: 10px;

  color: ${props => (props.light ? '#000000' : '#ffffff')};
`

export const SuccesViewViewsAndDateContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0px;
  padding: 0px;
`

export const FailureViewsAndDateContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px;
  padding: 10px;
  min-height: 80vh;
  color: ${props => (props.light ? '#231f20' : '#ffffff')};
`

export const FailureViewProfileImage = styled.img`
  width: 80%;
`
export const FailureViewHeading = styled.h1``
export const FailureViewPara = styled.p``

export const FailureBtn = styled.button`
  border-style: ${props => (props.close ? 'none' : 'solid')};
  background-color: #4f46e5;
  padding: 10px;
  border-radius: 10px;
  border-style: none;
  font-weight: bold;
  color: #ffffff;
  width: 100px;
`
