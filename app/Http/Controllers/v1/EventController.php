<?php

namespace App\Http\Controllers\v1;

use App\Event;
use App\Http\Controllers\Controller;
use App\Http\Requests\EventRequest;
use App\Http\Resources\v1\EventCollection;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function getEvent()
    {
        $event = Event::latest()->paginate(500);
        return new EventCollection($event);
    }

    public function postEvent(EventRequest $request)
    {
        Event::create([
            'title' => $request->title,
            'body' => $request->body,
        ]);

        return response()->json(['status'=>' اِوند شما با موفقیت ثبت شد!']);
    }

    public function deleteEvent($id)
    {
        $event = Event::findOrFail($id);

        $event->delete();

        return response()->json(['status'=> 'حذف با موفقیت انجام شد']);
    }
}
