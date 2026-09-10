// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// function Login() {
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   // TOAST STATES
//   const [showToast, setShowToast] = useState(false);

//   const [toastMessage, setToastMessage] = useState("");

//   const [toastType, setToastType] = useState("success");

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const location = useLocation();

//   const [role, setRole] = useState(location.state?.role || "user");

//   function handleChange(e) {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   }

//   // SHOW TOAST FUNCTION

//   function showBootstrapToast(message, type = "success") {
//     setToastMessage(message);

//     setToastType(type);

//     setShowToast(true);

//     setTimeout(() => {
//       setShowToast(false);
//     }, 3000);
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       const url =
//         role === "admin"
//           ? "http://127.0.0.1:5000/api/admin/login"
//           : "http://127.0.0.1:5000/api/user/login";

//       const payload =
//         role === "admin"
//           ? {
//               email: formData.email,
//               password: formData.password,
//             }
//           : {
//               email: formData.email,
//               password: formData.password,
//             };
//       console.log("Role:", role);
//       console.log("Payload:", payload);
//       console.log("URL:", url);
//       const res = await axios.post(url, payload, {
//         withCredentials: true,
//       });

//       console.log(res.data);

//       showBootstrapToast(res.data.message || "Login Successful", "success");

//       const adminData = res.data.admin;

//       if (role === "admin") {
//         localStorage.setItem("admin", JSON.stringify(adminData));

//         console.log("Stored Admin:", JSON.parse(localStorage.getItem("admin")));

//         navigate("/dashboard");
//       } else {
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//       }

//       setTimeout(() => {
//         if (role === "admin") {
//           navigate("/dashboard");
//         } else {
//           navigate("/user-dashboard");
//         }
//       }, 1500);
//     } catch (error) {
//       console.log("STATUS:", error.response?.status);
//       console.log("DATA:", error.response?.data);
//       console.log("FULL:", error.response);

//       showBootstrapToast(
//         error.response?.data?.message ||
//           JSON.stringify(error.response?.data) ||
//           "Login Failed",
//         "danger",
//       );
//     }
//   }
//   return (
//     <>
//       {/* BOOTSTRAP 5 */}
//       <link
//         href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
//         rel="stylesheet"
//       />

//       {/* CUSTOM STYLE */}
//       <style>{`
//         .login-page{
//           min-height: 100vh;
//           background: #f1f5f9;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           padding: 40px 20px;
//         }

//         .login-card{
//           width: 100%;
//           max-width: 500px;
//           background: white;
//           padding: 40px;
//           border-radius: 20px;
//           box-shadow: 0 8px 20px rgba(0,0,0,0.1);
//         }

//         .login-title{
//           text-align: center;
//           font-size: 38px;
//           font-weight: bold;
//           color: #0f172a;
//           margin-bottom: 35px;
//         }

//         .form-label{
//           font-weight: 600;
//           color: #334155;
//         }

//         .form-control{
//           border-radius: 10px;
//           padding: 12px;
//         }

//         .login-btn{
//           width: 100%;
//           background: #0f172a;
//           color: white;
//           border: none;
//           padding: 14px;
//           border-radius: 10px;
//           font-size: 18px;
//           font-weight: 600;
//           transition: 0.3s;
//         }

//         .login-btn:hover{
//           background: #38bdf8;
//         }

//         .register-link{
//           text-align: center;
//           margin-top: 20px;
//           color: #64748b;
//         }

//         .register-link a{
//           color: #38bdf8;
//           text-decoration: none;
//           font-weight: 600;
//         }

//         .custom-toast{
//           position: fixed;
//           top: 20px;
//           right: 20px;
//           z-index: 9999;
//           min-width: 320px;
//           border-radius: 12px;
//         }

//         @media(max-width:768px){

//           .login-card{
//             padding: 25px;
//           }

//           .login-title{
//             font-size: 30px;
//           }

//           .custom-toast{
//             right: 10px;
//             left: 10px;
//             min-width: auto;
//           }
//         }
//       `}</style>

//       {/* TOAST */}

//       {showToast && (
//         <div
//           className={`toast show align-items-center text-white bg-${toastType} border-0 custom-toast`}
//           role="alert"
//         >
//           <div className="d-flex">
//             <div className="toast-body">{toastMessage}</div>

//             <button
//               type="button"
//               className="btn-close btn-close-white me-2 m-auto"
//               onClick={() => setShowToast(false)}
//             ></button>
//           </div>
//         </div>
//       )}

//       <div className="login-page">
//         <div className="login-card">
//           <h1 className="login-title">
//             {role === "admin" ? "Admin Login" : "User Login"}
//           </h1>
//           <div className="mb-4">
//             <label className="form-label d-block">Login As</label>

//             <div className="form-check form-check-inline">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="role"
//                 value="user"
//                 checked={role === "user"}
//                 onChange={(e) => setRole(e.target.value)}
//               />
//               <label className="form-check-label">User</label>
//             </div>

//             <div className="form-check form-check-inline">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="role"
//                 value="admin"
//                 checked={role === "admin"}
//                 onChange={(e) => setRole(e.target.value)}
//               />
//               <label className="form-check-label">Admin</label>
//             </div>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Email Address</label>

//               <input
//                 type="email"
//                 className="form-control"
//                 name="email"
//                 placeholder="Enter Email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="mb-4">
//               <label className="form-label">Password</label>

//               <div className="input-group">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className="form-control"
//                   name="password"
//                   placeholder="Enter Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />

//                 <span
//                   className="input-group-text bg-primary text-white"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>
//             </div>

//             <button type="submit" className="login-btn">
//               Login
//             </button>
//           </form>

//           <div className="register-link">
//             Don’t have an account? <Link to="/register">Register</Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const [role, setRole] = useState(location.state?.role || "user");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Toast states
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // Login loading state
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function showBootstrapToast(message, type = "success") {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Basic frontend validation
    if (!formData.email.trim()) {
      showBootstrapToast("Email is required", "danger");
      return;
    }

    if (!formData.password.trim()) {
      showBootstrapToast("Password is required", "danger");
      return;
    }

    setLoading(true);

    try {
      // Flask backend URL
      const url =
        role === "admin"
          ? "https://shopiecomreact.duckdns.org/api/admin/login"
          : "https://shopiecomreact.duckdns.org/api/user/login";

      // Both admin and user login use the same payload
      const payload = {
        email: formData.email.trim(),
        password: formData.password,
      };

      console.log("========== LOGIN DEBUG ==========");
      console.log("Role:", role);
      console.log("URL:", url);
      console.log("Payload:", {
        email: payload.email,
        password: "********",
      });

      const res = await axios.post(url, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Login response:", res.data);
      console.log("Status:", res.status);

      // Backend currently uses both "message" and "Message"
      const message =
        res.data?.message || res.data?.Message || "Login successful";

      showBootstrapToast(message, "success");

      // Store logged-in user/admin information
      if (role === "admin") {
        if (res.data?.admin) {
          localStorage.setItem("admin", JSON.stringify(res.data.admin));

          console.log("Stored Admin:", res.data.admin);
        }
      } else {
        if (res.data?.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));

          console.log("Stored User:", res.data.user);
        }
      }

      // Navigate only once
      setTimeout(() => {
        if (role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/user-dashboard");
        }
      }, 1000);
    } catch (error) {
      console.log("========== LOGIN ERROR ==========");
      console.log("Error:", error);
      console.log("Status:", error.response?.status);
      console.log("Response data:", error.response?.data);
      console.log("Response headers:", error.response?.headers);
      console.log("Request:", error.request);

      const backendMessage =
        error.response?.data?.message || error.response?.data?.Message;

      let errorMessage = backendMessage;

      if (!errorMessage) {
        if (error.response) {
          errorMessage = `Login failed (${error.response.status})`;
        } else if (error.request) {
          errorMessage =
            "Cannot connect to Flask server. Please make sure Flask is running.";
        } else {
          errorMessage = "Unable to login. Please try again.";
        }
      }

      showBootstrapToast(errorMessage, "danger");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Bootstrap 5 */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      {/* Custom Style */}
      <style>{`
        .login-page {
          min-height: 100vh;
          background: #f1f5f9;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
        }

        .login-card {
          width: 100%;
          max-width: 500px;
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .login-title {
          text-align: center;
          font-size: 38px;
          font-weight: bold;
          color: #0f172a;
          margin-bottom: 35px;
        }

        .form-label {
          font-weight: 600;
          color: #334155;
        }

        .form-control {
          border-radius: 10px;
          padding: 12px;
        }

        .input-group .form-control {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }

        .password-toggle {
          cursor: pointer;
          background: #0d6efd;
          color: white;
          border: 1px solid #0d6efd;
          min-width: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .login-btn {
          width: 100%;
          background: #0f172a;
          color: white;
          border: none;
          padding: 14px;
          border-radius: 10px;
          font-size: 18px;
          font-weight: 600;
          transition: 0.3s;
        }

        .login-btn:hover:not(:disabled) {
          background: #38bdf8;
        }

        .login-btn:disabled {
          background: #64748b;
          cursor: not-allowed;
        }

        .register-link {
          text-align: center;
          margin-top: 20px;
          color: #64748b;
        }

        .register-link a {
          color: #38bdf8;
          text-decoration: none;
          font-weight: 600;
        }

        .register-link a:hover {
          text-decoration: underline;
        }

        .custom-toast {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
          min-width: 320px;
          max-width: 450px;
          border-radius: 12px;
        }

        @media (max-width: 768px) {
          .login-card {
            padding: 25px;
          }

          .login-title {
            font-size: 30px;
          }

          .custom-toast {
            right: 10px;
            left: 10px;
            min-width: auto;
            max-width: none;
          }
        }
      `}</style>

      {/* Toast */}
      {showToast && (
        <div
          className={`toast show align-items-center text-white bg-${toastType} border-0 custom-toast`}
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body">{toastMessage}</div>

            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => setShowToast(false)}
              aria-label="Close"
            ></button>
          </div>
        </div>
      )}

      <div className="login-page">
        <div className="login-card">
          {/* Title */}
          <h1 className="login-title">
            {role === "admin" ? "Admin Login" : "User Login"}
          </h1>

          {/* Login Role */}
          <div className="mb-4">
            <label className="form-label d-block">Login As</label>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={(e) => {
                  setRole(e.target.value);
                  setShowPassword(false);
                }}
              />

              <label className="form-check-label">User</label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => {
                  setRole(e.target.value);
                  setShowPassword(false);
                }}
              />

              <label className="form-check-label">Admin</label>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email Address</label>

              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="form-label">Password</label>

              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  disabled={loading}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Register */}
          <div className="register-link">
            Don’t have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
