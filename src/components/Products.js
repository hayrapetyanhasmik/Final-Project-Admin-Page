import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Box, Modal, Typography, Button,TextField,makeStyles,TableContainer,Paper,Table, TableBody,TableCell,TableRow,TableHead, Select, MenuItem } from "@material-ui/core";
import {DeleteOutlined,Edit} from "@material-ui/icons";


const useStyles = makeStyles((theme)=>({
  box: {
    padding: "15px",
    position: "absolute",
    top: "30%",
    left: "30%",
    width: "450px",
    height: "1000px",
    transform: "translate(-10%,-10%)",
    backgroundColor: "lightBlue",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  }
}));

export default function Products(){
    const navigate = useNavigate();
    const classes = useStyles();
    const [product, setProduct] = useState([]);
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [files,setFiles] = useState("");
    const [description,setDescription] = useState("");
    const [categoryId,setCategoryId] = useState("");
    const [quantity,setQuantity] = useState("");
    const [del,setDel] = useState(false);
    const [open,setOpen] = useState(false);
    const [updated,setUpdated] = useState(false);
    const [defineId,setDefineId] = useState(null);
    const [categories,setCategories] = useState([]);

   
    useEffect(() => {
    fetch("http://localhost:5000/products")
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setProduct(res);
        });
    }, [del,updated]);


    const deleteProduct = async (id) => {
      console.log(id,'del')
    const token = localStorage.getItem('token');
      try {
        const response = await fetch(
          `http://localhost:5000/products/delete/${id}`,{
            method: "DELETE",
            body: id,
            headers: {
              //"Content-type": "multipart/form-data; charset=UTF-8",
               Authorization: token,
            },
          }
        );
        await response.json();
        setDel(true);
      } catch (err) {
        console.log(err);
      }
    };

    const updateProduct = async (id) => {
    const token = localStorage.getItem('token');
    console.log(id,'update');
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("CategoryId", categoryId);
    for (let i = 0; i < files.length; i++) {
      formData.append("photo", files[i]);
    }
      try {
        const response = await fetch(
          `http://localhost:5000/products/update`,
          {
            method: "PUT",
            body:formData,
            headers: {
              //"Content-type": "multipart/form-data; charset=UTF-8",
              Authorization: token,
            },
          }
        );
        const data = await response.json();
        if(data.message !== "Product updated successfully"){
          console.log(data.status);
          navigate('/');
        }
      } catch (err) {
        console.log(err);
      }
      setUpdated(!updated)

        setName("");
        setPrice("");
        setFiles("");
        setDescription("");
        setCategoryId("");
        setQuantity("");

    };
  useEffect(() => {
    const token = localStorage.getItem('token');
    const getProduct = async ()=>{
      try{
        if(defineId){
        const response = await fetch(`http://localhost:5000/products/getOne/${defineId}`,
        {
          method: "GET",
          headers: {
            //"Content-type": "multipart/form-data; charset=UTF-8",
            Authorization: token,
          },
        })
        const data = await response.json();
        console.log(data);
              setName(data.name);
              setPrice(data.price);
              setFiles(data.filePath);
              setDescription(data.description);
              setCategoryId(data.CategoryId);
              setQuantity(data.quantity);
        }
      }catch(err){
          console.log(err);
      }
    };
    getProduct();
  },[defineId]);
console.log(defineId,"id")

useEffect(() => {
  fetch("http://localhost:5000/categories")
    .then((res) => res.json())
    .then((res) => {
      setCategories(res);
    });
}, []);


  return(
    <div>
    <TableContainer component={Paper}>
      <Table aria-label="simple table" >
        <TableHead style={{background:"#7FFF00"}}>
          <TableRow >
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">ProductName</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product?.map((prod) => (
            <TableRow key={prod.id} >
              <TableCell align="center">{prod.id}</TableCell>
              <TableCell align="center" value={name} >{prod?.name}</TableCell>
              <TableCell>
              { prod?.Images?.map((image)=> <img key={image.id} src={`http://localhost:5000/images/${image.filePath}`} width='30px'/>)} 
              </TableCell>
              <TableCell align="center" >{prod.description}</TableCell>
              <TableCell align="center" > {prod.price}</TableCell>
              <TableCell align="center" >{prod.quantity}</TableCell>
              <TableCell align="center" >{prod.Category?.name}</TableCell> 
              <TableCell align="right">
              <Edit onClick={()=>{setOpen(true); setDefineId(prod.id)}}/>
              <DeleteOutlined onClick={() => deleteProduct(prod.id)}/>
              </TableCell>
            </TableRow>
          ))}
          <Modal open={open} onClose={()=>setOpen(false)} aria-labelledby="modal-title" color="primary">
                <Box className={classes.box}>
                    <Typography id="modal-title" variant="h6" align="center">Edit</Typography>

                    <TextField id="outlined-basic" label="ProductName"  variant="outlined" value={name}  size="small" onChange={(e) => setName(e.target.value)}/> 

                    <TextField id="img" label="Img" inputProps={{multiple:true}} type="file" name = "photo" variant="outlined" size="small" onChange={(e)=>setFiles(e.target.files)}/> 

                    <TextField id="outlined-basic" label="Description"  variant="outlined" value={description} size="small" onChange={(e) => setDescription(e.target.value)}/> 

                    <TextField id="outlined-basic" label="Price"  variant="outlined" value={price} size="small" onChange={(e) => setPrice(e.target.value)}/> 

                    <TextField id="outlined-basic" label="Quantity"  variant="outlined" value={quantity}  size="small" onChange={(e) => setQuantity(e.target.value)}/>

                    <Select style={{width:"100%", height:40,marginBottom:20}} id="categoryId" label="CategoryId" value={categoryId} variant="outlined" size="small" onChange={(e)=>setCategoryId(e.target.value)}>
                    {categories.map((category) => (
                    <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
                    ))}
                    </Select>

                    <Button type="submit" variant="contained" size="small" style={{ background:"#7CFC00"}} onClick={()=>updateProduct(defineId)}>Save</Button>
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