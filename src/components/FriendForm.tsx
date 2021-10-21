import { useCallback, useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

import IFriendInfo from '../models/FriendInfo';

interface FriendFormProps {
    onSubmit: (friendInfo: IFriendInfo) => void;
    editId: number;
    cancelEdit: () => void;
    editValues: IFriendInfo | undefined;
    confirmEdit: (friendInfo: IFriendInfo) => void;
}

const initialState = {
    id: 0,
    name: "",
    address: "",
    email: ""
}

export default function FriendForm(props: FriendFormProps) {
    const [friendInfo, setFriendInfo] = useState(initialState)
    const { editValues, confirmEdit } = props;

    const updateFormField = useCallback((field: string, value: string) => {
        setFriendInfo({ ...friendInfo, [field]: value });
    }, [friendInfo, setFriendInfo])

    function handleSubmit() {
        // TODO: add validation
        props.onSubmit({ ...friendInfo, id: Date.now() });
        setFriendInfo(initialState);
    }

    function handleConfirmUpdate() {
        confirmEdit(friendInfo)
        setFriendInfo(initialState);
    }

    useEffect(() => {
        if (editValues) {
            setFriendInfo(editValues)
        }
    }, [editValues])

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
                {
                    props.editId === 0 ?
                        <Button onClick={handleSubmit} className="px-4" color="primary">ADD</Button> :
                        <>
                            <Button onClick={props.cancelEdit} className="px-4 mr-2" color="link">Cancel</Button>
                            <Button onClick={handleConfirmUpdate} className="px-4" color="success">UPDATE</Button>
                        </>
                }
            </div>
        </Form>
    )
}