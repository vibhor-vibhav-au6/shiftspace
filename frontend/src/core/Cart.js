import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} product(s)</h2>
                <hr />
                {items.map((product, i) => (
                    <Card
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (        
        <div><h2>Woah! There's nothing here.<br /></h2>
        <Link to="/shop">Continue shopping</Link></div>       
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items or continue shopping!"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-4 ml-4" style={{height:'auto'}}>{items.length > 0 ? showItems(items) : noItemsMessage()}</div>
                <div className="col-3"></div>
                <div className="col-4 ">
                    <h2 className="mb-4">Checkout</h2>
                    <hr />
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
