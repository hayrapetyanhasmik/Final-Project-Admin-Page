import { useState } from "react";
import { Button,TextField,FormControl,FormHelperText,makeStyles,Container,Paper } from "@material-ui/core";
import { useNavigate, Link } from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
    container: {
        padding: theme.spacing(10),
        marginTop: theme.spacing(15),
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
        maxWidth: "300px"
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


export default function Login (){
    const classes = useStyles();
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    

    async function submitLog(e){
        e.preventDefault();
            const response = await fetch("http://localhost:5000/users/login", {
                method: "POST",
                body: JSON.stringify({
                  email,
                  password
                }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              })
            const data = await response.json();
            localStorage.setItem('token',data.jwt);
                if(data.jwt && data.role===1){
                    navigate('/admin')
                }else if(data.jwt && data.role===0){
                    navigate('/')
                }
                if(data.err){
                setError(data.err);
                }
        setEmail("");
        setPassword("");
    }

    return(
        <Container className={classes.container} component={Paper} maxWidth="sm">
        <form className={classes.form} onSubmit={submitLog}>
            <FormControl className={classes.textField}>
                <TextField id="email" label="Email" value={email} variant="outlined" required size="small" onChange={(e)=>setEmail(e.target.value)}/>
            </FormControl>
            <FormControl className={classes.textField}>
                <TextField id="password" label="Password" type="password" value={password} required variant="outlined" size="small" onChange={(e)=>setPassword(e.target.value)}/>
            </FormControl>
            <Button className={classes.button} variant="contained" type="submit">Sign In</Button>
            <p className="text">Don't have an account?</p> <Link to ="/register">Sign Up</Link> 
            {error && (
                <FormHelperText className={classes.errorText}>{error}</FormHelperText>
            )}
        </form>
        </Container>
    )
}