<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rooms', static function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->string('tags');
            $table->text('description');
            $table->boolean('is_private')->default(false);
            $table->foreignId('owner_id')->constrained('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
