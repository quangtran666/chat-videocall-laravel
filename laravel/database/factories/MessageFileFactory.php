<?php

namespace Database\Factories;

use App\Models\Message;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFileFactory extends Factory
{
    public function definition(): array
    {
        $fileTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain', 'application/msword'];
        $fileType = $this->faker->randomElement($fileTypes);
        $extension = match($fileType) {
            'image/jpeg' => 'jpg',
            'image/png' => 'png',
            'application/pdf' => 'pdf',
            'text/plain' => 'txt',
            'application/msword' => 'doc',
            default => 'bin'
        };

        $fileName = fake()->word() . '.' . $extension;

        return [
            'message_id' => Message::factory(),
            'name' => $fileName,
            'path' => 'uploads/files/' . $fileName,
            'type' => $fileType,
            'size' => fake()->numberBetween(1024, 10485760), // 1KB to 10MB
            'url' => fake()->url(),
        ];
    }

    /**
     * Indicate that the file is an image.
     */
    public function image(): static
    {
        return $this->state(function (array $attributes) {
            $extension = fake()->randomElement(['jpg', 'png', 'gif']);
            $fileName = fake()->word() . '.' . $extension;
            $mimeType = match($extension) {
                'jpg' => 'image/jpeg',
                'png' => 'image/png',
                'gif' => 'image/gif',
                default => 'image/jpeg'
            };

            return [
                'name' => $fileName,
                'path' => 'uploads/images/' . $fileName,
                'type' => $mimeType,
                'size' => fake()->numberBetween(10240, 5242880), // 10KB to 5MB
            ];
        });
    }

    /**
     * Indicate that the file is a document.
     */
    public function document(): static
    {
        return $this->state(function (array $attributes) {
            $extension = fake()->randomElement(['pdf', 'doc', 'docx', 'txt']);
            $fileName = fake()->word() . '.' . $extension;
            $mimeType = match($extension) {
                'pdf' => 'application/pdf',
                'doc' => 'application/msword',
                'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'txt' => 'text/plain',
                default => 'application/octet-stream'
            };

            return [
                'name' => $fileName,
                'path' => 'uploads/documents/' . $fileName,
                'type' => $mimeType,
                'size' => fake()->numberBetween(1024, 10485760), // 1KB to 10MB
            ];
        });
    }
}
