import { useState } from "react";
import { Button,TextField,makeStyles,Container,Paper,FormHelperText } from "@material-ui/core";
import { useNavigate,Link } from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
    container: {
        padding: theme.spacing(5),
        marginTop: theme.spacing(10),
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        maxWidth: "600px",
    },
    errorText: {
        marginTop: theme.spacing(1),
        color: theme.palette.error.main
    },
}));

export default function CreateCategory(){
    const [name, setName] = useState("");
    const [error,setError] = useState("");
    const classes = useStyles();
    const navigate = useNavigate()

    
    async function fetchCategory(){
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:5000/categories/create", {
            method: "POST",
            body: JSON.stringify({
                name
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: token,
            },
        })
        const data = await response.json();
            if(data.message !== "Category created!"){
                setError(data.status);
                navigate('/')
            }
        console.log(data.message)
        setName("");
    };


    return(
        <div>
            <Container className={classes.container}component={Paper}>
            <TextField className={classes.textField} id="outlined-basic" label="Name" value={name} variant="outlined" size="small" onChange={(e)=>setName(e.target.value)}/>
            <Button style={{background:"#7FFF00"}} variant="contained" size="small" color="primary" type="submit" onClick={fetchCategory}>Submit</Button>
            {error && (
                <FormHelperText className={classes.errorText}>{error}</FormHelperText>
            )}
            </Container>
                <Link to="/categories"><p style={{textAlign:"center",marginTop:30}}>Go to Categories</p></Link>
        </div>
    )
}
