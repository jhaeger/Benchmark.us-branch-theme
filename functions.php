<?php
/**
 * @package Make Child
 */

/**
 * The theme version.
 */
define( 'TTFMAKE_CHILD_VERSION', '1.6.1' );

/**
 * Turn off the parent theme styles.
 *
 * If you would like to use this child theme to style Make from scratch, rather
 * than simply overriding specific style rules, simply remove the '//' from the
 * 'add_filter' line below. This will tell the theme not to enqueue the parent
 * stylesheet along with the child one.
 */
//add_filter( 'make_enqueue_parent_stylesheet', '__return_false' );

/**
 * Add your custom theme functions here.
 */
function benchmark_styles() {
    wp_enqueue_style('benchmark', get_home_url() . '/wp-content/themes/make-child/style.css', '1.6.1');    
}
add_action( 'wp_enqueue_scripts', 'benchmark_styles' );

function wow_scripts() {
    if ( is_page('lifetime-loan')) {
        wp_enqueue_script('wow', get_home_url() . '/wp-content/themes/make-child/js/wow.min.js', array(), '1.1.0', true);
        wp_enqueue_style('animatecss', get_home_url() . '/wp-content/themes/make-child/animate.min.css', array(), '3.4.0', false);
    }
}
add_action( 'wp_enqueue_scripts', 'wow_scripts');

function applyUI() {
    if ( is_page('apply')) {
        wp_enqueue_script('applyUI', get_home_url() . '/wp-content/themes/make-child-branch/js/applyUI.js', array(), '1.0', true);
        /*iframeResizer to resize the floify iframe*/
        wp_enqueue_script('iframeresizer', get_home_url() . '/wp-content/themes/make-child/assetts/iframeResizer.min.js', array('jquery'), '1.0', true);
        /*script to call the iframeResizer on the iframe, and remove the height attr*/
        wp_enqueue_script('activateIframeResizer', get_home_url() . '/wp-content/themes/make-child/assetts/activateIframeResizer.js', array('jquery'), '1.0', true);
    }
}
add_action( 'wp_enqueue_scripts', 'applyUI');

function branchHome() {
    if ( is_front_page()) {
        wp_enqueue_script('branchhome', get_home_url() . '/wp-content/themes/make-child-branch/js/branchhome.js', 'jQuery', '1.0', true);
    }
}
add_action( 'wp_enqueue_scripts', 'branchHome');

function teamPage() {
    if ( is_page('our-team')) {
        wp_enqueue_script('teampage', get_home_url() . '/wp-content/themes/make-child-branch/js/teampage.js', 'jQuery', '1.0', true);
    }
}
add_action( 'wp_enqueue_scripts', 'teamPage');

// branchHide class to remove content from blog posts intended only for network sites
function branch_scripts() {
    wp_enqueue_script('branchHide', get_stylesheet_directory_uri() . '/js/branchHide.js', array(), '1.0', true);
}
add_action( 'wp_enqueue_scripts', 'branch_scripts');


function benchmark_login() { ?>
    <style type="text/css">
        .login{
            background-image:url(../wp-content/uploads/2015/09/sail-into-the-blue-optimized.jpg);
            background-size:cover;
            background-position:left bottom;
            padding-top:12%;
            overflow:hidden;
            
        }
        @media screen and (max-width:800px){
            .login{
                background-position:center bottom;
            }
        }
        .login h1 a {
            background-image:url(../wp-content/uploads/2015/07/BenchmarkMortgage72dpi.png);
            width:320px;
            background-size:300px;
            background-repeat:no-repeat;
            background-color:rgba(255, 255, 255, 0.1);
            background-position:center;
            /*border-radius:10px;
            box-shadow:0 1px 8px rgba(0, 0, 0, 0.5);*/
            border:2px solid rgba(6, 35, 115, 0.8);
        }
        .login form {
            background-color:rgba(255, 255, 255, 0.6);
            box-shadow:0 2px 20px rgba(0, 0, 0, 0.4);
        }
        .wp-core-ui .button-primary {
            background-color:#ddd;
            border:none;width:120px;
            box-shadow:0 1px 2px rgba(0, 0, 0, 0.4);
            color:#3f6a9a;
            text-shadow:0 1px 0 #eee;
            font-size:1rem;
        }
        .wp-core-ui .button-primary:hover {
            background-color:#3f6a9a;
            color:#fff;
            box-shadow:0 1px 2px rgba(0, 0, 0, 0.8);
            font-weight:600;
            text-shadow:none;
        }
        .login #login_error {
            background-color: rgba(255, 0, 0, 0.1);
            border: 1px solid #f00;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
            margin-bottom:-10px;
            color:#333;
        }
        .login input {
            background-color:rgba(255, 255, 255, 0.95);
        }
        .login input:focus {
            border-color: #ddd;
            box-shadow:inset 0 0 2px rgba(63, 106, 154, 0.9);
            background-color:rgba(255, 255, 255, 0.97);
        }
        .login #backtoblog a, .login #nav a {
            color:#062373;
            background-color:rgba(255, 255, 255, 0.5);
            border-radius:3px;
            padding:5px;
        }
        .login #nav {
            padding:0;
        }
        .login #nav a {
            padding:5px 40px;
        }
        .login #backtoblog {
            padding:0;
        }
    </style>
<?php }
add_action( 'login_enqueue_scripts', 'benchmark_login' );

/*
 * Modify HTTP header
 */
function add_header_access_control_allow_origin($headers) {

    // var_dump($headers); #=> if you want to see the current headers...  

    if (!is_admin()) {
        $headers['Access-Control-Allow-Origin'] = '*.benchmark.us/';    
    }

    return $headers;     
}
add_filter('wp_headers', 'add_header_access_control_allow_origin');

//enqueue Cycle2 plugin.
/*
function benchmark_branch_front_page_scripts() {
    if( is_front_page() )
    {
        wp_enqueue_script( 'cycle2', get_stylesheet_directory_uri() . '/js/libs/cycle2/jquery.cycle2.min.js');
        wp_enqueue_script( 'cycle2', get_stylesheet_directory_uri() . '/js/libs/cycle2/jquery.cycle2.center.js');
    }
}
add_action( 'wp_enqueue_scripts', 'benchmark_branch_front_page_scripts' );*/