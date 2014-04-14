<?php

require_once './vendor/xamin/handlebars.php/src/Handlebars/Autoloader.php';
Handlebars\Autoloader::register();
use Handlebars\Handlebars;


Class Email {
  public static function send($params) {
    //check for required params
    $required = array('to','from', 'subject','message', 'context');
    foreach($required as $req) {
      if(!isset($params[$req])) {
        return array('error'=>'Missing the ' . $req .' parameter');
      }
    }

    //allow to have test emails sent to dev vs actual person
    $config = require('./config.php');
    if(isset($config['development']) && isset($config['development']['email'])) {
      $params['to'] = $config['development']['email'];
    }

    //Render handlebars templates
    $engine = new Handlebars;
    try {
      $to      = $engine->render($params['to']     , $params['context']); 
      $from    = $engine->render($params['from']   , $params['context']); 
      $subject = $engine->render($params['subject'], $params['context']); 
      $message = $engine->render($params['message'], $params['context']);        
    } catch(Exception $e) {
      return array('error'=>'invalid handlebars template');
    }
    
    //gen email headers
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    //add html headers, if message is in HTML
    if(stripos($message, '<html>') !== false) {
      $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
    }

    $headers .= 'From: ' . $from . "\r\n" . 
                'Reply-To: ' . $from . "\r\n" . 
                'X-Mailer: PHP/' . phpversion();

    if(mail($to, $subject, $message, $headers)) {
      return array('success'=>'Sent email to ' . $params['to']);
    } else {
      return array('error'=>'could not send email');
    }
  }
}
?>
 