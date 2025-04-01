@component('mail::message')
# Welcome to Our Platform!

Your account has been created by an admin. Here are your login details:

@component('mail::panel')
**Email**: {{ $email }}  
**Password**: {{ $password }}
@endcomponent

Please log in to verify your email and update your profile:

@component('mail::button', ['url' => $loginUrl])
Log In
@endcomponent

Thanks,  
{{ config('app.name') }}
@endcomponent