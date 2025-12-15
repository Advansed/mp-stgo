// src/components/Lics/AddressForm.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonSpinner,
    IonText
} from '@ionic/react';
import { locationOutline, ellipsisHorizontal, saveOutline } from 'ionicons/icons';
import './FindAddress.css';
import { ConfidenceLevel, StandardizedAddress, useDaData } from '../../../dadata-component';
import { useToast } from '../../../Toast/useToast';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface LicsProps {
    initialAddress?: string;
    invoiceId?: string;
    onAddressChange?: (address: string, isStandardized: boolean) => void;
    onAddressSaved?: (address: string) => Promise<void>;
    onAddressClosed?: () => void;
    disabled?: boolean;
}

export function AddressForm({ 
    initialAddress = '', 
    invoiceId,
    onAddressChange, 
    onAddressSaved,
    onAddressClosed,
    disabled = false 
}: LicsProps) {
    const [address, setAddress] = useState<string>(initialAddress);
<<<<<<< HEAD
    const [standardizedAddress, setStandardizedAddress] = useState<string>('');
=======
    const [standardizedAddress, setStandardizedAddress] = useState<any>({ address: "", lat: 0, lng: 0});
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
    const [saving, setSaving] = useState<boolean>(false);

    const toast = useToast();


    const handleSave = async () => {
        if (!onAddressSaved) return;
        
        const addressToSave = standardizedAddress;
<<<<<<< HEAD
        if (!addressToSave.trim()) {
=======
        if (!addressToSave.address.trim()) {
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
            toast.warning('Введите адрес для сохранения');
            return;
        }

        setSaving(true);
        try {
            await onAddressSaved( standardizedAddress );
            toast.success('Адрес успешно сохранен');
        } catch (error) {
            console.error('Ошибка сохранения:', error);
            toast.error('Не удалось сохранить адрес');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="address-form">
            <IonCard className="address-form-card">
                <IonCardHeader className="address-form-header">
                    <IonCardTitle className="address-form-title">
                        <IonIcon icon={locationOutline} />
                        Ввод и стандартизация адреса
                    </IonCardTitle>
                    <IonText className="description-text">
                        Введите адрес. Стандартизация выполняется автоматически через 0.8 сек после окончания ввода.
                    </IonText>
                </IonCardHeader>

                <IonCardContent className="address-form-content">
                    <AddressSuggestions token='50bfb3453a528d091723900fdae5ca5a30369832'
                        value  = { {value: address} as any } 
                        onChange={(e)=>{
                            console.log(e?.value)
<<<<<<< HEAD
                            setStandardizedAddress(e?.value as string)
=======
                            setStandardizedAddress({
                                address: e?.value as string,
                                lat:    e?.data.geo_lat,
                                lng:    e?.data.geo_lon,
                            })
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
                        }} 
                    />

                    <div className='mt-1 cl-prim'>
<<<<<<< HEAD
                        { standardizedAddress }
=======
                        { standardizedAddress.address }
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
                    </div>

                    {/* Кнопки управления */}
                    <div className="address-buttons">

                        {onAddressSaved && (
                            <IonButton
                                expand  = "block"
                                fill    = "outline"
                                onClick = {handleSave}
<<<<<<< HEAD
                                disabled={saving || !standardizedAddress.trim()}
=======
                                disabled={saving || !standardizedAddress.address.trim()}
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
                            >
                                {saving ? (
                                    <>
                                        <IonSpinner name="crescent" className="address-form-spinner" />
                                        Сохранение...
                                    </>
                                ) : (
                                    <>
                                        <IonIcon icon={saveOutline} slot="start" />
                                        Сохранить адрес
                                    </>
                                )}
                            </IonButton>
                        )}
                            <IonButton
                                expand="block"
                                fill="outline"
                                onClick={ onAddressClosed }
                            >
                                {saving ? (
                                    <>
                                        <IonSpinner name="crescent" className="address-form-spinner" />
                                        Сохранение...
                                    </>
                                ) : (
                                    <>
                                        <IonIcon icon={saveOutline} slot="start" />
                                        Закрыть
                                    </>
                                )}
                            </IonButton>
                    </div>
                </IonCardContent>
            </IonCard>
        </div>
    );
}