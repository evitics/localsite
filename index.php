<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,initial-scale=1">

  <title>Evitics</title>

  <!-- Application styles. -->
  <!-- build:[href] /styles.min.css -->
  <link rel="stylesheet" href="/app/styles/index.css">
  <!-- /build -->
</head>

<body>
  <!-- Application container. -->
  <div class="off-canvas-wrap">
    <!-- If no javascript give warning -->
    <noscript>Please enable javascript</noscript>

    <div id="inner-wrapping" class="inner-wrap">
      <!-- Full Screen Navbar -->
      <div class="sticky">
        <nav class="top-bar hide-for-small hide-for-medium NavView" data-topbar></nav>
      </div>

      <!-- Mobile Side Menu (top bar) -->
      <div class="sticky">
        <nav class="tab-bar show-for-small-up hide-for-large-up NavView">
          <section class="left-small">
            <a class="left-off-canvas-toggle menu-icon" ><span></span></a>
          </section>
          <section class="middle tab-bar-section">
            <h1 class="title">Evitics</h1>
          </section>
        </nav>
      </div>
      
      <!--Mobile side menu content (left pane which slides) -->
      <aside class="left-off-canvas-menu NavView"></aside>
      
      <!-- Main site content -->
      <main class="site-content row" role="main" >
      </main>
      
      <a class="exit-off-canvas"></a>
    </div>
  </div>
  <script>
    //PHP should write the username here
    var username = "<?php 
	$config = require("./api/config.php");
	if($config["development"]) {
		echo $config["development"]["username"];
	} else {
		echo $_ENV["REMOTE_USER"];
	}
    ?>";
  </script>
  <script>
    var debug = null; //debug variable
    //make sure that the side mobile nav is at least the full window height
    (function() {
      document.getElementById('inner-wrapping').style.minHeight = window.innerHeight + 'px';
    })();

  </script>
  <!-- Application source. -->
  <!-- build:[src] /source.min.js -->
  <script data-main="/app/main" src="/vendor/bower/requirejs/require.js"></script>
  <!-- /build -->
</body>
</html>
