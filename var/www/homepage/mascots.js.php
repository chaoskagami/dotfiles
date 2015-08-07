var mascotList = [ <?php
	// Yes, js.php. We preprocess this directory.

    if ($handle = opendir('/var/www/img/mascots')) {
        $prev = false;
        while (false !== ($entry = readdir($handle))) {
            if (!strcmp($entry, "..") || !strcmp($entry, "."))
                continue;
            if ($prev !== false) {
                echo ", ";
            }
            echo "'$entry'";
            $prev = $entry;
        }
    }
?> ];
