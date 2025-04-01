<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'first_name',
        'last_name',
        'other_name',
        'gender',
        'phone_number',
        'student_id',
        'address',
        'next_of_kin_phone_number',
        'next_of_kin_email',
        'relationship',
        'image'
    ];

    public function getUsername(){
        return trim($this->first_name . ' ' . $this->last_name);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($student) {
            if (!$student->student_id) {
                $prefix = 'ZCA/' . date('m-y') . '/';
                $lastStudent = static::orderBy('id', 'desc')->first();
                $sequence = $lastStudent ? (int)substr($lastStudent->student_id, -5) + 1 : 1;
                $student->student_id = $prefix . str_pad($sequence, 4, '0', STR_PAD_LEFT);

                while (static::where('student_id', $student->student_id)->exists()) {
                    $sequence++;
                    $student->student_id = $prefix . str_pad($sequence, 5, '0', STR_PAD_LEFT);
                }
            }
        });
    }
}
