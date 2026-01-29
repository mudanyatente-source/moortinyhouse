-- Remove price column from models table
-- This script removes the price column as pricing will be handled through contact/quote system

-- First, check if the column exists and remove it
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'models' 
        AND column_name = 'price'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.models DROP COLUMN price;
        RAISE NOTICE 'Price column removed from models table';
    ELSE
        RAISE NOTICE 'Price column does not exist in models table';
    END IF;
END $$;