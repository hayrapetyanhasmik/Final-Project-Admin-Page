import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';



export default function Header(){
    const navigate = useNavigate();
    function handleLogOut(){
        localStorage.removeItem('token');
        navigate('/')
    }
    return(
        <div style={{height: "30px", display:"flex",justifyContent:"flex-start", gap:"30px", marginTop:"10px", marginBottom: "40px"}}>
            <Button style={{background:"#7CFC00"}} variant="contained" size="small"  onClick={()=>navigate('/')}>Home</Button> 
            <Button style={{background:"#7CFC00"}} variant="contained" size="small"  onClick={()=>navigate('/admin')}>Admin</Button>
            <Button style={{background:"#7CFC00"}} variant="contained" size="small"  onClick={()=>navigate('/register')}>Sign Up</Button> 
            <Button  style={{background:"#7CFC00"}} variant="contained" size="small" onClick={()=>navigate('/login')}>Log In</Button> 
            <Button style={{background:"#7CFC00"}} variant="contained" size="small"  onClick={()=>navigate('/users')}>Users</Button>
            <Button style={{background:"#7CFC00"}} variant="contained" size="small"  onClick={()=>navigate('/categories')}>Categories</Button>
            <Button style={{background:"#7CFC00"}} variant="contained" size="small"  onClick={()=>navigate('/createCategory')}>Create Category</Button>
            <Button style={{background:"#7CFC00"}} variant="contained" size="small"  onClick={()=>navigate('/products')}>Products</Button>
            <Button style={{background:"#7CFC00"}} variant="contained" size="small"  onClick={()=>navigate('/createProduct')}>Create Products</Button>
            <Button style={{background:"red", position:"absolute", right:"13px"}} variant="contained" size="small" onClick={handleLogOut}>Log Out</Button> 
        </div>
    )
}