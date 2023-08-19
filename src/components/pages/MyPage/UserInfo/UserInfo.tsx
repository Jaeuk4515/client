import { UserInfoWrapper, UserIcon, UserInfoArea, UserName, UpdateIcon, ModalBackdrop, Modal, ModalTitle, ModalInput, ModalButtonArea, DeleteButton, UpdateButton, JoinDate } from './UserInfo.styles';
import NickName from '../NickName/NickName';
import { useState } from 'react'; 

interface userinfoType {
    name: string;
    date: string;
}

export function UserInfo({ name, date }: userinfoType) {
    const [state, setState] = useState(false);
    const clickHandler = () => {
        setState(!state);
    }
    return (
        <UserInfoWrapper>
            <UserIcon></UserIcon>
            <UserInfoArea>
                <UserName>
                    <NickName name={name}></NickName>
                    <UpdateIcon className={""} onClick={clickHandler}></UpdateIcon>
                    { 
                        state && 
                        <ModalBackdrop>
                            <Modal>
                                <ModalTitle>닉네임 변경하기</ModalTitle>
                                <ModalInput />  {/* 임시 인풋창 */}
                                <ModalButtonArea>
                                    <DeleteButton className={""} onClick={clickHandler}>취소</DeleteButton>
                                    <UpdateButton className={""} onClick={clickHandler}>닉네임 변경</UpdateButton>
                                </ModalButtonArea>
                            </Modal>
                        </ModalBackdrop> 
                    }
                </UserName>
                <JoinDate>가입일 : {date}</JoinDate>
            </UserInfoArea>
        </UserInfoWrapper>
    );
}

// interface classtype {
//     className: string;
//     onClick: () => void;
// }

// @ts-ignore
export function Icon({ className, onClick }: classtype) {
    return (
        <div className={className} onClick={onClick}></div>
    )
};

//@ts-ignore
export function ModalButton({ className, onClick, children }: classtype) {
    return (
        <button className={className} onClick={onClick}>{children}</button>
    )
}