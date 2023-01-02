<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\State\PriceAreaSP;


#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: 'pricebyarea/{year}',
            description: "aa",
            provider: PriceAreaSP::class
        )
    ],
    paginationEnabled: false,
    provider: PriceAreaSP::class
)]


class PriceByArea
{

}
