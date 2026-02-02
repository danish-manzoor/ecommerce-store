<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Category extends Model
{
    use HasSlug;
    protected $fillable = [
        'name',
        'slug',
        'description',
        'image',
        'parent_id'
    ];


    protected $casts = [
        'parent_id' => 'integer'
    ];

    protected $appends = ['parent_name'];


    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function descendants()
    {
        return $this->children()->with('descendants');
    }


    public function scopeIsParent($query)
    {
        return $query->whereNull('parent_id');
    }


    public function getImageAttribute($value)
    {
        return asset('storage/' . $value);
    }

    public function getParentNameAttribute()
    {
        if ($this->parent_id) {
            return $this->parent->name;
        }
        return null;
    }
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
