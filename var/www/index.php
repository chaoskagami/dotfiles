<?php
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
?>
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf8" />
		<style>
		    a {
		        color: #eee;
		        text-decorate: none;
		    }
			body {
				font-family: sans;
				color: #eee;
                text-shadow:
                    -1px -1px 0 #111,
                    1px -1px 0 #111,
                    -1px 1px 0 #111,
                    1px 1px 0 #111;
    		}

			.content-ul {
				display: inline-block;
				vertical-align: middle;
				list-style-image: url(/img/bullet.png);
			}

			.primary {
				background-image: url(/img/yukari.jpg);
				background-attachment:fixed;
				background-size: cover;
				background-position: top;
			}

			.textsection {
				background: rgba(0,0,0,0.7);
				right: 0px;
				margin: 20px;
				align: right;
				position: absolute;
				min-width: 800px;
				min-height: 500px;
				padding: 20px;
				border-radius: 2px;
				box-shadow: 0px 0px 12px rgba(0,0,0,0.8);
			}

			.content-a {
				color: #eee;
				text-decoration: none;
			}
			.content-a:hover {
				color: #ccc;
				text-decoration: underline;
			}
			.shadowed {
				-webkit-filter: drop-shadow(0px 0px 25px rgba(0,0,0,0.5));
				filter: drop-shadow(0px 0px 25px rgba(0,0,0,0.5));
				filter: url(#drop-shadow);
				-ms-filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=12, OffY=12, Color='#444')";
				filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=12, OffY=12, Color='#444')";
			}
		</style>
		<script type="text/javascript" src="/js/jquery.js"></script>
	</head>
<body class='primary' id='main'>
	</div>
		<div class="textsection">
			<table style="width: 100%; max-width: 100%;">
				<tr>
				    <?php
					echo "<td id=\"top\" style=\"text-align: left; width: 10%; max-width: 10%;\"><a href=\"";
				        $UpDir = dirname($_SERVER['REQUEST_URI']);
						$EndSlash = ($UpDir == '/') ? '' : '/'; // if not docroot append a slash
						echo $UpDir.$EndSlash;
				    echo "\" class=\"content-a\"><h2>⌫</h2></a></td>";
				    ?>
				    <td>
			            <div id="content">
				            <script>
		    		            $( '#content' ).load('main.php', function(r,s,x) {});
	             		    </script>
        			    </div>
        			</td>
				</tr>
			</table>
		</div>
	</body>
</html>
