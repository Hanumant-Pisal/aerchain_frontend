import { useRegisterMutation } from "../features/auth/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../features/auth/authSlice";

export default function VendorRegister() {
  const dispatch = useDispatch();
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting vendor registration...");
      const res = await register({
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        role: "vendor",
        company: e.target.company.value,
        contact: e.target.contact.value
      }).unwrap();
      console.log("Registration successful:", res);
      dispatch(setCredentials(res));
      console.log("Credentials set, navigating to dashboard...");
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please check your information.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Vendor Registration</h1>
          <p className="text-gray-600 text-center mb-6">
            Register as a vendor to receive RFP opportunities
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input 
                name="company" 
                type="text"
                placeholder="Your company name" 
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500" 
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Person
              </label>
              <input 
                name="name" 
                type="text"
                placeholder="Your full name" 
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500" 
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input 
                name="email" 
                type="email"
                placeholder="company@example.com" 
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500" 
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input 
                name="contact" 
                type="tel"
                placeholder="+1 (555) 123-4567" 
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
                placeholder="Create a strong password" 
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500" 
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Register as Vendor
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
