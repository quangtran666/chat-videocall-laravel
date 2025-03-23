<?php

use App\Enums\RoomRole;
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
        Schema::create('room_memberships', static function (Blueprint $table) {
            $table->timestamps();
            $table->foreignId('room_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->enum('role', array_column(RoomRole::cases(), 'value'))->default(RoomRole::MEMBER->value);

            $table->primary(['room_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('room_memberships');
    }
};
