import styled from 'styled-components';
import background from '@/assets/images/background.svg'
import pet from '@/assets/images/pet.svg'
import { FooterButton, MainModalBackdrop } from './PetArea';
import { ModalTitle } from '@/components/pages/MyPage/UserInfo/UserInfo.styles';

const MainArea = styled.main`
    height: 77.5vh;
    background-image: url(${background});
    display: flex;
    flex-direction: column;
	position: relative;
`

const PetImg = styled.div`
	background-image: url(${pet});
	position: absolute;
	width: 60%;
	height: 28%;
	left: 20px; bottom: 120px;
`

const MainHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    flex-basis: 22%;
`

const StatusInfo = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
`

const LevelInfo = styled.div`
    margin-top: 5px;
    margin-right: 20px;
`

const MainBody = styled.div`
	flex-basis: 58%;
`

const MainFooter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-basis: 20%;
	padding: 0 25px;
`

const MainFooterButton = styled(FooterButton)`
	cursor: pointer;
	&:hover {
		filter: brightness(110%);
	}
`

const AchModalBackdrop = styled(MainModalBackdrop)`

`

// ${props => props.on === true ? "" : "top: 100%"};
const AchModal = styled.div<{on: boolean}>`
	position: absolute;
	bottom: 0; left: 0;
	width: 100%;
	height: ${props => props.on === true ? "80" : 0}%;
	border-radius: 20px 20px 0 0;
	background-color: white;
	display: flex;
	flex-direction: column;
	z-index: 1;
	transition: all .5s;
`

const AchModalTitle = styled(ModalTitle)`
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 10%;
	margin: 0;
`

const AchArea = styled.div`
	width: 100%;
	height: 90%;
	overflow-y: auto;
`

const AchWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
`


export { MainArea, PetImg, MainHeader, StatusInfo, LevelInfo, MainBody, MainFooter, MainFooterButton, AchModalBackdrop, AchModal, AchModalTitle, AchArea, AchWrapper };