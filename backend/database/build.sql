--
-- Invokes other scripts to build and populate the database

.read rmdb.sql

.read schema2.sql

-- Add functions+triggers to maintain assets

-- \i assets.sql

-- Insert tuples

-- \i populate.sql


