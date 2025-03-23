<?php

namespace App\Enums;

enum NotificationType : string
{
    case FRIEND_REQUEST = 'friend_request';
    case MESSAGE = 'message';
    case ROOM_INVITE = 'room_invite';
    case SYSTEM = 'system';
}
