INSERT INTO users (first_name, last_name, username, password) VALUES
    ('Alex', 'Young', 'alexdy2007', 'test'),
    ('Ryan', 'Smith', 'rsmith', 'test1'),
    ('Lucy', 'Green', 'lGreen', 'test2');
INSERT INTO accounttypes (name) VALUES
    ('NotAssigned'),
    ('MonthlyPaid'),
    ('Trail'),
    ('Expired');
INSERT INTO sport (sporttype) VALUES
    ('Football'),
    ('HorseRacing'),
    ('Rugby'),
    ('Tennis');
INSERT INTO account (expiryDate, userid, accounttypeid) VALUES
    ('30/07/2090', 1, 1),
    ('30/09/2016', 2, 2),
    ('1/07/2016', 3, 3);