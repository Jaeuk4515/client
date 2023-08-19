import React, { useState } from "react";
import {
    ModalBg,
    ModalWrap,
    Title,
    Count,
    Header,
    ItemList
} from "./Inventory.styles";

import Item from "@/components/pages/Pet/Inventory/Item/Item";
import Divider from "@/components/Divider/Divider";
import Nav from "@/components/pages/Pet/Inventory/Nav/Nav";

export default function InventoryModal() {
    //인벤토리버튼 클릭 시 openModal을 true로 설정해주기(셋팅 후 주석 지워주세요!)
    const [openModal, setOpenModal] = useState<boolean>(true);
    return (
        <>
            {openModal && (
                <>
                    <ModalBg onClick={() => setOpenModal(false)} />
                    <ModalWrap>
                        <Header>
                            <Title>도구</Title>
                            <Count>{20} / 50</Count>
                        </Header>
                        <Nav />
                        <Divider category={"먹이"} />
                        <ItemList>
                            <Item />
                            <Item />
                            <Item />
                        </ItemList>
                    </ModalWrap>
                </>
            )}
        </>
    );
}