import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import { FormValues } from '../types/index';
import { registerApi } from "../api/service/authapi";

const RegistrationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    middleName: Yup.string(),
    lastName: Yup.string().required('Last Name is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number is not valid').required('Phone number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .required('Password is required'),
    gender: Yup.string().oneOf(['Male', 'Female'], 'Select a valid gender').required('Gender is required'),
});

const Register: React.FC = () => {
    const [success, setSuccess] = useState(false);
   const navigate = useNavigate();

    const initialValues: FormValues = {
        firstName: '',
        middleName: '',
        lastName: '',
        phone: 0,
        email: '',
        password: '',
        gender: ''
    };

    const handleRegister = async (values: FormValues) => {
        try {
            console.log(values);
            const userResponse = await registerApi(values);
            console.log(userResponse)
            if (userResponse.status === 201) {
                setSuccess(true);
                navigate("/auth/login")
            }
        } catch (err) {
            setSuccess(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
                {success && <div className="bg-green-800 p-4 text-white mb-4">Registered Successfully...</div>}
                <Formik
                    initialValues={initialValues}
                    validationSchema={RegistrationSchema}
                    onSubmit={handleRegister}
                >
                    {() => (
                        <Form>
                            <div className="mb-4 flex gap-3">
                                <div className="flex-1">
                                    <label htmlFor="firstName" className="block mb-1 font-medium">First Name</label>
                                    <Field name="firstName" id="firstName" type="text" className="w-full px-3 py-2 border rounded" />
                                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="middleName" className="block mb-1 font-medium">Middle Name</label>
                                    <Field name="middleName" id="middleName" type="text" className="w-full px-3 py-2 border rounded" />
                                    <ErrorMessage name="middleName" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            </div>
                            <div className="mb-4 flex gap-3">
                                <div className="flex-1">
                                    <label htmlFor="lastName" className="block mb-1 font-medium">Last Name</label>
                                    <Field name="lastName" id="lastName" type="text" className="w-full px-3 py-2 border rounded" />
                                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="phone" className="block mb-1 font-medium">Phone Number</label>
                                    <Field type="text" id="phone" name="phone" className="w-full px-3 py-2 border rounded" />
                                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            </div>
                            <div className="mb-4 flex gap-3">
                                <div className="flex-1">
                                    <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                                    <Field name="email" id="email" type="email" className="w-full px-3 py-2 border rounded" />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="password" className="block mb-1 font-medium">Password</label>
                                    <Field name="password" id="password" type="password" className="w-full px-3 py-2 border rounded" />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="gender" className="block mb-1 font-medium">Gender</label>
                                <Field as="select" id="gender" name="gender" className="w-full px-3 py-2 border rounded">
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Field>
                                <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                            >
                                Register
                            </button>
                            <p className="text-center text-sm mt-3">
                                Already have an account? <Link to="/auth/login" className="text-blue-500">Login here</Link>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Register;