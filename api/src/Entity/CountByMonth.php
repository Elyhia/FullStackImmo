<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\State\CountByMonthSP;


#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: 'countbymonth/{from}/{to}',
            description: "aa",
            provider: CountByMonthSP::class
        )
    ],
    paginationEnabled: false,
    provider: CountByMonthSP::class
)]


class CountByMonth
{

}
