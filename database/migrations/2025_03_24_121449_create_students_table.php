<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->string('other_name', 100)->nullable();
            $table->enum('gender', ['Male', 'Female', 'Other'])->default('Male');
            $table->string('phone_number', 14)->nullable()->unique();
            $table->string('student_id', 20)->unique();
            $table->text('address');
            $table->string('next_of_kin_phone_number', 14);
            $table->string('next_of_kin_email', 100)->nullable();
            $table->enum('relationship', ['Parent', 'Spouse', 'Sibling', 'Guardian', 'Other'])->default('Parent');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('image');
            $table->boolean('isAlumni')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
