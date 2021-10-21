import { useCallback, useState } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

import IFriendInfo from '../models/FriendInfo';

interface FriendFormProps {
    onSubmit: (friendInfo: IFriendInfo) => void;
}

export default function FriendForm(props: FriendFormProps) {
    const [friendInfo, setFriendInfo] = useState({
        name: "",
        address: "",
        email: ""
    })

    const updateFormField = useCallback((field: string, value: string) => {
        setFriendInfo({ ...friendInfo, [field]: value });
    }, [friendInfo, setFriendInfo])

    function handleSubmit() {
        props.onSubmit(friendInfo)
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
                />
            </FormGroup>

            <FormGroup className="mt-4">
                <Input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Wallet address"
                    onChange={(e) => updateFormField("address", e.target.value)}
                />
            </FormGroup>

            <FormGroup className="mt-4">
                <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => updateFormField("email", e.target.value)}
                />
            </FormGroup>

            <div className="mt-4 text-center">
                <Button onClick={handleSubmit} className="px-4" color="primary">ADD</Button>
            </div>
        </Form>
    )
}