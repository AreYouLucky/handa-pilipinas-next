<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $fillable = [
        'classification',
        'title',
        'slug',
        'description',
        'description_text',
        'filter_type',
        'info_type_material',
        'author',
        'encoded_by_id',
        'encoded_at',
        'modified_by_id',
        'modified_at',
        'submitted_at',
        'publisher_publish_date',
        'agency',
        'region',
        'regional_office',
        'thumbnail',
        'tags',
        'source_url',
        'hits',
        'status',
        'publish_date',
        'is_publish',
        'is_press_release',
        'trash',
        'is_archive'
    ];




    public function subject_headings(){
        return $this->hasMany(MaterialSubjectHeading::class)
            ->leftJoin('subject_headings', 'subject_heading_id', 'subject_headings.id')
            ->leftJoin('categories', 'subject_headings.category_id', 'categories.id')
            ->select(
                'material_subject_headings.material_id as material_id',
                'subject_headings.id as subject_heading_id',
                'categories.id as category_id',
                'categories.category as category',
                'categories.slug as category_slug',
                'subject_headings.subject_heading as subject_heading',
                'subject_headings.slug as sh_slug',
                'material_subject_headings.score as score',
                'material_subject_headings.analysis as analysis',
            );
    }///tiwason

    public function topics(){
        $this->belongsToMany(SubjectHeading::class, '');
    }



    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function encodedBy(){
        return $this->belongsTo(User::class, 'encoded_by_id')
            ->select('id', 'lname', 'fname', 'mname', 'sex', 'agency_code');
    }

    public function modifiedBy(){
        return $this->belongsTo(User::class, 'modified_by_id')
            ->select('id', 'lname', 'fname', 'mname', 'sex', 'agency_code');
    }
}