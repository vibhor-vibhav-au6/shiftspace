import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
            title="Welcome to ShiftSpace"
            description="Your one stop shopping destination!"
            className="container-fluid"
        >
            <Search />
            <h2 className="mb-2">New Arrivals</h2><hr></hr>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-3 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h2 className="mt-4 ">Best Sellers</h2><hr></hr>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-3 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Home;
