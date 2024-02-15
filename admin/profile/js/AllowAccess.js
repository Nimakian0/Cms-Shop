if(document.cookie == ""){
    window.location ="../../users/Login.html"
}else if(document.cookie != "token=admin"){
    window.location = "../../"
}