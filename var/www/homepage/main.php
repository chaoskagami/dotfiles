        <link rel="stylesheet" style="text/css" href="/homepage/general.css" />

        <!-- To change theme, replace its name in following 4 lines  -->
        <link rel="stylesheet" style="text/css"    href="/homepage/colors.css" />
        <script type="text/javascript">var mascotPath = "/img/mascots/";</script>
        <script type="text/javascript"              src="/homepage/mascots.js.php"></script>

        <script type="text/javascript" src="/js/mascots-control.js"></script>
        <homepage> <!-- Random mascot image will be set as background-image by javascript -->
            <header>
                <h2>Welcome to the Internet, <span class="name-highlight">Goshujin-sama</span></h2>
                <p class="subtitle">Its not like I like you or anything</p>
            </header>
            <section class="searchContainer">
                <form class="searchForm" method="get" action="https://duckduckgo.com/">
                    <input class="searchBar search_duck" type="text" name="q" placeholder="DuckDuckGo" autofocus="autofocus" search_/>
                </form>
                <form class="searchForm" method="get" action="https://youtube.com/results">
                    <input class="searchBar search_youtube" type="text" name="search_query" placeholder="Youtube" search_/>
                </form>
                <form class="searchForm" method="get" action="https://en.wikipedia.org/w/index.php">
                    <input class="searchBar search_wikipedia" type="text" name="search" placeholder="Wikipedia (en)" search_/>
                </form>
            </section>
            <nav>
                <ul class="buttonList">
                    <li class="button button_grey"><a href="http://github.com/chaoskagami">Github</a></li>
                </ul>
                <ul class="columnList">
                    <li class="column">
                        <a>Server Index</a>
                        <ul id="data_insert">
							<script>
							$( '#data_insert' ).load('data.html', function(r,s,x) {
								if(s == 'error') {
									$( '#data_insert' ).append("<li><a href=\"\">Nothing to see.</a></li>");
								}
								<?php
								// Only do this if we aren't at root.
								if (strcmp(dirname($_SERVER["REQUEST_URI"]),"/")) {
    								echo "$( '#data_insert' ).append(\"<li><a href=\\\"";
    								$UpDir = dirname($_SERVER["REQUEST_URI"]);
    		                        echo dirname($UpDir);
    								echo "\\\">Up</a></li>\");";
		                        }
                                ?>
                                
							});
							</script>
                        </ul>
                    </li>
                    <li class="column">
                        <a>Sites</a>
                        <ul>
                            <li><a href="http://bakabt.me">Bakabt</a></li>
                            <li><a href="http://www.nyaa.se/">Nyaa</a></li>
                            <li><a href="http://bato.to/">Batoto</a></li>
                            <li><a href="http://exhentai.org/">Ex</a></li>
                            <li><a href="http://youtube.com/">Youtube</a></li>
                            <li><a href="http://niconico.jp/">Niconico</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </homepage>
