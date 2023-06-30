<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\SurveyQuestion;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rules\Enum;
use App\Http\Resources\SurveyResource;
use App\Http\Requests\StoreSurveyRequest;
use Illuminate\Support\Facades\Validator;
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
    public function show(Survey $survey, Request $request)
    {
        $user = $request->user();
        if($user->id !== $survey->user_id){
            return abort(403, 'Unauthorized action');
        }

        return new SurveyResource($survey);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        $data = $request->validated();

        // CHECK IF IMAGE WAS GIVEN AND SAVE ON LOCAL FILE SYSTEM
        if(isset($data['image'])){
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;

            // IF THERE IS AN OLD IMAGE, DELETE IT
            if($survey->image){
                $absolutePath = public_path($survey->image);
                File::delete($absolutePath);
            }
        }

        // UPDATE SURVEY IN DATABASE
        $survey->update($data);

        // GET IDS OF OLD QUESTIONS AS A PLAIN ARRAY OF EXISTING QUESTIONS
        $existingIds = $survey->questions()->pluck('id')->toArray();
        // GET IDS OF NEW QUESTIONS AS A PLAIN ARRAY OF EXISTING QUESTIONS
        $newIds = Arr::pluck($data['questions'], 'id');
        // FIND QUESTIONS TO DELETE
        $toDelete = array_diff($existingIds, $newIds);
        // FIND QUESTIONS TO ADD
        $toAdd = array_diff($newIds, $existingIds);

        SurveyQuestion::destroy($toDelete);

        // CREATE NEW QUESTIONS
        foreach ($data['questions'] as $question){
            if(in_array($question['id'], $toAdd)){
                $question['survey_id'] = $survey->id;
                $this->createQuestion($question);
            }
        }

        // UPDATE EXISTING QUESTIONS
        $questionMap = collect($data['questions'])->keyBy('id'); // CREATE AN ASSOCIATIVE ARRAY OF QUESTIONS THAT HAVE ID AS KEY
        foreach ($survey->questions as $question) {
            if(isset($questionMap[$question->id])){
                $this->updateQuestion($question, $questionMap[$question->id]);
            }
        }

        return new SurveyResource($survey);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Survey $survey)
    {
        $user = $request->user();

        if($user->id !== $survey->user_id){
            return abort(403, 'Unauthorized action');
        }

        $survey->delete();

        // IF THERE IS AN OLD IMAGE, DELETE IT
        if($survey->image){
            $absolutePath = public_path($survey->image);
            File::delete($absolutePath);
        }

        return response('', 204);
    }

    private function saveImage($image)
    {
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

    private function createQuestion($data)
    {
        if(is_array($data['data'])){
            // THIS IS TO SAVE OPTIONS FOR SELECT & CHECKBOX AS A JSON ENCODED STRING IN DB
            $data['data'] = json_decode($data['data']);
        }

        $validator = Validator::make($data, [
            'question' => ['required', 'string'],
            'type' => ['required', new Enum(QuestionTypeEnum::class)],
            'description' => ['nullable', 'string'],
            'data' => 'present', // 'present' - THE FIELD UNDER VALIDATION MUST EXIST IN THE INPUT DATA
            'survey_id' => ['exists:App\Models\Survey,id']
        ]);

        return SurveyQuestion::create($validator->validated());
    }

    private function updateQuestion(SurveyQuestion $question, $data)
    {
        if(is_array($data['data'])){
            // THIS IS TO SAVE OPTIONS FOR SELECT & CHECKBOX AS A JSON ENCODED STRING IN DB
            $data['data'] = json_decode($data['data']);
        }

        $validator = Validator::make($data, [
            'id' => ['exists:App\Models\SurveyQuestion,id'],
            'question' => ['required', 'string'],
            'type' => ['required', new Enum(QuestionTypeEnum::class)],
            'description' => ['nullable', 'string'],
            'data' => 'present', // 'present' - THE FIELD UNDER VALIDATION MUST EXIST IN THE INPUT DATA
        ]);

        return $question->update($validator->validated());
    }
}
