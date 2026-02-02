<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Brand extends Model
{
    use HasSlug;

    protected $fillable = [
        'name',
        'slug',
        'image',
        'status'
    ];

    // protected $casts = [
    //     'status' => 'bolean'
    // ];


    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }


    public function getImageAttribute($value)
    {
        return asset('storage/' . $value);
    }


    public function products()
    {
        return $this->hasMany(Product::class);
    }


}
