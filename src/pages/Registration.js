import { useState } from "react";
import { Button,TextField,FormControl,FormHelperText,makeStyles, Container,Paper} from "@material-ui/core";
import { useNavigate,Link } from 'react-router-dom';

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
    },
    button: {
        marginTop: theme.spacing(2),
        background:"#7CFC00"
    },
    errorText: {
        marginTop: theme.spacing(1),
        color: theme.palette.error.main
    },
    link: {
        marginTop: theme.spacing(1)
    }
}));


export default function Registration (){
    const classes = useStyles();
    const navigate = useNavigate()
    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    

    async function submitReg(e){
        e.preventDefault();
            const response = await fetch("http://localhost:5000/users/register", {
                method: "POST",
                body: JSON.stringify({
                  userName,
                  email,
                  password
                }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              })
            const data = await response.json();
                if(data.message === "User created"){
                    navigate('/login')
                }
                if(response.status===400){
                    setError(data.err)
                }
                if(data.err){
                    setError(data.err);
                }
                
   
        setUserName("");
        setEmail("");
        setPassword("");
    }

    return(
        <Container className={classes.container} component={Paper} maxWidth="sm">
        <form className={classes.form} onSubmit={submitReg} >
            <FormControl className={classes.textField}>
                <TextField id="userName" label="Username" value={userName} variant="outlined" required size="small" onChange={(e)=>setUserName(e.target.value)}/>
            </FormControl>
            <FormControl className={classes.textField}>
                <TextField id="email" label="Email" value={email} variant="outlined" required size="small" onChange={(e)=>setEmail(e.target.value)}/>
            </FormControl>
            <FormControl className={classes.textField}>
                <TextField id="password" label="Password" type="password" value={password} required variant="outlined" size="small" onChange={(e)=>setPassword(e.target.value)}/>
            </FormControl>
            <Button className={classes.button} variant="contained" type="submit">Sign Up</Button>
            {error && (
                <FormHelperText className={classes.errorText}>{error}</FormHelperText>
            )}
            <p className={classes.link}>Already have an account? <Link to="/login">Login</Link></p>
        </form>
        </Container>
    )
}