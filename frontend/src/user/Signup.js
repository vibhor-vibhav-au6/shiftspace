import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';
import '../styles.scss'

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        <form className="form-all">
            <div className="form-group">
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} placeholder="Name" />
            </div>

            <div className="form-group">
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} placeholder="e-mail"/>
            </div>

            <div className="form-group">
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} placeholder="Password" />
            </div>
            <button onClick={clickSubmit} className="btn btn-outline-dark">
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Welcome to shiftSpace. Please <Link to="/signin">Signin</Link> to continue.
        </div>
    );

    return (
        <Layout
            title="Signup"
            description="Signup to buy awesomeness!"
            className="container col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    );
};

export default Signup;
