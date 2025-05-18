// Importation du client Supabase
import { createClient } from '@supabase/supabase-js';

// Informations de ton projet Supabase
const supabaseUrl = 'https://xcgrknltuxyupzenwtsj.supabase.co'; // Remplace ceci par ton URL Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjZ3Jrbmx0dXh5dXB6ZW53dHNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxODY1NDMsImV4cCI6MjA2Mjc2MjU0M30.xhi7yOu_G81mlDMTkzH1vCuqaJOPWNDRG6Y04AgKk70'; // Remplace ceci par ta clé publique anon (API key)

// Initialiser le client Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
