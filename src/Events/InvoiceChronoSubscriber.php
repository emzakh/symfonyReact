<?php
namespace App\Events;

use App\Entity\Invoice;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Repository\InvoiceRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class InvoiceChronoSubscriber implements EventSubscriberInterface
{
    private $security;
    private $repo;

    public function __construct(Security $security, InvoiceRepository $repo)
    {
        $this->security = $security;
        $this->repo = $repo;        
    }



    public static function getSubscribedEvents()
    {
        return[
            KernelEvents::VIEW => ['setChronoForInvoice', EventPriorities::PRE_VALIDATE]
        ];
    }
    
    public function setChronoForInvoice(ViewEvent $event)
    {
        $invoice = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if($invoice instanceof Invoice && $method ==="POST")
        {
            //besoin de trouver l'user actuellement connecté (security)
            $user = $this->security->getUser();
            //besoin de récupérer la dernière facture insérée et prendre le chrono de celle ci
            $nextChrono = $this->repo -> findNextChrono($user);
            $invoice->setChrono($nextChrono);

            //ajouter sent at
            if(empty($invoice->getSentAt()))
            {
                $invoice->setSentAt(new \DateTime());
            }
            //dans le cas d'une nouvelle facture, on donne le chrono +1

            //ajouter la date d'envoi
        }
    
    }
}