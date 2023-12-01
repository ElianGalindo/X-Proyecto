<?php
    include("../Config/conexion.php");
    $conn = conectar();
    $nombre = $_POST['nombre'];
    $usuario = $_POST['email'];
    $password = $_POST['password'];
    $nacimiento = $_POST['nacimiento'];

    //Verificar que el ususario exista
    $queryVerifica = "SELECT * from usuarios WHERE usuario='$usuario'";

    $validaCorreo = mysqli_query($conn, $queryVerifica); 
    if($validaCorreo->num_rows == 0) {
        //usuario no existe
        $passwordHash = password_hash($password, PASSWORD_BCRYPT);
        $queryInsert = "INSERT INTO usuarios VALUES(null, '$nombre', '$usuario', '$passwordHash', '$nacimiento')";
    
        $result = mysqli_query($conn, $queryInsert);
        if($result) {
            Header("Location: ../../home.html");
        } else {
            Header("Location: ../../index.html?error=true");
        }
    } else {
        //usuario existe
        Header("Location: ../../index.html?existe=true");
    }

   
?>