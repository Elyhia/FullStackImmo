<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Repository\SaleRepository;

class CountByMonthSP implements ProviderInterface
{
    private SaleRepository $saleRepository;

    public function __construct(SaleRepository $saleRepository)
    {
        $this->saleRepository = $saleRepository;
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $arEntity = array();
        $sale = $this->saleRepository->countByMonth($uriVariables["from"],$uriVariables["to"]);

        $arMonth = array();

        foreach($sale as $key => $line)
        {
            $date = $line["date"]->format("Y-m") . "";
            if(!isset($arMonth[$date]))
                $arMonth[$date] =0;

            $arMonth[$date] +=$line["c"];
        }

        foreach ($arMonth as $date => $count)
        {
            $et = array();
            $et["x"] = $date;
            $et["y"] =$count;
            array_push($arEntity,$et);
        }

        return $arEntity;
    }
}
