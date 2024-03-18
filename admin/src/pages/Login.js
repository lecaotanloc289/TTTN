import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchData } from '../redux/thunk'
import { ErrorMessage, Field, Form, Formik } from 'formik'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchData())
    })

    // validate form with formik
    const [initialValues] = useState({
        email: '',
        password: '',
    })

    const validate = (values) => {
        const errors = {}
        if (!values.email) errors.email = 'Please enter email!'
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
            errors.email = 'Email is not valid!'
        if (!values.password) errors.password = 'Please enter password!'
        return errors
    }
    return (
        <div className="py-5 indigo-bg" style={{ minHeight: '100vh' }}>
            <br />
            <br />
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center title">Login</h3>
                <p className="text-center">
                    Login to your account to continue.
                </p>
                <div className="error text-center"></div>
                <Formik initialValues={initialValues} validate={validate}>
                    <Form onSubmit={() => navigate('/admin')}>
                        <CustomInput
                            type="text"
                            label="Email Address"
                            id="email"
                            name="email"
                        />
                        <ErrorMessage
                            className="red"
                            name="email"
                            component="div"
                        />
                        <div name="email" className="error mt-2"></div>
                        <CustomInput
                            type="password"
                            label="Password"
                            id="pass"
                            name="password"
                        />
                        <ErrorMessage
                            className="red"
                            name="password"
                            component="div"
                        />
                        <div name="password" className="error mt-2"></div>
                        <div className="mb-3 text-end">
                            <Link to="forgot-password" className="">
                                Forgot Password?
                            </Link>
                        </div>
                        <button
                            className="indigo-bg border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                            type="submit"
                        >
                            Login
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Login

{
    /* <form action="" onSubmit={() => navigate('/admin')}>
                        <CustomInput
                            type="text"
                            label="Email Address"
                            id="email"
                            name="email"
                        />
                        <div name='email' className="error mt-2"></div>
                        <CustomInput
                            type="password"
                            label="Password"
                            id="pass"
                            name="password"
                        />
                        <div name='password' className="error mt-2"></div>
                        <div className="mb-3 text-end">
                            <Link to="forgot-password" className="">
                                Forgot Password?
                            </Link>
                        </div>
                        <button
                            className="indigo-bg border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                            type="submit"
                        >
                            Login
                        </button>
                    </form> */
}
