<?php
    function conectar() {
        $host= '127.0.0.1:3309';
        $user= 'root';
        $db= 'crud_sistema';
        $conn = mysqli_connect($host, $user);
        mysqli_select_db($conn, $db);
        return $conn;
    }
?>