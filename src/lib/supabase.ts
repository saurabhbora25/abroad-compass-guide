import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ConsultationData = {
  id?: string;
  full_name: string;
  email: string;
  phone_number: string;
  country_of_choice?: string;
  level_of_education?: string;
  selected_service?: string;
  service_price?: string;
  additional_comments?: string;
  created_at?: string;
  updated_at?: string;
};

export const submitConsultation = async (data: Omit<ConsultationData, 'id' | 'created_at' | 'updated_at'>) => {
  const { data: result, error } = await supabase
    .from('consultations')
    .insert([data])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return result;
};