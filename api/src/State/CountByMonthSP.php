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

        for($i=1;$i<=12;$i++)
        {
            $sale = $this->saleRepository->findAllByYearMonth($uriVariables["year"],$i);

            $et = array();
            $avp = 0;
            $ava = 0;
            foreach($sale as $key => $line){
                $avp +=$line["avp"];
                $ava +=$line["ava"];
            }

            $et["x"] = $uriVariables["year"]."-".$i;
            $et["y"] = $avp/$ava;

            array_push($arEntity,$et);
        }

        return $arEntity;
    }
}
