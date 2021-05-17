<?php
    $searched=$_GET['searched'];
    $locations='http://api.geonames.org/searchJSON?orderBy=relevance&maxRows=5&cities=cities5000&username=edvcsdefv';
    $returnfile=file_get_contents($locations.'&name_startsWith='.$searched);

    echo($returnfile);
?>