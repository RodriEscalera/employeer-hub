"use client";
import React, { FC, useEffect, useState } from "react";
import Layout from "@/commons/Layout/Layout";
import { useAppSelector } from "@/state/dispatch-useSelector";
import { RootState } from "@/state/main.reducer";
import style from "./ManagementView.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { UserProps } from "@/types";
import { getUsers, deleteUser } from "@/services/user.service";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import ModalConfirmation from "@/commons/ModalConfirmation/ModalConfirmation";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Skeleton from "@mui/material/Skeleton";

const ManagementView: FC = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const router = useRouter();
  const [users, setUsers] = useState<UserProps[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<string>("");
  const handleGetUsers = async () => {
    const response = await getUsers();
    setUsers(response);
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  const redirectToEdit = (_id: string): void => {
    router.push(`/edit-user/${_id}`);
  };

  const handleOpenOrCloseModal = (isOpen: boolean, userId?: string) => {
    setIsOpenModal(isOpen);
    if (userId) setUserToDelete(userId);
  };

  const handleDeleteUser = async (): Promise<void> => {
    if (userToDelete) {
      await deleteUser(userToDelete);
      setUsers((prevState: UserProps[]) => {
        const removedList = prevState.filter(
          (user: UserProps) => user._id !== userToDelete
        );
        return removedList;
      });
      setUserToDelete("");
      setIsOpenModal(false);
    }
  };

  return (
    <>
      {user._id.length > 0 ? (
        <Layout className={style["layout"]}>
          <ModalConfirmation
            handleOk={() => handleDeleteUser()}
            handleClose={() => handleOpenOrCloseModal(false)}
            open={isOpenModal}
            title="Are you sure that you want delete this user?"
          />

          {users.length <= 0 ? (
            <Skeleton variant="rectangular" width={210} height={118} />
          ) : (
            <Box className={style["container-box"]}>
              <Box className={style["create-user-button-container"]}>
                <IconButton
                  onClick={() => router.push("/create-user")}
                  className={style["create-user-button"]}
                >
                  <AddCircleIcon className={style["create-user-icon"]} />
                </IconButton>
              </Box>

              <TableContainer
                className={style["container-table"]}
                component={Paper}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Employee ID</TableCell>
                      <TableCell align="left">Firstname</TableCell>
                      <TableCell align="left">Lastname</TableCell>
                      <TableCell align="left">DNI</TableCell>
                      <TableCell align="left">Email</TableCell>
                      <TableCell align="left">Phone</TableCell>
                      <TableCell align="left">Edit</TableCell>
                      <TableCell align="left">Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((element: UserProps, index: number) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {element._id}
                        </TableCell>
                        <TableCell align="left">{element.firstname}</TableCell>

                        <TableCell align="left">{element.lastname}</TableCell>
                        <TableCell align="left">{element.dni}</TableCell>
                        <TableCell align="left">{element.email}</TableCell>
                        <TableCell align="left">{element.phone}</TableCell>
                        <TableCell align="left">
                          {
                            <IconButton
                              onClick={() => redirectToEdit(element._id)}
                            >
                              <EditIcon />
                            </IconButton>
                          }
                        </TableCell>
                        <TableCell align="left">
                          {
                            <IconButton
                              onClick={() =>
                                handleOpenOrCloseModal(true, element._id)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Layout>
      ) : (
        <Layout>
          <h1>You do not have permissions to access this site</h1>
        </Layout>
      )}
    </>
  );
};

export default ManagementView;
