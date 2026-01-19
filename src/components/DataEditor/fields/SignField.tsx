// src/components/DataEditor/fields/ImageField.tsx
import React, { useEffect, useRef, useState } from "react";
import styles from './ImageField.module.css';
import { IonLoading, IonButton } from "@ionic/react";
import { useToast } from "../../Toast";
import SignatureCanvas from 'react-signature-canvas';

// TODO: Добавить функцию toTIFF позже

interface ImageFieldProps {
  label: string;
  value: string | { dataUrl: string; format: string } | undefined;
  onChange: (value: any) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  validate?: boolean;
}

export const SignField: React.FC<ImageFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  disabled, 
  error, 
  validate 
}) => {
  const signatureRef = useRef<SignatureCanvas>(null);
  
  const toast = useToast();

  // Обработчик изменения подписи
  const handleSignatureEnd = () => {
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      const dataURL = signatureRef.current.toDataURL('image/png');
      onChange({ dataUrl: dataURL, format: 'image/png' });
    }
  };

  // Очистка подписи
  const handleClearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
      onChange({ dataUrl: '', format: '' });
    }
  };

  // Если есть значение, устанавливаем подпись
  useEffect(() => {
    if (!signatureRef.current) return;

    // Получаем dataUrl из value (может быть строка или объект Signature)
    const dataUrl = typeof value === 'object' && value !== null && value !== undefined
      ? (value as { dataUrl?: string }).dataUrl || ''
      : (typeof value === 'string' ? value : '');

    // Если есть dataUrl и canvas пустой, загружаем изображение
    if (dataUrl && signatureRef.current.isEmpty()) {
      try {
        // Используем fromDataURL для загрузки изображения на canvas
        signatureRef.current.fromDataURL(dataUrl);
      } catch (error) {
        console.error('Ошибка загрузки подписи:', error);
        toast.error('Не удалось загрузить подпись');
      }
    } else if (!dataUrl && !signatureRef.current.isEmpty()) {
      // Если dataUrl пустой, но canvas не пустой, очищаем canvas
      signatureRef.current.clear();
    }
  }, [value, toast]);

  return (
    <>
      <div className={styles.container}>
        {label && <label className={styles.label}>{label}</label>}
        
        <div className={styles.signatureContainer}>
          <SignatureCanvas
            ref           = {signatureRef}
            penColor      = "black"
            canvasProps   = {{
              className:  styles.signatureCanvas,
              width:      500,
              height:     200
            }}
            onEnd         = { handleSignatureEnd }
            clearOnResize = { false }
          />
        </div>

        <div className={styles.controls}>
          <IonButton 
            size="small" 
            onClick={handleClearSignature}
            disabled={disabled}
          >
            Очистить
          </IonButton>
        </div>

        {placeholder && (
          !value || 
          (typeof value === 'string' && !value) || 
          (typeof value === 'object' && value !== null && !(value as { dataUrl?: string }).dataUrl)
        ) && (
          <div className={styles.placeholder}>{placeholder}</div>
        )}

        {error && <div className={styles.error}>{error}</div>}
      </div>
    </>
  );
};