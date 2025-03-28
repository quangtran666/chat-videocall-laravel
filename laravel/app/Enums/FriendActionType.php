<?php

namespace App\Enums;

enum FriendActionType: string
{
    case SEND = 'send';
    case ACCEPT = 'accept';
    case REJECT = 'reject';
    case CANCEL = 'cancel';
}
