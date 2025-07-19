import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LoginValues } from '../types/index';
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_REQUEST } from "../store/types/loginTypes";
import { useDispatch } from "react-redux";
import { ErrorResponse } from "../types/index";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch();

  const initialValues: LoginValues = {
    email: "",
    password: ""
  };

  // Yup Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required("Password is required"),
  });

  // Handle Login
  const handleLogin = async (values: LoginValues) => {
    setServerError('');
    const payload = values;
    dispatch({ type: LOGIN_REQUEST, payload: { credentials: payload, callBack } });
  };

  const callBack = (success: boolean, error: ErrorResponse | null) => {
    if (success) {
      navigate("/");
    } else if (error && error.status === 401 && !success) {
      setServerError('Wrong Credentials..');
    } else {
      setServerError(error && error.response?.data.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login to Shoppify</h2>

        {serverError && <p className="text-red-500 text-center mb-2">{serverError}</p>}

        {/* Formik Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                <Field id="eamil"
                  type="text"
                  name="email"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label htmlFor="password"  className="block mb-1 font-medium">Password</label>
                <Field id="password"
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-sm mt-3">
          Don't have an account? <Link to="/auth/register" className="text-blue-500">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;