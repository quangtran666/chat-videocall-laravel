<?php

namespace App\Enums;

enum RoomRole : string
{
    case MEMBER = 'member';
    case MODERATOR = 'moderator';
    case ADMIN = 'admin';
}
