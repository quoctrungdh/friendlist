import IFriendInfo from "../models/FriendInfo";

interface IFriendlistProps {
    friends: IFriendInfo[];
}

export default function FriendList(props: IFriendlistProps) {
    const { friends } = props;
    return (
        <article>
            <h4>Friends</h4>

            {
                friends.length === 0 ?
                    <p className="text-center">You have 0 friend contacts! Let's add some.</p> :
                    <div className="card__wrapper">
                        {friends.map(friend => (
                            <div key={friend.id} className="border card">
                                <h5>{friend.name}</h5>
                                <p className="text-muted">{friend.address}</p>
                                <p>{friend.email}</p>
                            </div>
                        ))}
                    </div>
            }

        </article>
    )
}