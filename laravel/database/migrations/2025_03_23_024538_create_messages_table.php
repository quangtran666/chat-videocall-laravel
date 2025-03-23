<?php

use App\Enums\MessageType;
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
        Schema::create('messages', static function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->text('content');
            $table->enum('type', array_column(MessageType::cases(), 'value'));
            $table->foreignId('sender_id')->constrained('users');
            $table->foreignId('reply_id')->nullable()->constrained('messages');
            $table->morphs('messageable'); // messageable_id, messageable_type
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
