<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSettings extends Model
{
    protected $fillable = [
        'auto_enroll',
        'active_email',
        'site_logo',
    ];
}
