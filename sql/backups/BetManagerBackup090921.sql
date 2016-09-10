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
-- Name: abstract_bet; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE abstract_bet (
    stake money DEFAULT 0 NOT NULL,
    odds double precision NOT NULL,
    snr boolean DEFAULT false NOT NULL,
    bookieaccountid integer,
    commission numeric,
    laybet boolean DEFAULT false NOT NULL,
    datetime timestamp without time zone,
    betcaseid integer NOT NULL,
    id integer NOT NULL,
    sportid integer
);


ALTER TABLE abstract_bet OWNER TO ayoung;

--
-- Name: TABLE abstract_bet; Type: COMMENT; Schema: public; Owner: ayoung
--

COMMENT ON TABLE abstract_bet IS 'individual bet that links to a event case';


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

ALTER SEQUENCE abstract_bet_id_seq OWNED BY abstract_bet.id;


--
-- Name: abstract_fb; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE abstract_fb (
    hometeam character varying(50),
    awayteam character varying(50)
)
INHERITS (abstract_bet);


ALTER TABLE abstract_fb OWNER TO ayoung;

--
-- Name: abstract_tennis; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE abstract_tennis (
    player1 character varying(20),
    player2 character varying(20)
)
INHERITS (abstract_bet);


ALTER TABLE abstract_tennis OWNER TO ayoung;

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
-- Name: betcase; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE betcase (
    id integer NOT NULL,
    status smallint DEFAULT 0,
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
    defaultcommission numeric DEFAULT 0 NOT NULL
);


ALTER TABLE bookie OWNER TO ayoung;

--
-- Name: bookie_account; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE bookie_account (
    id integer NOT NULL,
    username character varying(50),
    email character varying(60),
    bookieid integer,
    accountid integer NOT NULL,
    commission numeric DEFAULT 0 NOT NULL
);


ALTER TABLE bookie_account OWNER TO ayoung;

--
-- Name: TABLE bookie_account; Type: COMMENT; Schema: public; Owner: ayoung
--

COMMENT ON TABLE bookie_account IS 'user set bookie accounts';


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
-- Name: fb_absolute; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE fb_absolute (
    result character varying(20)
)
INHERITS (abstract_fb);


ALTER TABLE fb_absolute OWNER TO ayoung;

--
-- Name: fb_ht_ft_result; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE fb_ht_ft_result (
    ht_result character varying(20),
    ft_result character varying(20)
)
INHERITS (abstract_fb);


ALTER TABLE fb_ht_ft_result OWNER TO ayoung;

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
-- Name: tennis_score; Type: TABLE; Schema: public; Owner: ayoung
--

CREATE TABLE tennis_score (
    player1_score integer,
    player2_score integer
)
INHERITS (abstract_tennis);


ALTER TABLE tennis_score OWNER TO ayoung;

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

ALTER TABLE ONLY abstract_bet ALTER COLUMN id SET DEFAULT nextval('abstract_bet_id_seq'::regclass);


--
-- Name: stake; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY abstract_fb ALTER COLUMN stake SET DEFAULT 0;


--
-- Name: snr; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY abstract_fb ALTER COLUMN snr SET DEFAULT false;


--
-- Name: laybet; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY abstract_fb ALTER COLUMN laybet SET DEFAULT false;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY abstract_fb ALTER COLUMN id SET DEFAULT nextval('abstract_bet_id_seq'::regclass);


--
-- Name: stake; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY abstract_tennis ALTER COLUMN stake SET DEFAULT 0;


--
-- Name: snr; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY abstract_tennis ALTER COLUMN snr SET DEFAULT false;


--
-- Name: laybet; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY abstract_tennis ALTER COLUMN laybet SET DEFAULT false;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY abstract_tennis ALTER COLUMN id SET DEFAULT nextval('abstract_bet_id_seq'::regclass);


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
-- Name: stake; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY fb_absolute ALTER COLUMN stake SET DEFAULT 0;


--
-- Name: snr; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY fb_absolute ALTER COLUMN snr SET DEFAULT false;


--
-- Name: laybet; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY fb_absolute ALTER COLUMN laybet SET DEFAULT false;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY fb_absolute ALTER COLUMN id SET DEFAULT nextval('abstract_bet_id_seq'::regclass);


--
-- Name: stake; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY fb_ht_ft_result ALTER COLUMN stake SET DEFAULT 0;


--
-- Name: snr; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY fb_ht_ft_result ALTER COLUMN snr SET DEFAULT false;


--
-- Name: laybet; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY fb_ht_ft_result ALTER COLUMN laybet SET DEFAULT false;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY fb_ht_ft_result ALTER COLUMN id SET DEFAULT nextval('abstract_bet_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY sessionstore ALTER COLUMN id SET DEFAULT nextval('sessionstore_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY sport ALTER COLUMN id SET DEFAULT nextval('sport_id_seq'::regclass);


--
-- Name: stake; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY tennis_score ALTER COLUMN stake SET DEFAULT 0;


--
-- Name: snr; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY tennis_score ALTER COLUMN snr SET DEFAULT false;


--
-- Name: laybet; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY tennis_score ALTER COLUMN laybet SET DEFAULT false;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY tennis_score ALTER COLUMN id SET DEFAULT nextval('abstract_bet_id_seq'::regclass);


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
-- Name: fb_absolute_pkey; Type: CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY fb_absolute
    ADD CONSTRAINT fb_absolute_pkey PRIMARY KEY (id);


--
-- Name: fb_ht_ft_result_pkey; Type: CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY fb_ht_ft_result
    ADD CONSTRAINT fb_ht_ft_result_pkey PRIMARY KEY (id);


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
-- Name: tennis_score_pkey; Type: CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY tennis_score
    ADD CONSTRAINT tennis_score_pkey PRIMARY KEY (id);


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
-- Name: fki_betcase_account_id_fk; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_betcase_account_id_fk ON betcase USING btree (accountid);


--
-- Name: fki_betcase_sport_id_fk; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_betcase_sport_id_fk ON betcase USING btree (sportid);


--
-- Name: fki_fb_absolute_betcase_id_fk; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_fb_absolute_betcase_id_fk ON fb_absolute USING btree (betcaseid);


--
-- Name: fki_fb_absolute_bookie_account_id_fk; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_fb_absolute_bookie_account_id_fk ON fb_absolute USING btree (bookieaccountid);


--
-- Name: fki_fb_absolute_sport_id_fk; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_fb_absolute_sport_id_fk ON fb_absolute USING btree (sportid);


--
-- Name: fki_fb_ht_ft_result_betcase_id_fk; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_fb_ht_ft_result_betcase_id_fk ON fb_ht_ft_result USING btree (betcaseid);


--
-- Name: fki_fb_ht_ft_result_bookie_account_id_fk; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_fb_ht_ft_result_bookie_account_id_fk ON fb_ht_ft_result USING btree (bookieaccountid);


--
-- Name: fki_fb_ht_ft_result_sport_id_fk; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_fb_ht_ft_result_sport_id_fk ON fb_ht_ft_result USING btree (sportid);


--
-- Name: fki_tennis_score_betcase_id_fk; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_tennis_score_betcase_id_fk ON tennis_score USING btree (betcaseid);


--
-- Name: fki_tennis_score_bookie_account_id_fk; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_tennis_score_bookie_account_id_fk ON tennis_score USING btree (bookieaccountid);


--
-- Name: fki_tennis_score_sport_id_fk; Type: INDEX; Schema: public; Owner: ayoung
--

CREATE INDEX fki_tennis_score_sport_id_fk ON tennis_score USING btree (sportid);


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
-- Name: fb_absolute_betcase_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY fb_absolute
    ADD CONSTRAINT fb_absolute_betcase_id_fk FOREIGN KEY (betcaseid) REFERENCES betcase(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: fb_absolute_bookie_account_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY fb_absolute
    ADD CONSTRAINT fb_absolute_bookie_account_id_fk FOREIGN KEY (bookieaccountid) REFERENCES bookie_account(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: fb_absolute_sport_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY fb_absolute
    ADD CONSTRAINT fb_absolute_sport_id_fk FOREIGN KEY (sportid) REFERENCES sport(id);


--
-- Name: fb_ht_ft_result_betcase_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY fb_ht_ft_result
    ADD CONSTRAINT fb_ht_ft_result_betcase_id_fk FOREIGN KEY (betcaseid) REFERENCES betcase(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: fb_ht_ft_result_bookie_account_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY fb_ht_ft_result
    ADD CONSTRAINT fb_ht_ft_result_bookie_account_id_fk FOREIGN KEY (bookieaccountid) REFERENCES bookie_account(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: fb_ht_ft_result_sport_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY fb_ht_ft_result
    ADD CONSTRAINT fb_ht_ft_result_sport_id_fk FOREIGN KEY (sportid) REFERENCES sport(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tennis_score_betcase_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY tennis_score
    ADD CONSTRAINT tennis_score_betcase_id_fk FOREIGN KEY (betcaseid) REFERENCES betcase(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tennis_score_bookie_account_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY tennis_score
    ADD CONSTRAINT tennis_score_bookie_account_id_fk FOREIGN KEY (bookieaccountid) REFERENCES bookie_account(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tennis_score_sport_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ayoung
--

ALTER TABLE ONLY tennis_score
    ADD CONSTRAINT tennis_score_sport_id_fk FOREIGN KEY (sportid) REFERENCES sport(id) ON UPDATE CASCADE ON DELETE CASCADE;


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

