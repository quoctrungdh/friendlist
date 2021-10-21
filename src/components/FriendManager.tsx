import { useCallback, useEffect, useState } from "react";

import FriendForm from "./FriendForm";
import FriendList from "./FriendList";

import friendService from "../sevices/FriendService";

import IFriendInfo from "../models/FriendInfo";

export default function FriendManager() {
    const [friendList, setFriendList] = useState<IFriendInfo[]>([]);

    useEffect(() => {
        async function RetrieveFriends() {
            const friends = await friendService.retriveFriendList();
            setFriendList(friends);
        }
        RetrieveFriends();
    }, [])

    useEffect(() => {
        friendService.storeFriendList(friendList)
    }, [friendList])

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