import { Button, Modal } from 'antd';
import { useState } from 'react';

const ModalMsg = ({ message, title }: { message: string; title: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={showModal} type="primary">
                Open Modal
            </Button>
            <Modal onCancel={handleCancel} onOk={handleOk} open={isModalOpen} title={title}>
                <p>{message}</p>
            </Modal>
        </>
    );
};

export default ModalMsg;
