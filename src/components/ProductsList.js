import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {isEmpty} from "../utils/Utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import { deleteProduct, getProducts} from "../actions/product.action";

const ProductsList = () => {
    const products = useSelector(state => state.productReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div className="container">
            <table className="table table-striped table-hover border my-5">
                <thead>
                <tr>
                    <th scope="col-3">Titre</th>
                    <th scope="col-1">Prix</th>
                    <th scope="col-4">Description</th>
                    <th scope="col-5">Image</th>
                    <th scope="col-1">Quantité</th>
                    <th scope="col-4">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    !isEmpty(products) && products.map((product, index) =>
                        <tr>
                            <td className="w-25">{ product.title }</td>
                            <td>{ product.price }</td>
                            <td className="w-25">{ product.description }</td>
                            <td className="w-25">
                                <img src={`./assets/images/${product.image}`} alt={product.title}
                                     className="img-thumbnail w-25"
                            />
                            </td>
                            <td>{ product.quantity}</td>
                            <td className="w-25">
                                <Link
                                    className="btn btn-primary"
                                    state={{ data: product }}
                                    to="/add-product"
                                    key={index}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} /></Link>
                                <button
                                    className="btn btn-danger mx-3"
                                    onClick={() => dispatch(deleteProduct(product.id))}
                                >
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </td>
                        </tr>
                    )
                }

                </tbody>
            </table>
        </div>
    );
};

export default ProductsList;