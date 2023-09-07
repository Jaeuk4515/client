import { useContext, useState } from "react";
import {
    ModalBg,
    ModalWrap,
    Item,
    Quantity,
    BtnWrap
} from "./ActionModal.styles";
import EditBtn from "@/components/pages/Pet/Inventory/Item/Action/EditBtn/EditBtn";
import ChangeQtyBtn from "@/components/pages/Pet/Inventory/Item/Action/ChangeQtyBtn/ChangeQtyBtn";
import { items, myItems } from "@/@types/myItems";
import axiosRequest from "@/api";
import { res, useItemRes } from "@/@types";
import { dumpItemRes } from "@/@types/dumpItemRes";
import { ItemDataContext } from "../../Inventory";
import { MyContext } from "@/pages/Pet/Pet";

interface modalTypeProps {
    modaltype: "useModal" | "discardModal";
    state: boolean;
    setState(state: boolean): void;
    itemId: string;
    name: string;
    quantity: number;
}
export default function ActionModal({
    modaltype,
    state,
    setState,
    itemId,
    name,
    quantity
}: modalTypeProps) {
    const [itemData, setItemData] = useContext(ItemDataContext);
    const [itemCount, setItemCount] = useState(1);
    const receivePetData = useContext(MyContext);

    async function receiveItemData() {
        try {
            const response: res<myItems> | void =
                await axiosRequest.requestAxios<res<myItems>>(
                    "get",
                    "/inventories",
                    {}
                );
            if (response) {
                const itemArray = response.data.items;
                setItemData(itemArray);
            }
        } catch (error) {
            console.error("Error fetching pet data: ", error);
        }
    }

    async function handleUseItem(itemId: string) {
        try {
            const data = { quantity: itemCount };
            const response: res<useItemRes> | void =
                await axiosRequest.requestAxios<res<useItemRes>>(
                    "post",
                    `/inventories/${itemId}/put`,
                    { data: data },
                    {
                        "x-custom-data": Date.now() * 4 + 1000
                    }
                );
            if (response) {
                receiveItemData();
                receivePetData();
            }
        } catch (error) {
            console.log("Error fetching pet data: ", error);
        }
    }

    async function handleDumpItem(itemId: string) {
        try {
            const data = { quantity: itemCount * -1 };
            const response: res<dumpItemRes> | void =
                await axiosRequest.requestAxios<res<dumpItemRes>>(
                    "patch",
                    `/inventories/items/${itemId}`,
                    {
                        data: data
                    },
                    {
                        "x-custom-data": Date.now() * 4 + 1000
                    }
                );
            if (response) {
                receiveItemData();
            }
        } catch (error) {
            console.error("Error fetching pet data: ", error);
        }
    }

    return (
        <>
            <ModalBg
                onClick={() => {
                    setState(!state);
                }}
            >
                <ModalWrap onClick={(e) => e.stopPropagation()}>
                    <Item>
                        <div>
                            {modaltype === "useModal" ? "사용할" : "버리는"}
                        </div>
                        <div>도구: {name}</div>
                    </Item>
                    <Quantity>
                        <ChangeQtyBtn
                            modaltype={modaltype}
                            operationType="decrease"
                            onClick={() =>
                                itemCount > 1
                                    ? setItemCount(itemCount - 1)
                                    : false
                            }
                            iscountpositivenum={itemCount > 1}
                        />
                        <div>{itemCount}</div>
                        <ChangeQtyBtn
                            modaltype={modaltype}
                            operationType="increase"
                            onClick={() =>
                                itemCount < quantity
                                    ? setItemCount(itemCount + 1)
                                    : false
                            }
                            iscountpositivenum={itemCount < quantity}
                        />
                    </Quantity>
                    <BtnWrap>
                        <EditBtn
                            modaltype={modaltype}
                            btntype="confirm"
                            onClick={() => {
                                if (modaltype === "useModal") {
                                    handleUseItem(itemId);
                                    setState(!state);
                                } else if (modaltype === "discardModal") {
                                    handleDumpItem(itemId);
                                    setState(!state);
                                }
                            }}
                        />
                        <EditBtn
                            modaltype={modaltype}
                            btntype="cancel"
                            onClick={() => {
                                setState(!state);
                            }}
                        />
                    </BtnWrap>
                </ModalWrap>
            </ModalBg>
        </>
    );
}
