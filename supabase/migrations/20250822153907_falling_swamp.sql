/*
  # Create consultations table

  1. New Tables
    - `consultations`
      - `id` (uuid, primary key)
      - `full_name` (text, required)
      - `email` (text, required)
      - `phone_number` (text, required)
      - `country_of_choice` (text, optional)
      - `level_of_education` (text, optional)
      - `selected_service` (text, optional)
      - `service_price` (text, optional)
      - `additional_comments` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `consultations` table
    - Add policy for public insert access (for form submissions)
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone_number text NOT NULL,
  country_of_choice text,
  level_of_education text,
  selected_service text,
  service_price text,
  additional_comments text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Allow public to insert consultations (for form submissions)
CREATE POLICY "Anyone can submit consultation requests"
  ON consultations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all consultations (for admin access)
CREATE POLICY "Authenticated users can read consultations"
  ON consultations
  FOR SELECT
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_consultations_updated_at
  BEFORE UPDATE ON consultations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();