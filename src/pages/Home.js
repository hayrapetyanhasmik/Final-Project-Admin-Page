

export default function Home(){
    const externalImage = "https://img.freepik.com/free-vector/copy-space-bokeh-spring-lights-background_52683-55649.jpg?w=1060&t=st=1683058685~exp=1683059285~hmac=9da76d572a3c811a145ce0608a753ecd6bad3a72f29e359d0fb18b858dea94ac"
    return(
        <div style={{backgroundImage: `url(${externalImage})`,backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',width:"100%",height:"690px"}}>

        </div>
    )
}

