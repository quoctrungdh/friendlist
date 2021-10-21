import { Modal, ModalBody, ModalFooter } from 'reactstrap';

interface DeleteConfirmProps {
    isOpen: boolean;
    actions: React.ReactNodeArray;
}

export default function DeleteConfirm(props: DeleteConfirmProps) {
    const { isOpen, actions } = props;

    return (
        <Modal
            isOpen={isOpen}
            keyboard={true}
        >
            <ModalBody>
                Are you sure?
            </ModalBody>
            <ModalFooter>
                {actions}
            </ModalFooter>
        </Modal>

    )
}