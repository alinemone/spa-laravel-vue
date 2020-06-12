<?php

namespace App\Http\Resources\v1;

use Illuminate\Http\Resources\Json\ResourceCollection;

class EventCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data'=> $this->collection->map(function ($item){
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'body' => $item->body,
                    'date' => jdate($item->created_at)->ago(),
                ];
            })
        ];
    }
}
