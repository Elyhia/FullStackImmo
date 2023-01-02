<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Repository\SaleRepository;

class CountByYearRegionSP implements ProviderInterface
{
    private SaleRepository $saleRepository;

    public function __construct(SaleRepository $saleRepository)
    {
        $this->saleRepository = $saleRepository;
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        return $this->saleRepository->countByYearRegion($uriVariables["year"]);
    }
}
