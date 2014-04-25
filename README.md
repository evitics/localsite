##Evitics##
Evitics is an event analytics platform which allows for digital checkins using a BuzzCard to gatech campus events.  

Installation instructions:
Getting a Development and Build Environment

OS 
First off you'll need a Linux or OS X based system, the following instructions are catered towards the Debian systems.  For OS X please install homebrew, and substitute apt-get with brew.

###Step 1: Installing the Apache, Mysql (or mariaDB), and PHP###
You can find detailed instructions from Digital Ocean: https://www.digitalocean.com/community/articles/how-to-install-linux-apache-mysql-php-lamp-stack-on-debian

```
sudo apt-get update && sudo apt-get install apache2 mysql-server php5 php-pear php5-suhosin php5-mysql
```

If you forgot to set the root password, simply issue the following command: 
```sudo mysql_secure_installation```

Once the following commands are done, test your PHP5 and Apache configuration by creating a file called info.php your web directory (usually /var/www):
In your terminal type:
```vim /var/www/info.php```

To write in vim press a (write mode), and type the following
```
<?php
    phpinfo();
?>
```

To save the file press esc (command mode), and then type :wq

Now in your web-browser navigate to localhost/test.php  Make sure that the PHP version listed on this page is >= 5.3.  If its not >=5.3, please seek help online on how to do so with your distro choice (or manually compile the packages).

###Step 2: Enabling mod_rewrite###
In your terminal execute the following command:
```
sudo a2enmod rewrite
```

Then you'll need to restart apache so that it loads the new config:
```
sudo apachectl restart
```

###Step 3: Getting the WebApp files###
For version control, Evitics is making use of git.  While you could download a .zip archive of the entire repository at github.com/evitics/localsite , getting updates will not be as easy.  J

To install git issue the following:
```
sudo apt-get install git
cd /var/www 
git clone https://github.com/evitics/localsite
```

You should now see the entire evitics/localsite inside /var/www/localsite

###Step 4: Configuring the API Config file for LDAP and Databases###
Copy the config-skeleton.php file to config.ph by doing the following commands:
```
cd /var/www/localsite/api
cp config-skeleton.php config.php
```

Then, fill out the database host, username, and password for each database.  If there is no database called jacketpages, evitics, or checkin please create the SQL in api/db_schema.  This can be done with phpmyadmin or mysql-client.

Once you've received your GTED (LDAP) username, and password, fill out the ldap configuration.

The field called adminUserAccounts will have permission to access the super-admin user permission files under api/admin.  These allow one to mass add user accounts manually.


###Step 5: Installing the webapp Package Management System###
The front-end webapp uses npm and bower to keep its packages up to date. 
We'll install bower using npm:
```
sudo apt-get install npm
```

Get any missing packages listed in packages.json, and update all packages to the most up-to-date syntax compatable version:
```
npm install
```

Install the bower package manager (globally)
```
sudo npm install -g bower
```

Get any missing packjages listed in bower.json, and update all of them to the most up-to-date syntax compatable version:
```
bower install
```

###Step 6: Getting the grunt distribution builder, and making the dist/ folder###
In our production environment, we want to reduce the number and size of our code files.  This is done to allow for the WebApp to load much faster.  Grunt.js uses node.js to read our dependency tree and build templates.js, source.min.js, and styles.min.js. When Grunt.js runs, it'll also pass the source code through a linter, which helps find code which doesn't correspond to the best-practice style guidelines (helping us find bugs).

First lets install node.js
Joyent, the mainter of Node.js, published the following guide: https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager

If you're using a Ubuntu distro, its as simple as issuing the following:
```
sudo apt-get install nodejs
```

If you're using Debian I'd suggest you use the backports or use the debian sid repo
For backports, simply issue the following command:
```
curl https://www.npmjs.org/install.sh | sudo sh
```

Now lets install grunt.js
```
sudo npm install -g grunt-cli
```

To build our distribution files run:
```
grunt
```

This will concatinate and minify our CSS, and JavaScript, as-well as compile all the handlebars templates into templates.js. Then, all of the dependency files (including our backend) are copied into dist/ .  If you'd like to see exactly whats going on,read the Gruntfile.js .

###Step 7: Moving dist/ files into production###
After you run grunt, simply issue the following command:
```cp -R /var/www/localsite/dist/* /var/www```

This will copy all of the distribution source code into your root web directory. To see the webapp, open your web-browser and navigate to localhost.
