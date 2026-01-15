import React, { use, useEffect }        from 'react';
import { useHook }                      from './useHook';
import { InvoicesBreadcrumb }           from './components/InvoicesBreadcrumb';
import { InvoicesList }                 from './components/InvoiceList/InvoicesList';
import { InvoiceView }                  from './components/InvoiceView';
import { InvoicePrintForm }             from './components/InvoicePrintForm';
import { useItem, useRoutes }  from '../../Store/navigationStore';
import './styles.css'
import ActsManager from './components/InvoiceActs';

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

    const { page, setPage, goBack } = useRoutes()

    const handleSelect = ( invoice: any) => {

        setItem( invoice );
        //navigateToPosition( { position: 1, canCoBack: true } )
        setPage( 1 )

    }

    useEffect(() =>{ 
        console.log("page change")
    },[page])

    const renderCurrentPage = () => {
        
        console.log("renderPage", page )

        switch ( page ) {

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
                        onNavigateToActs        = { () => setPage( 2 ) }
                        onNavigateToPrint       = { () => setPage( 3 ) }
                        onUpdateAddress         = { (id, address) => uppdate_address(id, address) }
                    />
                );

            case 2:
                if (!item) {
                    setPage( 0 );
                    return null;
                }
                //return <InvoiceActs invoice={ item } />;
                return <ActsManager invoice = { item }/>

            case 3:
                if (!item) {
                    setPage( 0 );
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
                page                            = { page }
                canGoBack                       = { page !== 0 }
                onPage                          = { setPage }
                onGoBack                        = { goBack }
            />
            <div className = 'invoices-content'>

                { renderCurrentPage() }

            </div>
        </div>
    );
};

export default Invoices;