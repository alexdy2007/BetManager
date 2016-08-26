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

SET default_tablespace = '';

SET default_with_oids = false;

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
-- Name: bet; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE bet (
    id integer NOT NULL,
    stake money DEFAULT 0 NOT NULL,
    odds double precision NOT NULL,
    snr boolean DEFAULT false NOT NULL,
    result smallint,
    resulttype character varying(30),
    eventcaseid integer NOT NULL,
    bookieaccountid integer,
    bettype integer
);


ALTER TABLE bet OWNER TO ayoung;

--
-- Name: TABLE bet; Type: COMMENT; Schema: public; Owner: ayoung
--

COMMENT ON TABLE bet IS 'individual bet that links to a event case';


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
-- Name: betcase; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE betcase (
    id integer NOT NULL,
    status smallint DEFAULT 0,
    profit numeric(10,2),
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
-- Name: bettype; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE bettype (
    id integer NOT NULL,
    type character varying(50)
);


ALTER TABLE bettype OWNER TO ayoung;

--
-- Name: bettype_id_seq; Type: SEQUENCE; Schema: public; Owner: ayoung
--

CREATE SEQUENCE bettype_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE bettype_id_seq OWNER TO ayoung;

--
-- Name: bettype_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ayoung
--

ALTER SEQUENCE bettype_id_seq OWNED BY bettype.id;


--
-- Name: bookie; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE bookie (
    id integer NOT NULL,
    name character varying(60) NOT NULL,
    website character varying(50),
    defaultcommission numeric DEFAULT 0 NOT NULL
);


ALTER TABLE bookie OWNER TO ayoung;

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
-- Name: bookieaccount; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE bookieaccount (
    id integer NOT NULL,
    username character varying(50),
    email character varying(60),
    bookieid integer,
    accountid integer NOT NULL,
    commission numeric DEFAULT 0 NOT NULL
);


ALTER TABLE bookieaccount OWNER TO ayoung;

--
-- Name: TABLE bookieaccount; Type: COMMENT; Schema: public; Owner: ayoung
--

COMMENT ON TABLE bookieaccount IS 'user set bookie accounts';


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

ALTER SEQUENCE bookieaccount_id_seq OWNED BY bookieaccount.id;


--
-- Name: eventcase; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE eventcase (
    id integer NOT NULL,
    hometeam character varying(40) NOT NULL,
    awayteam character varying(40),
    eventdate timestamp without time zone NOT NULL,
    betcaseid integer NOT NULL
);


ALTER TABLE eventcase OWNER TO ayoung;

--
-- Name: eventcase_id_seq; Type: SEQUENCE; Schema: public; Owner: ayoung
--

CREATE SEQUENCE eventcase_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE eventcase_id_seq OWNER TO ayoung;

--
-- Name: eventcase_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ayoung
--

ALTER SEQUENCE eventcase_id_seq OWNED BY eventcase.id;


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
    email character varying(60) NOT NULL
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
-- Name: usersettings; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE usersettings (
    snrcolumn boolean DEFAULT true NOT NULL,
    id integer NOT NULL,
    userid integer
);


ALTER TABLE usersettings OWNER TO ayoung;

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

ALTER SEQUENCE usersettings_id_seq OWNED BY usersettings.id;


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

ALTER TABLE ONLY betcase ALTER COLUMN id SET DEFAULT nextval('betcase_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bookie ALTER COLUMN id SET DEFAULT nextval('bookie_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bookieaccount ALTER COLUMN id SET DEFAULT nextval('bookieaccount_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY eventcase ALTER COLUMN id SET DEFAULT nextval('eventcase_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY sport ALTER COLUMN id SET DEFAULT nextval('sport_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY usersettings ALTER COLUMN id SET DEFAULT nextval('usersettings_id_seq'::regclass);


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
-- Name: bet_pkey; Type: CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bet
    ADD CONSTRAINT bet_pkey PRIMARY KEY (id);


--
-- Name: betcase_pkey; Type: CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY betcase
    ADD CONSTRAINT betcase_pkey PRIMARY KEY (id);


--
-- Name: bettype_pkey; Type: CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bettype
    ADD CONSTRAINT bettype_pkey PRIMARY KEY (id);


--
-- Name: bookie_id_pk; Type: CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bookie
    ADD CONSTRAINT bookie_id_pk PRIMARY KEY (id);


--
-- Name: bookieaccount_pkey; Type: CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bookieaccount
    ADD CONSTRAINT bookieaccount_pkey PRIMARY KEY (id);


--
-- Name: eventcase_pkey; Type: CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY eventcase
    ADD CONSTRAINT eventcase_pkey PRIMARY KEY (id);


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

ALTER TABLE ONLY usersettings
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
-- Name: betType_id_uindex; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE UNIQUE INDEX "betType_id_uindex" ON bettype USING btree (id);


--
-- Name: bet_id_uindex; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE UNIQUE INDEX bet_id_uindex ON bet USING btree (id);


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

CREATE UNIQUE INDEX bookieaccount_id_uindex ON bookieaccount USING btree (id);


--
-- Name: eventcase_id_uindex; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE UNIQUE INDEX eventcase_id_uindex ON eventcase USING btree (id);


--
-- Name: fki_account__accounttype_fk_id; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_account__accounttype_fk_id ON account USING btree (accounttypeid);


--
-- Name: fki_bet_bettype_id_fk; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_bet_bettype_id_fk ON bet USING btree (bettype);


--
-- Name: fki_bet_bookieaccount_id_fk; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_bet_bookieaccount_id_fk ON bet USING btree (bookieaccountid);


--
-- Name: fki_betcase_account_id_fk; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_betcase_account_id_fk ON betcase USING btree (accountid);


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

CREATE UNIQUE INDEX usersettings_id_uindex ON usersettings USING btree (id);


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
-- Name: bet_bettype_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bet
    ADD CONSTRAINT bet_bettype_id_fk FOREIGN KEY (bettype) REFERENCES bettype(id) ON UPDATE SET DEFAULT ON DELETE SET DEFAULT;


--
-- Name: bet_bookieaccount_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bet
    ADD CONSTRAINT bet_bookieaccount_id_fk FOREIGN KEY (bookieaccountid) REFERENCES bookieaccount(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- Name: bet_eventcase_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bet
    ADD CONSTRAINT bet_eventcase_id_fk FOREIGN KEY (eventcaseid) REFERENCES eventcase(id) ON UPDATE CASCADE ON DELETE CASCADE;


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

ALTER TABLE ONLY bookieaccount
    ADD CONSTRAINT bookieaccount_bookie_id_fk FOREIGN KEY (bookieid) REFERENCES bookie(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: bookieaccount_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY bookieaccount
    ADD CONSTRAINT bookieaccount_user_id_fk FOREIGN KEY (accountid) REFERENCES account(id);


--
-- Name: eventcase_betcase_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY eventcase
    ADD CONSTRAINT eventcase_betcase_id_fk FOREIGN KEY (betcaseid) REFERENCES betcase(id) ON UPDATE CASCADE ON DELETE CASCADE;


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

