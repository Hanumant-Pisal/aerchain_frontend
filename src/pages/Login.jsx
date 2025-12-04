import { useLoginMutation } from "../features/auth/authApi";
import { setCredentials } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting login...");
      const res = await login({ email: e.target.email.value, password: e.target.password.value }).unwrap();
      console.log("Login successful:", res);
      dispatch(setCredentials(res));
      console.log("Credentials set, navigating to dashboard...");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input 
                name="email" 
                type="email"
                placeholder="Enter your email" 
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500" 
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input 
                name="password" 
                type="password" 
                placeholder="Enter your password" 
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500" 
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Are you a vendor?{" "}
              <Link to="/vendor-register" className="text-blue-600 hover:underline">
                Register here
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/vendor-register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
