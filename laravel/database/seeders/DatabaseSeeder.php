<?php

namespace Database\Seeders;

use App\Enums\MessageType;
use App\Enums\NotificationType;
use App\Enums\RequestStatus;
use App\Enums\RoomRole;
use App\Models\Conversation;
use App\Models\Friend;
use App\Models\FriendRequest;
use App\Models\Message;
use App\Models\MessageFile;
use App\Models\MessageReaction;
use App\Models\Notification;
use App\Models\Room;
use App\Models\RoomMembership;
use App\Models\RoomRequest;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Random\RandomException;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create main test user
        $mainUser = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create additional users
        $users = User::factory(10)->create();
        $allUsers = $users->merge([$mainUser]);

        // Create rooms
        $rooms = Room::factory(5)
            ->sequence(fn ($sequence) => ['owner_id' => $allUsers->random()->id])
            ->create();

        // Create room memberships
        foreach ($rooms as $room) {
            // Add owner as admin
            RoomMembership::create([
                'room_id' => $room->id,
                'user_id' => $room->owner_id,
                'role' => RoomRole::ADMIN->value,
            ]);

            // Add random users as members
            $memberCount = random_int(2, 5);
            $randomUsers = $allUsers->where('id', '!=', $room->owner_id)->random($memberCount);

            foreach ($randomUsers as $user) {
                RoomMembership::create([
                    'room_id' => $room->id,
                    'user_id' => $user->id,
                    'role' => $this->getRandomRoomRole(),
                ]);
            }
        }

        // Create room join requests
        foreach ($rooms->where('is_private', true) as $privateRoom) {
            $memberIds = RoomMembership::where('room_id', $privateRoom->id)->pluck('user_id')->toArray();
            $nonMembers = $allUsers->whereNotIn('id', $memberIds);

            if ($nonMembers->count() > 0) {
                $requestCount = min(3, $nonMembers->count());
                $requestUsers = $nonMembers->random($requestCount);

                foreach ($requestUsers as $user) {
                    RoomRequest::create([
                        'room_id' => $privateRoom->id,
                        'user_id' => $user->id,
                        'status' => RequestStatus::PENDING->value,
                    ]);
                }
            }
        }

        // Create friend relationships
        $this->createFriendships($allUsers);

        // Create conversations
        $conversations = $this->createConversations($allUsers);

        // Create messages in rooms
        $this->createRoomMessages($rooms, $allUsers);

        // Create messages in conversations
        $this->createConversationMessages($conversations);

        // Create notifications
        $this->createNotifications($allUsers);
    }

    /**
     * Create friend relationships between users.
     */
    private function createFriendships($users)
    {
        // Create some accepted friend requests
        for ($i = 0; $i < 15; $i++) {
            $sender = $users->random();
            $receiver = $users->where('id', '!=', $sender->id)->random();

            // Skip if friendship already exists
            if (Friend::where('user_id', $sender->id)->where('friend_id', $receiver->id)->exists() ||
                Friend::where('user_id', $receiver->id)->where('friend_id', $sender->id)->exists()) {
                continue;
            }

            // Create accepted friend request
            FriendRequest::create([
                'sender_id' => $sender->id,
                'receiver_id' => $receiver->id,
                'status' => RequestStatus::ACCEPTED->value,
            ]);

            // Create friendship records (both ways)
            Friend::create([
                'user_id' => $sender->id,
                'friend_id' => $receiver->id,
            ]);

            Friend::create([
                'user_id' => $receiver->id,
                'friend_id' => $sender->id,
            ]);
        }

        // Create some pending friend requests
        for ($i = 0; $i < 5; $i++) {
            $sender = $users->random();
            $receiver = $users->where('id', '!=', $sender->id)->random();

            // Skip if friendship or request already exists
            if (Friend::where('user_id', $sender->id)->where('friend_id', $receiver->id)->exists() ||
                FriendRequest::where('sender_id', $sender->id)->where('receiver_id', $receiver->id)->exists()) {
                continue;
            }

            // Create pending friend request
            FriendRequest::create([
                'sender_id' => $sender->id,
                'receiver_id' => $receiver->id,
                'status' => RequestStatus::PENDING->value,
            ]);
        }
    }

    /**
     * Create conversations between users.
     */
    private function createConversations($users)
    {
        $conversations = [];

        // Create conversations between friends
        foreach ($users as $user) {
            $friends = Friend::where('user_id', $user->id)->pluck('friend_id')->toArray();

            foreach ($friends as $friendId) {
                // Ensure we don't create duplicate conversations
                if ($user->id < $friendId) {
                    $conversation = Conversation::firstOrCreate([
                        'user_one_id' => $user->id,
                        'user_two_id' => $friendId,
                    ]);

                    $conversations[] = $conversation;
                }
            }
        }

        return $conversations;
    }

    /**
     * Create messages in rooms.
     * @throws RandomException
     */
    private function createRoomMessages($rooms, $users): void
    {
        foreach ($rooms as $room) {
            $memberIds = RoomMembership::where('room_id', $room->id)->pluck('user_id')->toArray();
            $messageCount = random_int(5, 20);

            $messages = [];
            for ($i = 0; $i < $messageCount; $i++) {
                $sender = $users->firstWhere('id', $memberIds[array_rand($memberIds)]);

                $message = Message::create([
                    'content' => fake()->paragraph(),
                    'type' => MessageType::User->value,
                    'sender_id' => $sender->id,
                    'messageable_id' => $room->id,
                    'messageable_type' => Room::class,
                ]);

                $messages[] = $message;

                // Add file attachments for some messages
                if (random_int(1, 5) === 1) {
                    MessageFile::factory()->create([
                        'message_id' => $message->id,
                    ]);
                }

                // Add reactions to some messages
                if (random_int(1, 3) === 1) {
                    $reactionCount = random_int(1, 3);
                    $reactors = $users->whereIn('id', $memberIds)->random($reactionCount);

                    foreach ($reactors as $reactor) {
                        MessageReaction::factory()->create([
                            'message_id' => $message->id,
                            'user_id' => $reactor->id,
                        ]);
                    }
                }
            }

            // Add some reply messages
            if (count($messages) > 0) {
                $replyCount = min(3, count($messages));
                for ($i = 0; $i < $replyCount; $i++) {
                    $originalMessage = $messages[array_rand($messages)];
                    $sender = $users->firstWhere('id', $memberIds[array_rand($memberIds)]);

                    Message::create([
                        'content' => fake()->paragraph(),
                        'type' => MessageType::User->value,
                        'sender_id' => $sender->id,
                        'reply_id' => $originalMessage->id,
                        'messageable_id' => $room->id,
                        'messageable_type' => Room::class,
                    ]);
                }
            }

            // Add a system message
            Message::create([
                'content' => 'Room created',
                'type' => MessageType::System->value,
                'sender_id' => $room->owner_id,
                'messageable_id' => $room->id,
                'messageable_type' => Room::class,
            ]);
        }
    }

    /**
     * Create messages in conversations.
     */
    private function createConversationMessages($conversations)
    {
        foreach ($conversations as $conversation) {
            $messageCount = random_int(3, 15);
            $participants = [$conversation->user_one_id, $conversation->user_two_id];

            $messages = [];
            for ($i = 0; $i < $messageCount; $i++) {
                $sender = $participants[array_rand($participants)];

                $message = Message::create([
                    'content' => fake()->paragraph(),
                    'type' => MessageType::User->value,
                    'sender_id' => $sender,
                    'messageable_id' => $conversation->id,
                    'messageable_type' => Conversation::class,
                ]);

                $messages[] = $message;

                // Add file attachments for some messages
                if (random_int(1, 5) === 1) {
                    MessageFile::factory()->create([
                        'message_id' => $message->id,
                    ]);
                }

                // Add reactions to some messages
                if (random_int(1, 3) === 1) {
                    $reactorId = $sender === $conversation->user_one_id ? $conversation->user_two_id : $conversation->user_one_id;

                    MessageReaction::factory()->create([
                        'message_id' => $message->id,
                        'user_id' => $reactorId,
                    ]);
                }
            }

            // Add some reply messages
            if (count($messages) > 0) {
                $replyCount = min(2, count($messages));
                for ($i = 0; $i < $replyCount; $i++) {
                    $originalMessage = $messages[array_rand($messages)];
                    $sender = $originalMessage->sender_id === $conversation->user_one_id ? $conversation->user_two_id : $conversation->user_one_id;

                    Message::create([
                        'content' => fake()->paragraph(),
                        'type' => MessageType::User->value,
                        'sender_id' => $sender,
                        'reply_id' => $originalMessage->id,
                        'messageable_id' => $conversation->id,
                        'messageable_type' => Conversation::class,
                    ]);
                }
            }

            // Add a system message
            Message::create([
                'content' => 'Conversation started',
                'type' => MessageType::System->value,
                'sender_id' => $conversation->user_one_id,
                'messageable_id' => $conversation->id,
                'messageable_type' => Conversation::class,
            ]);
        }
    }

    /**
     * Create notifications for users.
     */
    private function createNotifications($users)
    {
        foreach ($users as $user) {
            $notificationCount = random_int(2, 8);

            for ($i = 0; $i < $notificationCount; $i++) {
                $type = $this->getRandomNotificationType();
                $content = match ($type) {
                    NotificationType::FRIEND_REQUEST->value => 'You have a new friend request',
                    NotificationType::MESSAGE->value => 'You have a new message',
                    NotificationType::ROOM_INVITE->value => 'You have been invited to join a room',
                    NotificationType::SYSTEM->value => 'Welcome to the application!',
                    default => 'New notification',
                };

                Notification::create([
                    'type' => $type,
                    'content' => $content,
                    'is_read' => fake()->boolean(30), // 30% chance of being read
                    'user_id' => $user->id,
                ]);
            }
        }
    }

    /**
     * Get a random room role.
     */
    private function getRandomRoomRole(): int|string|null
    {
        $roles = [
            RoomRole::MEMBER->value => 70,
            RoomRole::MODERATOR->value => 20,
            RoomRole::ADMIN->value => 10,
        ];

        return $this->getRandomWeighted($roles);
    }

    /**
     * Get a random notification type.
     */
    private function getRandomNotificationType(): int|string|null
    {
        $types = [
            NotificationType::FRIEND_REQUEST->value => 30,
            NotificationType::MESSAGE->value => 40,
            NotificationType::ROOM_INVITE->value => 20,
            NotificationType::SYSTEM->value => 10,
        ];

        return $this->getRandomWeighted($types);
    }

    /**
     * Get a random value based on weights.
     */
    private function getRandomWeighted($weightedValues): int|string|null
    {
        $total = array_sum($weightedValues);
        $rand = random_int(1, $total);

        $current = 0;
        foreach ($weightedValues as $value => $weight) {
            $current += $weight;
            if ($rand <= $current) {
                return $value;
            }
        }

        return array_key_first($weightedValues);
    }
}
