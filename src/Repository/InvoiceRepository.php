<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\Invoice;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method Invoice|null find($id, $lockMode = null, $lockVersion = null)
 * @method Invoice|null findOneBy(array $criteria, array $orderBy = null)
 * @method Invoice[]    findAll()
 * @method Invoice[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InvoiceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Invoice::class);
    }

    public function findNextChrono(User $user)
    {
    try{        
        return $this->createQueryBuilder("invoices")
                    ->select("invoices.chrono")
                    ->join("invoices.customer","c")
                    ->where("c.user = :user") // :user => alias
                    ->setParameter("user",$user)
                    ->orderBy("invoices.chrono","DESC")
                    ->setMaxResults(1)
                    ->getQuery()
                    ->getSingleScalarResult() +1
                    ;
    }catch(\Exception $e){
        return 1;
    }
}

}
