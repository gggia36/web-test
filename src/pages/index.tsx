import { DoneAllSharp, Visibility, VisibilityOff } from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [registerStep, setRegisterStep] = useState("stepLoginType");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();

    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.href = "/home";
        });
      } else {
        Swal.fire({
          customClass: {
            confirmButton: "btn-swal2-error",
          },
          confirmButtonText: "ลองใหม่อีกครั้ง",
          icon: "error",
          title: "กรุณาลองใหม่อีกครั้ง",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง.",
      });
    }
  };

  const handleRegister = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "สมัครสมาชิกสำเร็จ!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setRegisterStep("stepLoginType");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "สมัครสมาชิกล้มเหลว",
          text: data.error || "เกิดข้อผิดพลาดในการสมัครสมาชิก",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง.",
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center background-box ">
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row w-3/4 max-w-4xl bg-opacity-60">
        {/* Left Side */}
        <div className="md:w-1/2 p-10  text-white border-right">
          <ul className="space-y-4 mt-10">
            <li>
              <div className="flex items-center space-x-3">
                <IconButton color="primary">
                  <DoneAllSharp fontSize="small" />
                </IconButton>
                <div>
                  <p className="text-sm text-slate-500	">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center space-x-3">
                <IconButton color="primary">
                  <DoneAllSharp fontSize="small" />
                </IconButton>
                <div>
                  <p className="text-sm text-slate-500	">
                    is simply typesetting industry.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center space-x-3">
                <IconButton color="primary">
                  <DoneAllSharp fontSize="small" />
                </IconButton>
                <div>
                  <p className="text-sm text-slate-500	">Lorem Ipsum</p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center space-x-3">
                <IconButton color="primary">
                  <DoneAllSharp fontSize="small" />
                </IconButton>
                <div>
                  <p className="text-sm text-slate-500	">
                    Lorem Ipsum is simply dummy text of the printing and
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 p-10">
          {/* <form>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  E-mail address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Sign Up
              </button>
            </div>
          </form> */}

          {registerStep === "stepLoginType" ? (
            <>
              <h2 className="text-2xl text-slate-700		mt-3">Welcome to login.</h2>
              <form className="max-w-sm mx-auto pt-6" onSubmit={handleLogin}>
                <div className="mb-5">
                  <TextField
                    type="email"
                    id="email"
                    margin="normal"
                    fullWidth
                    label="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-5">
                  <FormControl className="w-full" variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      onChange={(e) => setPassword(e.target.value)}
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="text-white bg-zinc-950 hover:bg-zinc-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-32 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    submit
                  </button>
                </div>

                <div className="text-center mt-4">
                  <p className="text-xs">
                    are you not a member yet?
                    <span
                      className="text-rose-700 cursor-pointer ml-1"
                      onClick={() => setRegisterStep("stepRegisterType")}
                    >
                      register
                    </span>
                  </p>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl text-slate-700		mt-3">
                Create an account.
              </h2>
              <form className="max-w-sm mx-auto pt-6" onSubmit={handleRegister}>
                <div className="mb-5">
                  <TextField
                    type="email"
                    id="email"
                    margin="normal"
                    fullWidth
                    label="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-5">
                  <FormControl className="w-full" variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      onChange={(e) => setPassword(e.target.value)}
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="text-white bg-zinc-950 hover:bg-zinc-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-32 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    submit
                  </button>
                </div>

                <div className="text-center mt-4">
                  <p className="text-xs">
                    are you a member?
                    <span
                      className="text-rose-700 cursor-pointer ml-1"
                      onClick={() => setRegisterStep("stepLoginType")}
                    >
                      {" "}
                      login
                    </span>
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
