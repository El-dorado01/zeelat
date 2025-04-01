<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alumni extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone_number',
        'graduated_on',
        'remarks',
        'image',
    ];
}
