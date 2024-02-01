function redirection(url){
    if(url === "portfolio"){
        console.log("portfolio clicked")
        window.open("https://olivier-jnk.github.io/Portfolio/", "_blank")
    }
    else if(url === "github"){
        window.open("https://github.com/olivier-jnk", "_blank")
    }
    else if(url === "mail" ){
        window.open("mailto:oliviertrouvain01@gmail.com", "_blank")
    }
}