import React, {useState} from 'react';
import {Button, Modal} from "antd";

const ProductModal = ({product}) => {
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
            <Button type="primary" className="align-self-end mt-auto" onClick={showModal}>
                Détails
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <img  src={'./assets/images/' + product.image} className="card-img-top" alt={product.title}/>
                <h2 className="my-3 text-center">{product.title}</h2>
                <p className=" my-5">{product.description}</p>
                <p className="text-danger my-2 fw-bold">{product.price} €</p>
            </Modal>
        </>
    );
};

export default ProductModal;