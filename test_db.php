<?php

require __DIR__ . '/vendor/autoload.php';

// Bootstrap Laravel
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Http\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;

$caPath = __DIR__ . '/isrgrootx1.pem';
echo "CA Path: $caPath\n";
echo "File Exists: " . (file_exists($caPath) ? 'Yes' : 'No') . "\n";

try {
    $pdo = DB::connection()->getPdo();
    echo "Connected successfully to " . DB::connection()->getDatabaseName() . "\n";
} catch (\Exception $e) {
    echo "Connection failed: " . $e->getMessage() . "\n";
}