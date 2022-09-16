import React from "react";
import {Title} from "./Title";
import {Product} from "./Product";
import {ProductConsumer} from "./Context";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons";
import {ButtonContainer} from "./Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import IconButton from "@mui/material/IconButton";

export const ProductList = () => {
    return (
        <>
            <div className="py-5">
                <div className="container">
                    <Title name="our" title="products"/>
                    <IconButton component={Link} to="/cart" className="ml-auto">
                        <ButtonContainer>
                          <span className="mr-2">
                            <FontAwesomeIcon icon={faCartPlus}/>
                            My cart
                          </span>
                        </ButtonContainer>
                    </IconButton>
                    <div className="row"/>
                    <ProductConsumer>
                        {value => {
                            return value.products.map(product => {
                                return <Product key={product.id} product={product}/>;
                            });
                        }}
                    </ProductConsumer>
                </div>
            </div>
        </>
    );
};
