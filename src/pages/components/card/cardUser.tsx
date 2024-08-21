import { EditSharp } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import EditUserModal from "../modal/editModal";

interface UserType {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export default function CardUser() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://reqres.in/api/users/");
        const data = await response.json();
        if (response.ok) {
          setUsers(data.data); // ดึงข้อมูลผู้ใช้จาก response และตั้งค่า state
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId: number) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "ลบข้อมูลสำเร็จ!",
          showConfirmButton: false,
          timer: 1500,
        });

        setUsers(users.filter((user) => user.id !== userId));
      } else {
        Swal.fire({
          icon: "error",
          title: "ลบข้อมูลล้มเหลว",
          text: "ไม่สามารถลบข้อมูลผู้ใช้ได้.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "เกิดข้อผิดพลาดในการลบข้อมูลผู้ใช้.",
      });
    }
  };

  const handleOpen = (user: UserType) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentUser(null);
  };
  const handleUpdateUser = (updatedUser: UserType) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {users.length === 0 ? (
        <>
          <p className="text-center col-span-2 ">ไม่พบข้อมูล</p>
        </>
      ) : (
        users.map((user) => (
          <Card
            key={user.id}
            variant="outlined"
            className="group hover:bg-sky-500 flex 	items-center relative"
          >
            <CardMedia
              className="w-40"
              component="img"
              height="140"
              image={user.avatar}
              alt={user.first_name}
            />
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                className="group-hover:text-white"
              >
                {user.first_name} {user.last_name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="group-hover:text-white"
              >
                {user.email}
              </Typography>
            </CardContent>
            <div className="absolute top-0 right-0">
              <div className="flex">
                <IconButton
                  className="absolute top-2 right-8 group-hover:text-white"
                  onClick={() => handleOpen(user)}
                  color="primary"
                >
                  <EditSharp fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(user.id)}
                  className="absolute top-2 right-0 group-hover:text-white"
                  color="error"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          </Card>
        ))
      )}
      <EditUserModal
        open={open}
        handleClose={handleClose}
        user={currentUser}
        handleUpdateUser={handleUpdateUser}
      />
    </div>
  );
}
