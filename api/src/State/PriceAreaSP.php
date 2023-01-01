<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\Sale;
use App\Repository\SaleRepository;

class PriceAreaSP implements ProviderInterface
{
    private SaleRepository $saleRepository;

    public function __construct(SaleRepository $saleRepository)
    {
        $this->saleRepository = $saleRepository;
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $sale = $this->saleRepository->findAllByYear($uriVariables["year"]);
        return $sale;
    }
}
