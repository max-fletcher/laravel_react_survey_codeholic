<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Http\Resources\SurveyResource;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return SurveyResource::collection(
            Survey::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSurveyRequest $request)
    {
        $data = $request->validated();

        // CHECK IF IMAGE WAS GIVEN AND STORE ON LOCAL FILE SYSTEM
        if(isset($data['image'])){
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;
        }

        $survey = Survey::create($data);

        foreach ($data['questions'] as $question){
            $question['survey_id'] = $survey->id;
            $this->createQuestion($question);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSurveyRequest $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    private function saveImage($image){
        // CHECK IF IMAGE IS VALID BASE64 STRING. IF NOT, THROW EXCEPTION
        if(!preg_match('/^data:image\/(\w+);base64,/', $image, $type)){
            throw new \Exception('did not match data URI with image data');
        }

        // TAKE OUT THE BASE64 ENCODED TEXT WITHOUT MIME TYPE
        $image = substr($image, strpos($image, ',')+1);
        // GET FILE EXTENSION
        $type = strtolower($type[1]); // jpg, png, gif

        // CHECK IF THE FILETYPE IS AN IMAGE
        if(!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])){
            throw new \Exception('invalid image type');
        }

        // REPLACE ANY SPACES WITH A PLUS OR IT WILL CAUSE PROBLEMS
        $image = str_replace(' ', '+', $image);
        $image = base64_decode($image); // DECODE TI GET IMAGE

        if($image === false){
            throw new \Exception('base64_decode failed');
        }

        $dir = 'images/';
        $file = Str::random().'.'.$type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;
        if(!File::exists($absolutePath)){
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

        return $relativePath;
    }

    private function createQuestion($data){
        if(is_array($data['data'])){
            
        }
    }
}
