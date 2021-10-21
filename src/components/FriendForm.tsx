import { useCallback, useState } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

import IFriendInfo from '../models/FriendInfo';

interface FriendFormProps {
    onSubmit: (friendInfo: IFriendInfo) => void;
}

const initialState = {
    id: 0,
    name: "",
    address: "",
    email: ""
}

export default function FriendForm(props: FriendFormProps) {
    const [friendInfo, setFriendInfo] = useState(initialState)

    const updateFormField = useCallback((field: string, value: string) => {
        setFriendInfo({ ...friendInfo, [field]: value });
    }, [friendInfo, setFriendInfo])

    function handleSubmit() {
        // TODO: add validation
        props.onSubmit({ ...friendInfo, id: Date.now() });
        setFriendInfo(initialState);
    }

    return (
        <Form>
            <h4>Form</h4>

            <FormGroup className="mt-4">
                <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    onChange={(e) => updateFormField("name", e.target.value)}
                    value={friendInfo.name}
                />
            </FormGroup>

            <FormGroup className="mt-4">
                <Input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Wallet address"
                    onChange={(e) => updateFormField("address", e.target.value)}
                    value={friendInfo.address}
                />
            </FormGroup>

            <FormGroup className="mt-4">
                <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => updateFormField("email", e.target.value)}
                    value={friendInfo.email}
                />
            </FormGroup>

            <div className="mt-4 text-center">
                <Button onClick={handleSubmit} className="px-4" color="primary">ADD</Button>
            </div>
        </Form>
    )
}