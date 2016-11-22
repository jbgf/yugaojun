<?php
    class class_weixin
{
    var $appid = APPID;
    var $appsecret = APPSECRET;

    //构造函数，获取Access Token
    public function __construct($appid = NULL, $appsecret = NULL)
    {
        if($appid && $appsecret){
            $this->appid = $appid;
            $this->appsecret = $appsecret;
        }

        //1. 数据库形式
        
        DROP TABLE IF EXISTS `wx_token`;
        CREATE TABLE IF NOT EXISTS `wx_token` (
          `id` int(1) NOT NULL,
          `type` varchar(20) NOT NULL,
          `expire` varchar(16) NOT NULL,
          `value` varchar(600) NOT NULL,
          PRIMARY KEY (`id`)
        ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

        INSERT INTO `wx_token` (`id`, `type`, `expire`, `value`) VALUES
        (1, 'access_token', '1425534992', 't3oyW9fRnOWKQHQhZXoEH-pgThhjmnCqTVpaLyUD'),
        (2, 'jsapi_ticket', '', '');
        
        $con = mysql_connect(MYSQLHOST.':'.MYSQLPORT, MYSQLUSER, MYSQLPASSWORD);
        mysql_select_db(MYSQLDATABASE, $con);
        $result = mysql_query("SELECT * FROM `wx_token` WHERE `type` = 'access_token'");
        while($row = mysql_fetch_array($result))
        {
            $this->access_token = $row['value'];
            $this->expires_time = $row['expire'];
            break;
        }
        if (time() > ($this->expires_time + 3600)){
            $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$this->appid."&secret=".$this->appsecret;
            $res = $this->http_request($url);
            $result = json_decode($res, true);
            $this->access_token = $result["access_token"];
            $this->expires_time = time();
            mysql_query("UPDATE `wx_token` SET `expire` = '$this->expires_time', `value` = '$this->access_token' WHERE `type` = 'access_token';");
        }

        //2. 缓存形式
        if (isset($_SERVER['HTTP_APPNAME'])){        //SAE环境，需要开通memcache
            $mem = memcache_init();
        }else {                                        //本地环境，需已安装memcache
            $mem = new Memcache;
            $mem->connect('localhost', 11211) or die ("Could not connect");
        }
        $this->access_token = $mem->get($this->appid);
        if (!isset($this->access_token) || empty($this->access_token)){
            $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$this->appid."&secret=".$this->appsecret;
            $res = $this->http_request($url);
            $result = json_decode($res, true);
            $this->access_token = $result["access_token"];
            $mem->set($this->appid, $this->access_token, 0, 3600);
        }

        //3. 本地写入
        $res = file_get_contents('access_token.json');
        $result = json_decode($res, true);
        $this->expires_time = $result["expires_time"];
        $this->access_token = $result["access_token"];

        if (time() > ($this->expires_time + 3600)){
            $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$this->appid."&secret=".$this->appsecret;
            $res = $this->http_request($url);
            $result = json_decode($res, true);
            $this->access_token = $result["access_token"];
            $this->expires_time = time();
            file_put_contents('access_token.json', '{"access_token": "'.$this->access_token.'", "expires_time": '.$this->expires_time.'}');
        }

        //4. 实时拉取
        $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$this->appid."&secret=".$this->appsecret;
        $res = $this->http_request($url);
        $result = json_decode($res, true);
        $this->access_token = $result["access_token"];
        $this->expires_time = time();
    }
?>