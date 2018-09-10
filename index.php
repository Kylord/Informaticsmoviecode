<?php
    $myString = "hello world";
    var_dump($myString);
    
    echo("1");
    
    
    
    $myString = 45;
    var_dump($myString);
    
    
    $output = "<p>My variable s value is $myString</p>" . "<p>This is the second line</p>";
    echo $output;
    
    $someInts = array(-1, 2, 6, 10);

    
    $someInts[40] = 26;
    
    $someInts[10] = 'hello';
    
    var_dump($someInts);
    
    
    $myMap = array('firstname' => 'JP', 'lastname' => 'Hourcade');
    
    var_dump($myMap);
    
?>