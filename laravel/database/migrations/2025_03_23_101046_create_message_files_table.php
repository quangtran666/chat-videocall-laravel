<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('message_files', static function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('message_id')->constrained('messages')->cascadeOnDelete();
            $table->string('name');
            $table->string('path');
            $table->string('type');
            $table->unsignedBigInteger('size');
            $table->string('url')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('message_files');
    }
};
