import IFriendInfo from "../models/FriendInfo";

const storingKey = "friendlist";

const friendService = {
    storeFriendList: async (friends: IFriendInfo[]) => {
        localStorage.setItem(storingKey, JSON.stringify({ friends }));
    },
    retriveFriendList: async (): Promise<IFriendInfo[]> => {
        const friendsStr = localStorage.getItem(storingKey);
        return friendsStr ? JSON.parse(friendsStr).friends : [];
    },
};

export default friendService;
