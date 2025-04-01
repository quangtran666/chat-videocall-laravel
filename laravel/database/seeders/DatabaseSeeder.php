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

        // Create additional users (increased from 10 to 50)
        $users = User::factory(50)->create();
        $allUsers = $users->merge([$mainUser]);

        // Create rooms (increased from 5 to 15)
        $rooms = Room::factory(15)
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

            // Add random users as members (increased max from 5 to 15)
            $memberCount = random_int(5, 15);
            $randomUsers = $allUsers->where('id', '!=', $room->owner_id)->random($memberCount);

            foreach ($randomUsers as $user) {
                RoomMembership::create([
                    'room_id' => $room->id,
                    'user_id' => $user->id,
                    'role' => $this->getRandomRoomRole(),
                ]);
            }
        }

        // Create room join requests (increased from 3 to 8)
        foreach ($rooms->where('is_private', true) as $privateRoom) {
            $memberIds = RoomMembership::where('room_id', $privateRoom->id)->pluck('user_id')->toArray();
            $nonMembers = $allUsers->whereNotIn('id', $memberIds);

            if ($nonMembers->count() > 0) {
                $requestCount = min(8, $nonMembers->count());
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
     * @throws RandomException
     */
    private function createFriendships($users): void
    {
        // Ensure each user has approximately 20-30 friends
        foreach ($users as $user) {
            // Determine random number of friends for this user (between 20-30)
            $targetFriendCount = random_int(20, 30);

            // Get current friend count
            $currentFriendCount = Friend::where('user_id', $user->id)->count();

            // Calculate how many more friends we need to add
            $friendsToAdd = max(0, $targetFriendCount - $currentFriendCount);

            if ($friendsToAdd > 0) {
                // Get potential friends (users who are not already friends with this user)
                $potentialFriends = $users->where('id', '!=', $user->id)
                    ->whereNotIn('id', Friend::where('user_id', $user->id)->pluck('friend_id')->toArray());

                // If we have enough potential friends
                if ($potentialFriends->count() >= $friendsToAdd) {
                    $newFriends = $potentialFriends->random($friendsToAdd);

                    foreach ($newFriends as $friend) {
                        // Create accepted friend request
                        FriendRequest::create([
                            'sender_id' => $user->id,
                            'receiver_id' => $friend->id,
                            'status' => RequestStatus::ACCEPTED->value,
                        ]);

                        // Create friendship records (both ways)
                        Friend::create([
                            'user_id' => $user->id,
                            'friend_id' => $friend->id,
                        ]);

                        Friend::create([
                            'user_id' => $friend->id,
                            'friend_id' => $user->id,
                        ]);
                    }
                }
            }
        }

        // Create some pending friend requests (30)
        for ($i = 0; $i < 30; $i++) {
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
            // Increased message count from 5-20 to 20-50
            $messageCount = random_int(20, 50);

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

                // Add file attachments for some messages (increased probability)
                if (random_int(1, 3) === 1) {  // Changed from 1 in 5 to 1 in 3
                    MessageFile::factory()->create([
                        'message_id' => $message->id,
                    ]);
                }

                // Add reactions to some messages (increased probability and count)
                if (random_int(1, 2) === 1) {  // Changed from 1 in 3 to 1 in 2
                    $reactionCount = random_int(1, 5);  // Changed from 1-3 to 1-5
                    $reactors = $users->whereIn('id', $memberIds)->random($reactionCount);

                    foreach ($reactors as $reactor) {
                        MessageReaction::factory()->create([
                            'message_id' => $message->id,
                            'user_id' => $reactor->id,
                        ]);
                    }
                }
            }

            // Add some reply messages (increased from 3 to 10)
            if (count($messages) > 0) {
                $replyCount = min(10, count($messages));
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
            // Set message count to approximately 30 messages per conversation
            $messageCount = random_int(25, 35); // Average will be around 30
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

                // Add file attachments for some messages (commented out as requested)
                // if (random_int(1, 3) === 1) {  // 1 in 3 chance of having a file
                //     MessageFile::factory()->create([
                //         'message_id' => $message->id,
                //     ]);
                // }

                // Add reactions to some messages (commented out as requested)
                // if (random_int(1, 2) === 1) {  // 1 in 2 chance of having reactions
                //     $reactorId = $sender === $conversation->user_one_id ? $conversation->user_two_id : $conversation->user_one_id;
                //
                //     MessageReaction::factory()->create([
                //         'message_id' => $message->id,
                //         'user_id' => $reactorId,
                //     ]);
                // }
            }

            // Add some reply messages (commented out as requested)
            // if (count($messages) > 0) {
            //     $replyCount = min(8, count($messages));
            //     for ($i = 0; $i < $replyCount; $i++) {
            //         $originalMessage = $messages[array_rand($messages)];
            //         $sender = $originalMessage->sender_id === $conversation->user_one_id ? $conversation->user_two_id : $conversation->user_one_id;
            //
            //         Message::create([
            //             'content' => fake()->paragraph(),
            //             'type' => MessageType::User->value,
            //             'sender_id' => $sender,
            //             'reply_id' => $originalMessage->id,
            //             'messageable_id' => $conversation->id,
            //             'messageable_type' => Conversation::class,
            //         ]);
            //     }
            // }
            //
            // // Add a system message
            // Message::create([
            //     'content' => 'Conversation started',
            //     'type' => MessageType::System->value,
            //     'sender_id' => $conversation->user_one_id,
            //     'messageable_id' => $conversation->id,
            //     'messageable_type' => Conversation::class,
            // ]);
        }
    }

    /**
     * Create notifications for users.
     */
    private function createNotifications($users)
    {
        foreach ($users as $user) {
            // Increased notification count from 2-8 to 5-15
            $notificationCount = random_int(5, 15);

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
     * @throws RandomException
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
