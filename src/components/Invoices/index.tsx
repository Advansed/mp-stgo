<<<<<<< HEAD
import React, { use, useEffect } from 'react';
import { useHook } from './useHook';
import { InvoicesBreadcrumb } from './components/InvoicesBreadcrumb';
import { InvoicesList } from './components/InvoiceList/InvoicesList';
=======
import React, { use, useEffect, useState } from 'react';
import { useHook } from './useHook';
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
import { InvoiceView } from './components/InvoiceView';
import { InvoiceActs } from './components/InvoiceActs';
import { InvoicePrintForm } from './components/InvoicePrintForm';
import { useNavigation } from './useNavigation';
<<<<<<< HEAD
import { useItem } from '../../Store/navigationStore';
=======
import { useAdd, useItem } from '../../Store/navigationStore';
import InvMap from './components/InvoiceList/InvMap';


declare global {
  interface Window {
    ymaps: any;
  }
}
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19

const Invoices: React.FC = () => {
    const {
        invoices,
        loading,
        refreshData,
        format_phone,
        format_date,
        uppdate_address,
        get_inv_status
    } = useHook();

<<<<<<< HEAD
    useEffect(()=>{
        console.log('useeffect', invoices )
    },[])

    const { item, setItem } = useItem()

    const { navigation, navigateToPosition, goBack } = useNavigation()

    const handleSelect = ( invoice: any) => {

        setItem( invoice );
        navigateToPosition( { position: 1, canCoBack: true } )
=======

    const { item, setItem } = useItem()

    const [ view, setView ] = useState(false)

    const { navigation, navigateToPosition, goBack } = useNavigation()

    const { add } = useAdd();

    useEffect(()=>{
        console.log("refresshh")
        console.log("refres", invoices)
    },[add])

    const handleSelect = ( invoice: any) => {

        setItem( invoice );
        setView( true )
        // navigateToPosition( { position: 1, canCoBack: true } )
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19

    }

    const renderCurrentPage = () => {
        
<<<<<<< HEAD
        console.log("renderPage", navigation.position)
=======
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
        switch (navigation.position) {

            case 0:
                return (
<<<<<<< HEAD
                    <InvoicesList
                        invoices                = { invoices }
                        loading                 = { loading }
                        refreshing              = { loading }
                        onRefresh               = { refreshData }
                        onInvoiceSelect         = { handleSelect }
                        getInvoiceStatus        = { get_inv_status }
                        formatDate              = { format_date }
                        formatPhone             = { format_phone }
=======
                    <InvMap
                        invoices            = { invoices }
                        loading             = { loading }
                        refreshing          = { loading }
                        onRefresh           = { refreshData }
                        onInvoiceSelect     = { handleSelect }
                        getInvoiceStatus    = { get_inv_status }
                        formatDate          = { format_date }
                        formatPhone         = { format_phone }
                        selectedInvoice     = { setItem }
                        mapRouteData        = { item ? {
                            startCoords:    [ 55.751244, 37.618423 ], // Координаты склада
                            endCoords:      [ 55.751310, 37.618445 ], // Координаты клиента
                            licInfo:        item.cargoDetails
                        } : null}
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
                    />
                );

            case 1:
                if (!item) {
                    return <div>Загрузка...</div>; // ✅ Заменить на это
                }
<<<<<<< HEAD
                return (
                    <InvoiceView
                        invoice                 = { item }
                        invoiceStatus           = { get_inv_status( item ) }
                        formatDate              = { format_date }
                        formatPhone             = { format_phone }
                        onNavigateToActs        = { () => navigateToPosition({ position: 2, canCoBack: true }) }
                        onNavigateToPrint       = { () => navigateToPosition({ position: 3, canCoBack: true }) }
                        onUpdateAddress         = { (id, address) => uppdate_address(id, address) }
                    />
                );
=======
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19

            case 2:
                if (!item) {
                    navigateToPosition({ position: 0, canCoBack: false });
                    return null;
                }
                return <InvoiceActs invoice={ item } />;

            case 3:
                if (!item) {
                    navigateToPosition(0);
                    return null;
                }
                return (
                    <InvoicePrintForm
                        invoice                 = { item }
                        formatDate              = { format_date }
                        formatPhone             = { format_phone }
                    />
                );

            default:
                return null;
        }
    };

    return (
        <div className="invoices-page">
<<<<<<< HEAD
            <InvoicesBreadcrumb
                currentPosition                 = { navigation.position }
                canGoBack                       = { navigation.canGoBack }
                onNavigate                      = { navigateToPosition }
                onGoBack                        = { goBack }
            />
            <div className='invoices-content'>

                { renderCurrentPage() }

            </div>
=======
            {renderCurrentPage()}

        { item !== undefined && (
          <InvoiceView
                isOpen                  = { view }
                invoice                 = { item }
                invoiceStatus           = { get_inv_status( item ) }
                formatDate              = { format_date }
                formatPhone             = { format_phone }
                onNavigateToActs        = { () => navigateToPosition({ position: 2, canCoBack: true }) }
                onNavigateToPrint       = { () => navigateToPosition({ position: 3, canCoBack: true }) }
                onUpdateAddress         = { (id, address) => uppdate_address(id, address) }
                onClose                 = { () => { setView(false) }}
            />
        )}            


>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
        </div>
    );
};

export default Invoices;