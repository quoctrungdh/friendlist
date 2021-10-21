import { useCallback, useEffect, useState } from "react";
import { Button } from 'reactstrap';

import FriendForm from "./FriendForm";
import FriendList from "./FriendList";
import DeleteConfirm from "./DeleteConfirm";

import friendService from "../sevices/FriendService";

import IFriendInfo from "../models/FriendInfo";

export default function FriendManager() {
    const [friendList, setFriendList] = useState<IFriendInfo[]>([]);
    const [toDelete, setToDelete] = useState<number>(0);
    const [editId, setEditId] = useState<number>(0);

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

    const setEdit = useCallback((id: number) => {
        setEditId(id);
    }, [])

    const confirmEdit = useCallback((friendInfo: IFriendInfo) => {
        const newFriendList = [...friendList];
        const editInfoIndex = newFriendList.findIndex(friend => friend.id === editId)

        if (editInfoIndex !== -1) {
            newFriendList[editInfoIndex] = friendInfo;
            setFriendList(newFriendList);
        }

        setEditId(0)
    }, [friendList, editId])

    const confirmDelete = useCallback((id: number) => {
        setToDelete(id)
    }, []);

    const deleteFriend = useCallback(() => {
        const newFriendList = friendList.filter((friend) => friend.id !== toDelete);
        setFriendList(newFriendList);
        setToDelete(0);
    }, [friendList, toDelete])

    return (
        <section className="container my-5">
            <FriendForm
                onSubmit={updateFriendList}
                editId={editId}
                cancelEdit={() => setEditId(0)}
                editValues={editId === 0
                    ? undefined
                    : friendList.find((friend) => friend.id === editId)}
                confirmEdit={confirmEdit}
            />

            <FriendList
                friends={friendList}
                confirmDelete={confirmDelete}
                setEdit={setEdit}
            />

            <DeleteConfirm
                isOpen={toDelete !== 0}
                actions={[
                    <Button color="link" onClick={() => setToDelete(0)}>Cancel</Button>,
                    <Button color="primary" onClick={deleteFriend}>Delete</Button>
                ]}
            />
        </section>
    )
}