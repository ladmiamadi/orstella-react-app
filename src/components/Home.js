import {NavLink} from "react-router-dom";
import Navigation from "./Navigation";
import ProductsList from "./ProductsList";

const Home = () => {

    return (
        <div>
            <Navigation />
            <div className="container my-5">
                <NavLink
                    className="navbar-item"
                    activeClassName="is-active"
                    to="/add-product"
                    exact
                >
                    <button className="btn btn-primary">Ajouter un produit</button>
                </NavLink>
                <div>
                    <ProductsList />
                </div>

            </div>
        </div>

    );
};

export default Home;