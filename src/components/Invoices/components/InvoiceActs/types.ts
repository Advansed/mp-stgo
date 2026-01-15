// Acts/types.ts
export interface Act {
    id: string;
    invoice_id: string;
    type: ActType;
    number: string;
    created_at: Date;
    updated_at: Date;
    status: 'draft' | 'completed' | 'signed';
    data: Record<string, any>; // Данные конкретного акта
}

export type ActType = 
    | 'act_battery' 
    | 'act_counter_replace' 
    | 'act_sge' 
    | 'act_plomb' 
    | 'act_sf' 
    | 'act_ige' 
    | 'prescription';

export interface ActTemplate {
    type: ActType;
    name: string;
    icon: string;
    color: string;
    description: string;
}

export type ActViewMode = 'list' | 'create' | 'edit' | 'view';