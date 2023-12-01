<?php
    include("../Config/conexion.php");
    $conn = conectar();
    $nombre = $_POST['nombre'];
    $usuario = $_POST['email'];
    $password = $_POST['password'];

    //Verificar que el ususario exista
    $queryVerifica = "SELECT * from usuarios WHERE usuario='$usuario'";

    $validaCorreo = mysqli_query($conn, $queryVerifica); 
    if($validaCorreo->num_rows == 0) {
        //usuario no existe
        $passwordHash = password_hash($password, PASSWORD_BCRYPT);
        $queryInsert = "INSERT INTO usuarios VALUES(null, '$nombre', '$apaterno', '$amaterno', '$usuario', '$passwordHash')";
    
        $result = mysqli_query($conn, $queryInsert);
        if($result) {
            Header("Location: ../../index.html");
        } else {
            Header("Location: ../../registrar.html?error=true");
        }
    } else {
        //usuario existe
        Header("Location: ../../registrar.html?existe=true");
    }

   
?>