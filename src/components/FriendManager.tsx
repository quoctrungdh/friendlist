import { useCallback, useState } from "react";

import FriendForm from "./FriendForm";
import FriendList from "./FriendList";

import IFriendInfo from "../models/FriendInfo";

export default function FriendManager() {
    const [friendList, setFriendList] = useState<IFriendInfo[]>([]);

    const updateFriendList = useCallback((friendInfo: IFriendInfo) => {
        setFriendList([...friendList, friendInfo]);
    }, [friendList])

    return (
        <section className="container my-5">
            <FriendForm onSubmit={updateFriendList} />

            <FriendList friends={friendList} />
        </section>
    )
}