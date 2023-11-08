import { createClient } from '@supabase/supabase-js'
import { defaultConfig } from 'next/dist/server/config-shared';

const supabaseUrl = 'https://kqervxmidskoyteehzht.supabase.co'
const supabaseKey: string = process.env.SUPABASE_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxZXJ2eG1pZHNrb3l0ZWVoemh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0NjU1NTIsImV4cCI6MjAxNTA0MTU1Mn0.oKuApAKd_P6gocTR_ov5tq5jACys2Kc5Sde8TzNaYL4' ;


const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;