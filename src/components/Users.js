import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TableContainer, Table, TableBody,TableCell,TableRow,TableHead, Paper} from "@material-ui/core";
import { DeleteOutlined, Edit } from "@material-ui/icons";


export default function Users(){
    const [user, setUser] = useState([]);
    useEffect(() => {
    fetch("http://localhost:5000/users")
        .then((res) => res.json())
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        });
    }, []);
    return(
        <div>
        <TableContainer  component={Paper}>
            <Table  sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{background:"#7FFF00"}}>
                <TableRow >
                    <TableCell align="left">ID</TableCell>
                    <TableCell align="center">UserName</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Role</TableCell>
                    <TableCell align="center">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {user?.map((user)=>(
                <TableRow  key={user.id}>
                    <TableCell align="left">{user.id}</TableCell>
                    <TableCell align="center">{user.userName}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.role}</TableCell>
                    <TableCell align="center">
                        <Edit />
                        <DeleteOutlined />
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
            </Table>
        </TableContainer>
        <Link to="/admin"><p style={{textAlign:"right",marginTop:30}}>Go back to Admin page</p></Link>
        </div>
    )
}