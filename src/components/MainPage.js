import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../actions/product.action";
import Navigation from "./Navigation";

const MainPage = () => {
    const products = useSelector(state => state.productReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div>
            <Navigation />
            <div className="row my-5 w-75 mx-auto">
                {
                    products.map((product, index) => {
                        return (
                            <div className="col-4 my-4 card-home">
                                <div className="card" style={{width: "18rem", height: "23rem"}}>
                                    <img src={'./assets/images/' + product.image} className="card-img-top" alt={product.title}/>
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{product.title}</h5>
                                            <p className="card-text">{product.description}</p>
                                            <h5 className="card-text text-danger">{product.price}€</h5>
                                            <button className="btn btn-primary align-self-end mt-auto">Détails</button>
                                        </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default MainPage;