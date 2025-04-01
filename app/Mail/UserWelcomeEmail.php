<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserWelcomeEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $email;
    public $password;

    public function __construct($email, $password)
    {
        $this->email = $email;
        $this->password = $password;
    }

    public function build()
    {
        return $this->subject('Welcome to Our Platform')
                    ->markdown('emails.welcome')
                    ->with([
                        'email' => $this->email,
                        'password' => $this->password,
                        'loginUrl' => url('/login'),
                    ]);
    }
}