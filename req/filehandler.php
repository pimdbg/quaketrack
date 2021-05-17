<?php
    $earthquakeLink='https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';

    if(!empty($_GET['maxmagnitude'] && !empty($_GET['minmagnitude']))){
        if(is_float((float)$_GET['maxmagnitude']) && is_float((float)$_GET['minmagnitude'])){
            if($_GET['maxmagnitude']>= 0 && $_GET['maxmagnitude'] < 10.1){
                if($_GET['minmagnitude']>=0 && $_GET['minmagnitude'] < 10.1){
                    $query['minMagnitude']= 'minmagnitude='.$_GET['minmagnitude'];
                    $query['maxMagnitude']= 'maxmagnitude='.$_GET['maxmagnitude'];
                }
            }
        }
    }
    if(!empty($_GET['longitude']) && !empty($_GET['latitude'] && !empty($_GET['maxradiuskm']))){
        if($_GET['longitude']!=='null' && $_GET['latitude']!=='null' && (int)$_GET['maxradiuskm']!==0){
            if(is_int((int)$_GET['maxradiuskm'])){
                if((int)$_GET['maxradiuskm']>0 && (int)$_GET['maxradiuskm']<1501){
                    $query['latitude']= 'latitude='.$_GET['latitude'];
                    $query['longitude']= 'longitude='.$_GET['longitude'];
                    $query['maxRadiusKm']= 'maxradiuskm='.$_GET['maxradiuskm'];
                }
            }
        }
    }
    if(!empty($_GET['starttime']) && !empty($_GET['endtime'])){
        preg_match_all('/[^\/]*/',$_GET['starttime'], $filtered);
        foreach($filtered[0] as $xyz){
            if((int)$xyz > 0){
                $content[]= $xyz;
            }
        }
        $query['startTime']='starttime='.$content[2].'-'.$content[1].'-'.$content[0];
        
        if(!empty($filtered)){
            unset($filtered);
            unset($content);
        }

        preg_match_all('/[^\/]*/',$_GET['endtime'], $filtered);
        foreach($filtered[0] as $xyz){
            if((int)$xyz > 0){
                $content[]= $xyz;
            }
        }
        $query['endTime']='endtime='.$content[2].'-'.$content[1].'-'.$content[0];
    }
    if(!empty($_GET['limit'])){
        if(is_int((int)$_GET['limit'])){
            if((int)$_GET['limit']>0 && (int)$_GET['limit']<500){
                $query['limit']='limit='.$_GET['limit'];
            }
        }
    }

    foreach($query as $xyz){
        if(!empty($xyz)){
            $earthquakeLink=$earthquakeLink.'&'.$xyz;
        }
    }

    $printed=file_get_contents($earthquakeLink);
    echo($printed);
    
?>