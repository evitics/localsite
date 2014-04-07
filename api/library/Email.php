<?php
Class Email {
  public static function send($params) {
    //check for required params
    $required = array('to','from', 'subject','message');
    foreach($required as $req) {
      if(!isset($params[$req])) {
        return array('error'=>'Missing the ' . $req .' parameter');
      }
    }
    
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    
    //add html headers, if message is in HTML
    if(stripos($params['message'], '<html>') !== false) {
      $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
    }

    $headers .= 'From: ' . $params['from'] . "\r\n" . 
                'Reply-To: ' . $params['from'] . "\r\n" . 
                'X-Mailer: PHP/' . phpversion();

    if(mail($params['to'], $params['subject'], $params['message'], $headers)) {
      return array('success'=>'Sent email to ' . $params['to']);
    } else {
      return array('error'=>'could not send email');
    }
  }
}
?>
 