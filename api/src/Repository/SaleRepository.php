<?php

namespace App\Repository;

use App\Entity\Sale;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Sale>
 *
 * @method Sale|null find($id, $lockMode = null, $lockVersion = null)
 * @method Sale|null findOneBy(array $criteria, array $orderBy = null)
 * @method Sale[]    findAll()
 * @method Sale[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SaleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Sale::class);
    }

    public function save(Sale $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Sale $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function findAllByYearMonth(int $year,int $month, bool $includeUnavailableProducts = false): array
    {

        if($month<10)
            $month = "0".$month;


        $startDate = new \DateTimeImmutable("{$year}-{$month}-01");
        $endDate = new \DateTimeImmutable("{$year}-{$month}-31");

        $qb = $this->createQueryBuilder('sale')
            ->select('AVG(sale.price) as avp,AVG(sale.area) ava,sale.date')
            ->where('sale.date BETWEEN :syear AND :eyear')
            ->setParameter('syear', $startDate )
            ->setParameter('eyear', $endDate )
            ->groupBy("sale.date")
            ->orderBy('sale.date', 'ASC');

        $query = $qb->getQuery();
        return $query->execute();

    }

    public function countByMonth(string $from,string $to, bool $includeUnavailableProducts = false): array
    {


        $startDate = new \DateTimeImmutable("{$from}-01");
        $endDate = new \DateTimeImmutable("{$to}-31");

        $qb = $this->createQueryBuilder('sale')
            ->select('count(sale.id) as c,sale.date')
            ->where('sale.date BETWEEN :syear AND :eyear')
            ->setParameter('syear', $startDate )
            ->setParameter('eyear', $endDate )
            ->groupBy("sale.date")
            ->orderBy('sale.date', 'ASC');

        $query = $qb->getQuery();
        return $query->execute();

    }

    public function countByYearRegion(string $year, bool $includeUnavailableProducts = false): array
    {


        $startDate = new \DateTimeImmutable("{$year}-01-01");
        $endDate = new \DateTimeImmutable("{$year}-12-31");

        $qb = $this->createQueryBuilder('sale')
            ->select('count(sale.id) as c,sale.region')
            ->where('sale.date BETWEEN :syear AND :eyear')
            ->setParameter('syear', $startDate )
            ->setParameter('eyear', $endDate )
            ->groupBy("sale.region");

        $query = $qb->getQuery();
        return $query->execute();

    }



}

