import React, {useState} from 'react';
import { Modal} from "antd";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
            <button className="align-self-end mt-auto btn btn-primary" onClick={showModal}>
                <FontAwesomeIcon icon={faEye} />
            </button>
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