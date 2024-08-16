import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface EditUserModalProps {
  open: boolean;
  handleClose: () => void;
  user: UserType | null;
  handleUpdateUser: (updatedUser: UserType) => void;
}

// const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

export default function EditUserModal({
  open,
  handleClose,
  user,
  handleUpdateUser,
}: EditUserModalProps) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    }
  }, [user]);

  const handleEditSubmit = async () => {
    if (user) {
      try {
        const response = await fetch(`https://reqres.in/api/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const updatedUser = await response.json();
          Swal.fire({
            icon: "success",
            title: "แก้ไขข้อมูลสำเร็จ!",
            showConfirmButton: false,
            timer: 1500,
          });

          handleUpdateUser(updatedUser);
          handleClose();
        } else {
          Swal.fire({
            icon: "error",
            title: "แก้ไขข้อมูลล้มเหลว",
            text: "ไม่สามารถแก้ไขข้อมูลผู้ใช้ได้.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "เกิดข้อผิดพลาดในการแก้ไขข้อมูลผู้ใช้.",
        });
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="box-modal">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          User Information
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          label="First Name"
          value={formData.first_name}
          onChange={(e) =>
            setFormData({ ...formData, first_name: e.target.value })
          }
        />
        <TextField
          margin="normal"
          fullWidth
          label="Last Name"
          value={formData.last_name}
          onChange={(e) =>
            setFormData({ ...formData, last_name: e.target.value })
          }
        />
        <TextField
          margin="normal"
          fullWidth
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <div className="text-center">
          <button
            onClick={handleEditSubmit}
            className="text-white mt-4 bg-zinc-950 hover:bg-zinc-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-32 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            submit
          </button>
        </div>
      </div>
    </Modal>
  );
}
