<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSettings extends Model
{
    protected $fillable = [
        'auto_enroll',
        'phone_number',
        'active_email',
        'address',
        'site_logo',
    ];
}
