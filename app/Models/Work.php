<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Work extends Model
{
    protected $fillable = [
        'work_title',
        'work_desc',
        'image',
        'work_url'
    ];

}
