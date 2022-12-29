<?php
namespace App\DataFixtures;

use App\Entity\Sale;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager):void
    {
        $sale = new Sale();

            $csv = fopen(dirname(__FILE__).'TODO PATH ', 'r');


            $i = 0;

            while (!feof($csv)) {
                $line = fgetcsv($csv);

                /* TODO Import */
                //$sale->setMachin($line[0]);


                $manager->persist($coordinatesfrcity[$i]);

                $this->addReference('coordinatesfrcity-'.$i, $coordinatesfrcity[$i]);


                $i = $i + 1;
            }

            fclose($csv);


        $manager->flush();
    }

}
