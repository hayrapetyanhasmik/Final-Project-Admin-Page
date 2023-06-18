import { useState, useEffect } from "react";
import { useNavigate, Link} from 'react-router-dom';
import { Box, Modal, Typography, Button,TextField,makeStyles,TableContainer,Paper,Table, TableBody,TableCell,TableRow,TableHead } from "@material-ui/core";
import {DeleteOutlined,Edit} from "@material-ui/icons";


const useStyles = makeStyles((theme)=>({
  box: {
    padding: "15px",
    position: "absolute",
    top: "30%",
    left: "40%",
    width: "350px",
    height: "300px",
    transform: "translate(-10%,-10%)",
    backgroundColor: "lightBlue",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  }
}));

export default function Categories(){
    const navigate = useNavigate()
    const classes = useStyles();
    const [category, setCategory] = useState([]);
    const [del,setDel] = useState(false);
    const [name,setName] = useState("");
    const [open,setOpen] = useState(false);
    const [updated,setUpdated] = useState(false);
    const [defineId,setDefineId] = useState(null);
   
    useEffect(() => {
      fetch("http://localhost:5000/categories")
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            setCategory(res);
          });
      }, [del,updated]);
  
      const deleteCategory = async (id) => {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(
            `http://localhost:5000/categories/delete/${id}`,{
              method: "DELETE",
              body: JSON.stringify({
                id,
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: token,
              },
            }
          );
          await response.json();
          
        } catch (err) {
          console.log(err);
        }
        setDel(!del);
      };
   
  
      const updateCategory = async (id) => {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(
            `http://localhost:5000/categories/update/${id}`,
            {
              method: "PUT",
              body: JSON.stringify({
                name,
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: token,
              },
            }
          );
          const data = await response.json();
          if(data.message !== "Category updated!"){
            navigate('/');
          }
        } catch (err) {
          console.log(err);
        }
        setUpdated(!updated)
      };
  
      
      useEffect(() => {
        const token = localStorage.getItem('token');
        const getCategory = async ()=>{
          try{
            if(defineId){
            const response = await fetch(`http://localhost:5000/categories/getOne/${defineId}`,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: token,
              },
            })
            const data = await response.json();
              setName(data.name);
            }
          }catch(err){
            console.log(err);
          }
        };
        getCategory();
      },[defineId]);

    return(
      <div>
    <TableContainer className={classes.container} component={Paper}>
      <Table aria-label="simple table" >
        <TableHead style={{background:"#7FFF00"}}>
          <TableRow >
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">CategoryName</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {category?.map((categ) => (
            <TableRow key={categ.id} >
              <TableCell align="left">{categ.id}</TableCell>
              <TableCell align="left" value={name} onChange={(e) => setName(e.target.value)}>{categ.name}</TableCell>
              <TableCell align="right">
              <Edit onClick={()=>{setOpen(true);setDefineId(categ.id)}}/>
              <DeleteOutlined onClick={() => deleteCategory(categ.id)}/>
              </TableCell>
            </TableRow>
          ))}
            <Modal open={open} onClose={()=>setOpen(false)} aria-labelledby="modal-title" color="primary">
              <Box className={classes.box}>
                  <Typography id="modal-title" variant="h6" align="center">Edit</Typography>
                  <TextField id="outlined-basic" label="Name"  variant="outlined" value={name} size="small"  style={{ marginBottom: 100}} onChange={(e) => setName(e.target.value)}/> 
                  <Button style={{background:"#7CFC00"}} type="submit" variant="contained"  size="small" onClick={()=>updateCategory(defineId)}>Save</Button>
                  <Button style={{background:"#7CFC00"}} variant="contained"  size="small" onClick={()=>setOpen(false)}>Close</Button>
                  </Box>
            </Modal>
        </TableBody>
      </Table>
    </TableContainer>
    <Link to="/admin"><p style={{textAlign:"right",marginTop:30}}>Go back to Admin page</p></Link>
    </div>
    )
}