<?php

namespace App\Controller;

use App\Entity\Invoice;
use Doctrine\ORM\EntityManagerInterface;

class InvoiceIncrementationController
{
   private $manager;

    public function __construct(EntityManagerInterface $manager)
    {
        $this->manager = $manager;
    }


    /* quand on appel un objec comme une fonction, la fonction magique __invoke s'active */

    public function __invoke(Invoice $data)
    {
        $data->setChrono($data->getChrono() + 1);
        $this->manager->persist($data);
        $this->manager->flush();
        //dd($data);  //die(var_dump($data))
        return $data;
       
    }

}
