import React, { use, useEffect } from 'react';
import { useHook } from './useHook';
import { InvoicesBreadcrumb } from './components/InvoicesBreadcrumb';
import { InvoicesList } from './components/InvoiceList/InvoicesList';
import { InvoiceView } from './components/InvoiceView';
import { InvoiceActs } from './components/InvoiceActs';
import { InvoicePrintForm } from './components/InvoicePrintForm';
import { useNavigation } from './useNavigation';
import { useItem } from '../../Store/navigationStore';

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

    useEffect(()=>{
        console.log('useeffect', invoices )
    },[])

    const { item, setItem } = useItem()

    const { navigation, navigateToPosition, goBack } = useNavigation()

    const handleSelect = ( invoice: any) => {

        setItem( invoice );
        navigateToPosition( { position: 1, canCoBack: true } )

    }

    const renderCurrentPage = () => {
        
        console.log("renderPage", navigation.position)
        switch (navigation.position) {

            case 0:
                return (
                    <InvoicesList
                        invoices                = { invoices }
                        loading                 = { loading }
                        refreshing              = { loading }
                        onRefresh               = { refreshData }
                        onInvoiceSelect         = { handleSelect }
                        getInvoiceStatus        = { get_inv_status }
                        formatDate              = { format_date }
                        formatPhone             = { format_phone }
                    />
                );

            case 1:
                if (!item) {
                    return <div>Загрузка...</div>; // ✅ Заменить на это
                }
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
            <InvoicesBreadcrumb
                currentPosition                 = { navigation.position }
                canGoBack                       = { navigation.canGoBack }
                onNavigate                      = { navigateToPosition }
                onGoBack                        = { goBack }
            />
            <div className='invoices-content'>

                { renderCurrentPage() }

            </div>
        </div>
    );
};

export default Invoices;