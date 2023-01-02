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


        $sales = $this->saleRepository->countByYearRegion($uriVariables["year"]);
        $total = 0;

        $ret = array();
        foreach ($sales as $key => $line)
            $total+=$line["c"];

        foreach ($sales as $key => $line){
            $et = array();
            $et["x"] = $line["region"];
            $et["y"] = round(100*$line["c"]/$total,2,PHP_ROUND_HALF_EVEN);
            array_push($ret,$et);
        }
        return $ret;



    }
}
