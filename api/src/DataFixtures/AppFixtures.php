<?php
namespace App\DataFixtures;

use App\Entity\Sale;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager):void
    {

            $arrayRegion= array();
            $csvregion = fopen( dirname(__DIR__) . "/Data/regions.csv",'r');

           while (!feof($csvregion)) {
                $lineregion = fgetcsv($csvregion,1024,";");
                if($lineregion!=false)
                {
                    $arrayRegion[$lineregion[0]] = $lineregion[1];
                }
           }

           fclose($csvregion);

            $csv = fopen( dirname(__DIR__).'/Data/valeurs-2018.csv', 'r');
            $i = 0;

            // 0 : PRIX | 1 : ZIP | 2: AREA | 3 : Date | 4 TYPE

            $cptline = 0;
            $nbFlush = 0;
            while (!feof($csv)) {

               $sale = new Sale();
               $line = fgetcsv($csv,1024,";");
               if($line!=false)
                {
                    /* TODO Import */
                    $sale->setPrice(floatval($line[0]));
                    $sale->setArea(floatval($line[2]));
                    $sale->setZipCode($line[1]);
                    $dep = "";

                    if(strlen($line[1])== 4)
                    {
                        $dep = "0" . substr($line[1],0,1);
                    }
                    else
                    {
                        $dep = substr($line[1],0,2);
                        if($dep=="97"){
                            $dep=substr($line[1],0,3);
                        }
                    }
                    if($dep=="")
                        continue;
                    $sale->setRegion($arrayRegion[$dep]);
                    $dateExp = explode("/",$line[3]);
                    $sale->setDate(new \DateTime($dateExp[2]."-".$dateExp[1]."-".$dateExp[0]));
                    if($line[4]==1)
                        $sale->setType("Maison");
                    else
                        $sale->setType("Appartement");

                    $manager->persist($sale);
                    if($cptline==1000){
                        $manager->flush();
                        $manager->clear();
                        $cptline=0;
                        print("flush" . $nbFlush);
                        $nbFlush++;
                    }
                    $cptline++;
                }
            }

            $manager->flush();
            $manager->clear();

            fclose($csv);


    }

}
