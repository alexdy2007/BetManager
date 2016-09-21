--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.3
-- Dumped by pg_dump version 9.5.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: add_name_to_bet(); Type: FUNCTION; Schema: public; Owner: ayoung
--

CREATE FUNCTION add_name_to_bet() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF NEW.betmarket IS NULL OR NEW.betmarket = '' THEN
    NEW.betmarket := TG_TABLE_NAME;
  END IF;
  RETURN NEW;
END$$;


ALTER FUNCTION public.add_name_to_bet() OWNER TO ayoung;

--
-- Name: betprofitcalc(); Type: FUNCTION; Schema: public; Owner: ayoung
--

CREATE FUNCTION betprofitcalc() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

DECLARE
	free_bet boolean;
	free_stake_returned numeric;
BEGIN

	--IF SNR free_stake_to_return = stake
	IF NEW.bettypeid = 3 THEN
	    free_bet := true;
	    free_stake_returned := 0;
        ELSIF NEW.bettypeid = 4 THEN
	    free_bet := true;
	    free_stake_returned := NEW.stake;
	ELSE
	    free_bet := false;
	    free_stake_returned := 0;
	END IF;
    
        --IF SUSPENDED
        IF NEW.betstatusid = 4 THEN
            NEW.profit:=0;
            RETURN NEW;
        END IF;

	IF NEW.bet_specific->>'betmarket' = 'fb_absolute' THEN
		--IF BET STATUS IS PENDING
		IF NEW.betstatusid=1 THEN
		    NEW.profit:=0;
		--IF BETSTATUS IS WON
		ELSIF NEW.betstatusid=2 THEN
		    NEW.profit:= ((NEW.stake::numeric * NEW.odds::numeric) * (1-NEW.commission)) + free_stake_returned;
		--IF BETSTATUS IS NOT LOST
		ELSIF NEW.betstatusid=3 THEN
		    -- IF LOST |FREE BET PROFIT 0 ELSE -STAKE
		    IF free_bet THEN
			NEW.profit:= 0;
		    ELSE
			NEW.profit:= -NEW.stake::numeric;
		    END IF;
		--IF BETSTATUS IS BETRETURNED (Match Cancelled)
		ELSE
			NEW.profit:= NEW.stake::numeric;
		END IF;
		RETURN NEW;
        ELSE 
		NEW.profit:= 0;
		RETURN NEW;
	END IF;
END;
$$;


ALTER FUNCTION public.betprofitcalc() OWNER TO ayoung;

--
-- Name: fb_absolute_profit_calc(); Type: FUNCTION; Schema: public; Owner: ayoung
--

CREATE FUNCTION fb_absolute_profit_calc() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

DECLARE
	free_bet boolean;
	free_stake_returned numeric;
BEGIN

	--IF SNR free_stake_to_return = stake
	IF NEW.bettypeid = 3 THEN
	    free_bet := false;
	    free_stake_returned := 0;
        ELSIF NEW.bettypeid = 4 THEN
	    free_bet := true;
	    free_stake_returned := NEW.stake;
	ELSE
	    free_bet := false;
	    free_stake_returned := 0;
	END IF;
    
        --IF SUSPENDED
        IF NEW.resulttypeid = 4 THEN
            NEW.profit:=0;
            RETURN NEW;
        END IF;
	
	--IF STILL NOT FULFILLED (NOT FILLED IN)
        IF NEW.betstatusid=0 THEN
            NEW.profit:=0;
	--IF BET IS FULFILLED (WON)
        ELSIF NEW.betstatusid=1 THEN
	    NEW.profit:= ((NEW.stake::numeric * NEW.odds::numeric) * (1-NEW.commission)) + free_stake_returned;
	--IF BET IS NOT FULFILLED(LOST)
        ELSE
	    -- IF LOST |FREE BET PROFIT 0 ELSE -STAKE
	    IF free_bet THEN
                NEW.profit:= 0;
	    ELSE
	        NEW.profit:= -NEW.stake::numeric;
	    END IF;
	END IF;
	RETURN NEW;
END;
$$;


ALTER FUNCTION public.fb_absolute_profit_calc() OWNER TO ayoung;

--
-- Name: fb_ht_ft_result_profit_calc(); Type: FUNCTION; Schema: public; Owner: ayoung
--

CREATE FUNCTION fb_ht_ft_result_profit_calc() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

DECLARE
	free_bet boolean;
	free_stake_returned numeric;
BEGIN

	--IF SNR free_stake_to_return = stake
	IF NEW.bettypeid = 3 THEN
	    free_bet := false;
	    free_stake_returned := 0;
        ELSIF NEW.bettypeid = 4 THEN
	    free_bet := true;
	    free_stake_returned := NEW.stake;
	ELSE
	    free_bet := false;
	    free_stake_returned := 0;
	END IF;
    
	--IF STILL NOT FULFILLED (NOT FILLED IN)
        IF NEW.betstatusid=0 THEN
            NEW.profit:=0;
	--IF BET IS FULFILLED (WON)
        ELSIF NEW.betstatusid=1 THEN
	    NEW.profit:= ((NEW.stake::numeric * NEW.odds::numeric) * (1-NEW.commission)) + free_stake_returned;
	--IF BET IS NOT FULFILLED(LOST)
        ELSE
	    -- IF LOST |FREE BET PROFIT 0 ELSE -STAKE
	    IF free_bet THEN
                NEW.profit:= 0;
	    ELSE
	        NEW.profit:= -NEW.stake::numeric;
	    END IF;
	END IF;
	RETURN NEW;
END;
$$;


ALTER FUNCTION public.fb_ht_ft_result_profit_calc() OWNER TO ayoung;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: bet; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE bet (
    stake money DEFAULT 0 NOT NULL,
    odds double precision NOT NULL,
    bookieaccountid integer NOT NULL,
    commission numeric(12,4) NOT NULL,
    laybet boolean DEFAULT false NOT NULL,
    datetime timestamp without time zone NOT NULL,
    betcaseid integer NOT NULL,
    id integer NOT NULL,
    sportid integer NOT NULL,
    bettypeid integer DEFAULT 1 NOT NULL,
    betstatusid integer DEFAULT 1,
    profit numeric(12,4),
    bet_specific jsonb
);


ALTER TABLE bet OWNER TO ayoung;

--
-- Name: TABLE bet; Type: COMMENT; Schema: public; Owner: ayoung
--

COMMENT ON TABLE bet IS 'individual bet that links to a event case';


--
-- Name: abstract_bet_id_seq; Type: SEQUENCE; Schema: public; Owner: ayoung
--

CREATE SEQUENCE abstract_bet_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE abstract_bet_id_seq OWNER TO ayoung;

--
-- Name: abstract_bet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ayoung
--

ALTER SEQUENCE abstract_bet_id_seq OWNED BY bet.id;


--
-- Name: account; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE account (
    id integer NOT NULL,
    expirydate date,
    userid integer NOT NULL,
    accounttypeid integer DEFAULT 1 NOT NULL
);


ALTER TABLE account OWNER TO ayoung;

--
-- Name: account_id_seq; Type: SEQUENCE; Schema: public; Owner: ayoung
--

CREATE SEQUENCE account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE account_id_seq OWNER TO ayoung;

--
-- Name: account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ayoung
--

ALTER SEQUENCE account_id_seq OWNED BY account.id;


--
-- Name: accounttypes; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE accounttypes (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE accounttypes OWNER TO ayoung;

--
-- Name: accounttypes_id_seq; Type: SEQUENCE; Schema: public; Owner: ayoung
--

CREATE SEQUENCE accounttypes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE accounttypes_id_seq OWNER TO ayoung;

--
-- Name: accounttypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ayoung
--

ALTER SEQUENCE accounttypes_id_seq OWNED BY accounttypes.id;


--
-- Name: bet_id_seq; Type: SEQUENCE; Schema: public; Owner: ayoung
--

CREATE SEQUENCE bet_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE bet_id_seq OWNER TO ayoung;

--
-- Name: bet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ayoung
--

ALTER SEQUENCE bet_id_seq OWNED BY bet.id;


--
-- Name: bet_status; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE bet_status (
    id integer NOT NULL,
    name character varying(20) NOT NULL
);


ALTER TABLE bet_status OWNER TO ayoung;

--
-- Name: bet_status_id_seq; Type: SEQUENCE; Schema: public; Owner: ayoung
--

CREATE SEQUENCE bet_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE bet_status_id_seq OWNER TO ayoung;

--
-- Name: bet_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ayoung
--

ALTER SEQUENCE bet_status_id_seq OWNED BY bet_status.id;


--
-- Name: bet_type; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE bet_type (
    id integer NOT NULL,
    name character varying(20) NOT NULL,
    comment text
);


ALTER TABLE bet_type OWNER TO ayoung;

--
-- Name: bet_type_id_seq; Type: SEQUENCE; Schema: public; Owner: ayoung
--

CREATE SEQUENCE bet_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE bet_type_id_seq OWNER TO ayoung;

--
-- Name: bet_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ayoung
--

ALTER SEQUENCE bet_type_id_seq OWNED BY bet_type.id;


--
-- Name: betcase; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE betcase (
    id integer NOT NULL,
    statusactive boolean DEFAULT true,
    accountid integer NOT NULL,
    sportid integer
);


ALTER TABLE betcase OWNER TO ayoung;

--
-- Name: TABLE betcase; Type: COMMENT; Schema: public; Owner: ayoung
--

COMMENT ON TABLE betcase IS 'bet case made up of event cases';


--
-- Name: betcase_id_seq; Type: SEQUENCE; Schema: public; Owner: ayoung
--

CREATE SEQUENCE betcase_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE betcase_id_seq OWNER TO ayoung;

--
-- Name: betcase_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ayoung
--

ALTER SEQUENCE betcase_id_seq OWNED BY betcase.id;


--
-- Name: bookie; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE bookie (
    id integer NOT NULL,
    name character varying(60) NOT NULL,
    website character varying(50),
    defaultcommission numeric DEFAULT 0 NOT NULL,
    color character(7) DEFAULT '#000000'::bpchar
);


ALTER TABLE bookie OWNER TO ayoung;

--
-- Name: bookie_account; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE bookie_account (
    id integer NOT NULL,
    username character varying(50),
    bookieid integer,
    accountid integer NOT NULL,
    commission numeric DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL
);


ALTER TABLE bookie_account OWNER TO ayoung;

--
-- Name: TABLE bookie_account; Type: COMMENT; Schema: public; Owner: ayoung
--

COMMENT ON TABLE bookie_account IS 'user set bookie accounts';


--
-- Name: bookie_account_overview; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE bookie_account_overview (
    bookie_account_id integer,
    accountid integer,
    username character varying(50),
    bookie_name character varying(60),
    bookie_color character(7),
    commission numeric,
    total_bets bigint,
    winnings numeric,
    regular_bets bigint,
    free_bets bigint
);

ALTER TABLE ONLY bookie_account_overview REPLICA IDENTITY NOTHING;


ALTER TABLE bookie_account_overview OWNER TO ayoung;

--
-- Name: bookie_id_seq; Type: SEQUENCE; Schema: public; Owner: ayoung
--

CREATE SEQUENCE bookie_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE bookie_id_seq OWNER TO ayoung;

--
-- Name: bookie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ayoung
--

ALTER SEQUENCE bookie_id_seq OWNED BY bookie.id;


--
-- Name: bookieaccount_id_seq; Type: SEQUENCE; Schema: public; Owner: ayoung
--

CREATE SEQUENCE bookieaccount_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE bookieaccount_id_seq OWNER TO ayoung;

--
-- Name: bookieaccount_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ayoung
--

ALTER SEQUENCE bookieaccount_id_seq OWNED BY bookie_account.id;


--
-- Name: sessionstore; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE sessionstore (
    id integer NOT NULL,
    userid integer,
    cookiehash character varying(400),
    date_created date DEFAULT now() NOT NULL
);


ALTER TABLE sessionstore OWNER TO ayoung;

--
-- Name: sessionstore_id_seq; Type: SEQUENCE; Schema: public; Owner: ayoung
--

CREATE SEQUENCE sessionstore_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sessionstore_id_seq OWNER TO ayoung;

--
-- Name: sessionstore_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ayoung
--

ALTER SEQUENCE sessionstore_id_seq OWNED BY sessionstore.id;


--
-- Name: sport; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE sport (
    id integer NOT NULL,
    sporttype character varying(50) NOT NULL
);


ALTER TABLE sport OWNER TO ayoung;

--
-- Name: TABLE sport; Type: COMMENT; Schema: public; Owner: ayoung
--

COMMENT ON TABLE sport IS 'list of sports';


--
-- Name: sport_id_seq; Type: SEQUENCE; Schema: public; Owner: ayoung
--

CREATE SEQUENCE sport_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sport_id_seq OWNER TO ayoung;

--
-- Name: sport_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ayoung
--

ALTER SEQUENCE sport_id_seq OWNED BY sport.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE users (
    id integer NOT NULL,
    password character varying(60) NOT NULL,
    email character varying(60) NOT NULL,
    admin boolean DEFAULT false NOT NULL
);


ALTER TABLE users OWNER TO ayoung;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: ayoung
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_id_seq OWNER TO ayoung;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ayoung
--

ALTER SEQUENCE user_id_seq OWNED BY users.id;


--
-- Name: user_settings; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE user_settings (
    snrcolumn boolean DEFAULT true NOT NULL,
    id integer NOT NULL,
    userid integer
);


ALTER TABLE user_settings OWNER TO ayoung;

--
-- Name: usersettings_id_seq; Type: SEQUENCE; Schema: public; Owner: ayoung
--

CREATE SEQUENCE usersettings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE usersettings_id_seq OWNER TO ayoung;

--
-- Name: usersettings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ayoung
--

ALTER SEQUENCE usersettings_id_seq OWNED BY user_settings.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY account ALTER COLUMN id SET DEFAULT nextval('account_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY accounttypes ALTER COLUMN id SET DEFAULT nextval('accounttypes_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bet ALTER COLUMN id SET DEFAULT nextval('bet_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bet_status ALTER COLUMN id SET DEFAULT nextval('bet_status_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bet_type ALTER COLUMN id SET DEFAULT nextval('bet_type_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY betcase ALTER COLUMN id SET DEFAULT nextval('betcase_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bookie ALTER COLUMN id SET DEFAULT nextval('bookie_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bookie_account ALTER COLUMN id SET DEFAULT nextval('bookieaccount_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY sessionstore ALTER COLUMN id SET DEFAULT nextval('sessionstore_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY sport ALTER COLUMN id SET DEFAULT nextval('sport_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY user_settings ALTER COLUMN id SET DEFAULT nextval('usersettings_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- Name: account_pkey; Type: CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: accounttypes_pkey; Type: CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY accounttypes
    ADD CONSTRAINT accounttypes_pkey PRIMARY KEY (id);


--
-- Name: bet_id_pk; Type: CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bet
    ADD CONSTRAINT bet_id_pk PRIMARY KEY (id);


--
-- Name: bet_status_pkey; Type: CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bet_status
    ADD CONSTRAINT bet_status_pkey PRIMARY KEY (id);


--
-- Name: bet_type_pkey; Type: CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bet_type
    ADD CONSTRAINT bet_type_pkey PRIMARY KEY (id);


--
-- Name: betcase_pkey; Type: CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY betcase
    ADD CONSTRAINT betcase_pkey PRIMARY KEY (id);


--
-- Name: bookie_id_pk; Type: CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bookie
    ADD CONSTRAINT bookie_id_pk PRIMARY KEY (id);


--
-- Name: bookieaccount_pkey; Type: CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bookie_account
    ADD CONSTRAINT bookieaccount_pkey PRIMARY KEY (id);


--
-- Name: sessionstore_pkey; Type: CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY sessionstore
    ADD CONSTRAINT sessionstore_pkey PRIMARY KEY (id);


--
-- Name: sport_pkey; Type: CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY sport
    ADD CONSTRAINT sport_pkey PRIMARY KEY (id);


--
-- Name: user_pkey; Type: CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: usersettings_pkey; Type: CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY user_settings
    ADD CONSTRAINT usersettings_pkey PRIMARY KEY (id);


--
-- Name: Account_id_uindex; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE UNIQUE INDEX "Account_id_uindex" ON account USING btree (id);


--
-- Name: accountTypes_id_uindex; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE UNIQUE INDEX "accountTypes_id_uindex" ON accounttypes USING btree (id);


--
-- Name: accountTypes_name_uindex; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE UNIQUE INDEX "accountTypes_name_uindex" ON accounttypes USING btree (name);


--
-- Name: bet_id_uindex; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE UNIQUE INDEX bet_id_uindex ON bet USING btree (id);


--
-- Name: bet_status_id_uindex; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE UNIQUE INDEX bet_status_id_uindex ON bet_status USING btree (id);


--
-- Name: bet_type_id_uindex; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE UNIQUE INDEX bet_type_id_uindex ON bet_type USING btree (id);


--
-- Name: bet_type_name_uindex; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE UNIQUE INDEX bet_type_name_uindex ON bet_type USING btree (name);


--
-- Name: betcase_id_uindex; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE UNIQUE INDEX betcase_id_uindex ON betcase USING btree (id);


--
-- Name: bookie_id_uindex; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE UNIQUE INDEX bookie_id_uindex ON bookie USING btree (id);


--
-- Name: bookieaccount_id_uindex; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE UNIQUE INDEX bookieaccount_id_uindex ON bookie_account USING btree (id);


--
-- Name: fki_account__accounttype_fk_id; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_account__accounttype_fk_id ON account USING btree (accounttypeid);


--
-- Name: fki_bet_betcase_id_fk; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_bet_betcase_id_fk ON bet USING btree (betcaseid);


--
-- Name: fki_bet_betstatus_id_fk; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_bet_betstatus_id_fk ON bet USING btree (betstatusid);


--
-- Name: fki_bet_bettype_id_fk; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_bet_bettype_id_fk ON bet USING btree (bettypeid);


--
-- Name: fki_bet_sport_id_fk; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_bet_sport_id_fk ON bet USING btree (sportid);


--
-- Name: fki_betcase_account_id_fk; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_betcase_account_id_fk ON betcase USING btree (accountid);


--
-- Name: fki_betcase_sport_id_fk; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_betcase_sport_id_fk ON betcase USING btree (sportid);


--
-- Name: sessionStore_id_uindex; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE UNIQUE INDEX "sessionStore_id_uindex" ON sessionstore USING btree (id);


--
-- Name: sport_id_uindex; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE UNIQUE INDEX sport_id_uindex ON sport USING btree (id);


--
-- Name: sport_sport_type_uindex; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE UNIQUE INDEX sport_sport_type_uindex ON sport USING btree (sporttype);


--
-- Name: user_id_uindex; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE UNIQUE INDEX user_id_uindex ON users USING btree (id);


--
-- Name: usersettings_id_uindex; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE UNIQUE INDEX usersettings_id_uindex ON user_settings USING btree (id);


--
-- Name: _RETURN; Type: RULE; Schema: public; Owner: ayoung
--

CREATE RULE "_RETURN" AS
    ON SELECT TO bookie_account_overview DO INSTEAD  WITH betcounting AS (
         SELECT bookie_account_1.id AS bookie_account_id,
            count(bet_1.id) AS total_bets,
            count(
                CASE
                    WHEN (bet_1.profit > (0)::numeric) THEN 1
                    ELSE NULL::integer
                END) AS total_wins,
            sum(bet_1.profit) AS winnings,
            count(
                CASE
                    WHEN ((bet_1.bettypeid = 1) OR (bet_1.bettypeid = 2)) THEN 1
                    ELSE NULL::integer
                END) AS regular_bets,
            count(
                CASE
                    WHEN ((bet_1.bettypeid = 3) OR (bet_1.bettypeid = 4)) THEN 1
                    ELSE NULL::integer
                END) AS free_bets
           FROM bookie_account bookie_account_1,
            bet bet_1,
            bookie bookie_1
          WHERE ((bet_1.bookieaccountid = bookie_account_1.id) AND (bookie_account_1.bookieid = bookie_1.id))
          GROUP BY bookie_account_1.id, bookie_1.name, bookie_1.color
        )
 SELECT bookie_account.id AS bookie_account_id,
    bookie_account.accountid,
    bookie_account.username,
    bookie.name AS bookie_name,
    bookie.color AS bookie_color,
    bookie_account.commission,
    COALESCE(betcounting.total_bets, (0)::bigint) AS total_bets,
    COALESCE(betcounting.winnings, (0)::numeric) AS winnings,
    COALESCE(betcounting.regular_bets, (0)::bigint) AS regular_bets,
    COALESCE(betcounting.free_bets, (0)::bigint) AS free_bets
   FROM bet,
    bookie,
    (bookie_account
     LEFT JOIN betcounting ON ((bookie_account.id = betcounting.bookie_account_id)))
  WHERE (bookie_account.bookieid = bookie.id)
  GROUP BY bookie_account.id, bookie_account.username, bookie_account.accountid, bookie.name, bookie.color, betcounting.total_bets, betcounting.winnings, betcounting.regular_bets, betcounting.free_bets;


--
-- Name: bet_profit_trigger; Type: TRIGGER; Schema: public; Owner: ayoung
--

CREATE TRIGGER bet_profit_trigger BEFORE INSERT OR UPDATE ON bet FOR EACH ROW EXECUTE PROCEDURE betprofitcalc();


--
-- Name: TRIGGER bet_profit_trigger ON bet; Type: COMMENT; Schema: public; Owner: ayoung
--

COMMENT ON TRIGGER bet_profit_trigger ON bet IS 'calcs profit on bet ';


--
-- Name: account_accounttype_fk_id; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY account
    ADD CONSTRAINT account_accounttype_fk_id FOREIGN KEY (accounttypeid) REFERENCES accounttypes(id) ON UPDATE CASCADE ON DELETE SET DEFAULT DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY account
    ADD CONSTRAINT account_user_id_fk FOREIGN KEY (userid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;


--
-- Name: bet_betcase_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bet
    ADD CONSTRAINT bet_betcase_id_fk FOREIGN KEY (betcaseid) REFERENCES betcase(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: bet_betstatus_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bet
    ADD CONSTRAINT bet_betstatus_id_fk FOREIGN KEY (betstatusid) REFERENCES bet_status(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: bet_bettype_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bet
    ADD CONSTRAINT bet_bettype_id_fk FOREIGN KEY (bettypeid) REFERENCES bet_type(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: bet_sport_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bet
    ADD CONSTRAINT bet_sport_id_fk FOREIGN KEY (sportid) REFERENCES sport(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: betcase_account_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY betcase
    ADD CONSTRAINT betcase_account_id_fk FOREIGN KEY (accountid) REFERENCES account(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: betcase_sport_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY betcase
    ADD CONSTRAINT betcase_sport_id_fk FOREIGN KEY (sportid) REFERENCES sport(id);


--
-- Name: bookieaccount_bookie_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bookie_account
    ADD CONSTRAINT bookieaccount_bookie_id_fk FOREIGN KEY (bookieid) REFERENCES bookie(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: bookieaccount_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bookie_account
    ADD CONSTRAINT bookieaccount_user_id_fk FOREIGN KEY (accountid) REFERENCES account(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

