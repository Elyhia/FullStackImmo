<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\State\CountByYearRegionSP;


#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: 'countbyyearregion/{year}',
            description: "aa",
            provider: CountByYearRegionSP::class
        )
    ],
    paginationEnabled: false,
    provider: CountByYearRegionSP::class
)]


class CountByYearRegion
{

}
