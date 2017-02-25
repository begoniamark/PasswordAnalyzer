$dbopts = parse_url(getenv('postgres://bqgomzdrhhcxst:ae6b7d0f060141d516df12af90f64e91d43f41f3b536589877617ecd6afe7067@ec2-54-243-214-198.compute-1.amazonaws.com:5432/dajdgviad5ela5'));
$app->register(new Herrera\Pdo\PdoServiceProvider(),
               array(
                   'pdo.dsn' => 'pgsql:dbname='.ltrim($dbopts["password_analyzer"],'/').';host='.$dbopts["ec2-54-243-214-198.compute-1.amazonaws.com"] . ';port=' . $dbopts["5432"],
                   'pdo.username' => $dbopts["bqgomzdrhhcxst"],
                   'pdo.password' => $dbopts["ae6b7d0f060141d516df12af90f64e91d43f41f3b536589877617ecd6afe7067"]
               )
);