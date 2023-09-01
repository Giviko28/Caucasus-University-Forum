<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PostResourceCollection extends ResourceCollection
{

    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
