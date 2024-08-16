import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Index() {
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
    <>
      <div className="background-box flex justify-center items-center opacity-75">
        <div className="box-register relative w-4/5 sm:w-2/5 bg-transparent rounded-lg border border-white h-3/6 drop-shadow-md flex justify-center items-center">
          {registerStep === "stepLoginType" ? (
            <div className="py-16 w-4/5">
              <h1 className="text-5xl	text-center mb-3">welcome</h1>
              <h1 className="text-center text-lg	">login</h1>
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
            </div>
          ) : (
            <div className="py-16 w-4/5">
              <h1 className="text-center text-lg	">register</h1>
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
            </div>
          )}
        </div>
      </div>
    </>
  );
}
