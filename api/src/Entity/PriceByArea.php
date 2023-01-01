<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\State\PriceAreaSP;
use DateTimeInterface;

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
