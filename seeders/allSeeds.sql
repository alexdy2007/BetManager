INSERT INTO users (password, email) VALUES
    ('test', 'alexdy2007@gmail.com'),
    ('test1', 'rs@hdsas.com'),
    ('test2', 'lg@sdads.com'),
    ('test3', 'ryan@ia.com');
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
    ('30/07/2090', 1, 2),
    ('30/09/2016', 2, 3),
    ('1/07/2016', 3, 4);
INSERT INTO bookie (name, website, defaultcommission) VALUES
    ('William Hill', 'http://sports.williamhill.com/',0.02),
    ('StanJames', 'http://www.stanjames.com/', 0.03),
    ('Smarkets', 'https://smarkets.com', 0.02),
    ('Betfair', 'https://www.betfair.com/',0.04),
    ('Betfred', 'http://www.betfred.com/',0.01);