import { useState, useEffect } from "react";
import { Button,TextField,FormControl,FormHelperText,makeStyles, Container,Paper, Select, MenuItem} from "@material-ui/core";
import { useNavigate, Link} from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
    container: {
        padding: theme.spacing(5),
        marginTop: theme.spacing(10),
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
        
    },
    textField: {
        marginBottom: theme.spacing(2),
        width: "336px"
    },
   
    button: {
        marginTop: theme.spacing(2),
        background:"#7FFF00"
    },
    errorText: {
        marginTop: theme.spacing(1),
        color: theme.palette.error.main
    },
    link: {
        marginTop: theme.spacing(1)
    }
}));


export default function CreateProduct (){
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [files,setFiles] = useState([]);
    const [description,setDescription] = useState("");
    const [categoryId,setCategoryId] = useState("");
    const [quantity,setQuantity] = useState("");
    const [categories,setCategories] = useState([]);
    const [error,setError] = useState("");
    const classes = useStyles();
    const navigate = useNavigate();
    

    async function submitProd(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("quantity", quantity);
        formData.append("CategoryId", categoryId);
        for (let i = 0; i < files.length; i++) {
        formData.append("photo", files[i]);
        }
        const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:5000/products/create", {
                method: "POST",
                body:formData,
                headers: {
                  //"Content-type": "application/json; charset=UTF-8",
                  Authorization: token,
                },
              })
            const data = await response.json();
                if(data.message !== "Product added"){
                    navigate('/')
                }
            if(data.error){
                setError(data.error);
            }
        setName("");
        setPrice("");
        setFiles("");
        setDescription("");
        setCategoryId("");
        setQuantity("");
    }
console.log(categoryId)

useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((res) => {
        setCategories(res);
      });
  }, []);

    return(
        <div>
        <Container className={classes.container} component={Paper} maxWidth="sm">
        <form className={classes.form} onSubmit={submitProd} >
            <FormControl className={classes.textField}>
                <TextField id="name" label="Name" value={name} variant="outlined" size="small" onChange={(e)=>setName(e.target.value)}/>
            </FormControl>
            <FormControl className={classes.textField}>
                <TextField id="img" label="Img" inputProps={{multiple:true}} type="file" name = "photo" variant="outlined" size="small" onChange={(e)=>setFiles(e.target.files)}/>
            </FormControl>
            <FormControl className={classes.textField}>
            <TextField id="outlined-basic" label="Description"  variant="outlined" value={description} size="small" onChange={(e) => setDescription(e.target.value)}/> 
            </FormControl>
            <FormControl className={classes.textField}>
                <TextField id="price" label="Price" value={price} variant="outlined" size="small" onChange={(e)=>setPrice(e.target.value)}/>
            </FormControl>
           
            
                <Select style={{width:336, height:40,marginBottom:20}} id="categoryId" label="CategoryId" value={categoryId} variant="outlined" size="small" onChange={(e)=>setCategoryId(e.target.value)}>
                    {categories.map((category) => (
                    <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
                    ))}
                </Select>
           
            <FormControl className={classes.textField}>
                <TextField id="quantity" label="Quantity" value={quantity} variant="outlined" size="small" onChange={(e)=>setQuantity(e.target.value)}/>
            </FormControl>
            
            <Button className={classes.button} variant="contained" type="submit">Submit</Button>
            {error && (
                <FormHelperText className={classes.errorText}>{error}</FormHelperText>
            )}
            
        </form>
        </Container>
        <Link to="/products"><p style={{textAlign:"center",marginTop:30}}>Go to Products</p></Link>
        </div>
    )
}