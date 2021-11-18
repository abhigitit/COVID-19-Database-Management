DROP DATABASE IF EXISTS project_v;
CREATE DATABASE project_v;
USE project_v;

CREATE TABLE Manufacturer (
    m_name VARCHAR(15),
    PRIMARY KEY (m_name)
);

CREATE TABLE Sponsor (
    s_name VARCHAR(15),
    s_item VARCHAR(20) NOT NULL,
    PRIMARY KEY (s_name)
);

CREATE TABLE Person (
    p_id VARCHAR(30),
    password VARCHAR(200) NOT NULL,
    p_firstname VARCHAR(20) NOT NULL,
    p_lastname VARCHAR(20),
    dob DATE NOT NULL,
    p_address VARCHAR(50) NOT NULL,
    is_vaccinated BOOL NOT NULL default 0,
    sponsor_name VARCHAR(15),
    PRIMARY KEY (p_id),
    FOREIGN KEY (sponsor_name)
        REFERENCES Sponsor (s_name)
        on delete SET NULL
);

CREATE TABLE P_Phones (
    p_id VARCHAR(30),
    p_phno VARCHAR(15),
    PRIMARY KEY (p_id , p_phno),
    FOREIGN KEY (p_id)
        REFERENCES Person (p_id)
        on delete cascade
);

CREATE TABLE EmergencyContact (
    p_id VARCHAR(30),
    econtact_id VARCHAR(30),
    econtact_name VARCHAR(20),
    PRIMARY KEY (p_id , econtact_id),
    FOREIGN KEY (p_id)
        REFERENCES Person (p_id)
        on delete cascade
);

CREATE TABLE Vaccine (
    v_name VARCHAR(15),
    no_of_doses ENUM('1', '2'),
    dosageGap INT,
    m_name VARCHAR(15),
    PRIMARY KEY (v_name),
    FOREIGN KEY (m_name)
        REFERENCES Manufacturer (m_name)
        on delete cascade
);

CREATE TABLE VaccinationCenter (
    vc_name VARCHAR(15),
    vc_address VARCHAR(30),
    vc_phno VARCHAR(15),
    PRIMARY KEY (vc_name)
);

CREATE TABLE Contains (
	v_name VARCHAR(15),
    vc_name VARCHAR(15),
    stockAvailable INT,
    PRIMARY KEY (v_name, vc_name),
    FOREIGN KEY (v_name)
		REFERENCES Vaccine (v_name)
        on delete cascade,
	FOREIGN KEY (vc_name)
		REFERENCES VaccinationCenter(vc_name)
        on delete cascade
);

CREATE TABLE Supplies (
    vc_name VARCHAR(15),
    m_name VARCHAR(15),
    quantity INT,
    PRIMARY KEY (vc_name , m_name),
    FOREIGN KEY (vc_name)
        REFERENCES VaccinationCenter (vc_name)
        on delete cascade,
    FOREIGN KEY (m_name)
        REFERENCES Manufacturer (m_name)
        on delete cascade
);

CREATE TABLE Vaccinator (
    e_id VARCHAR(30),
    e_name VARCHAR(20),
    e_password VARCHAR(200) NOT NULL,
    vc_name VARCHAR(15),
    PRIMARY KEY (e_id),
    FOREIGN KEY (vc_name)
        REFERENCES VaccinationCenter (vc_name)
        on delete SET NULL
);

CREATE TABLE Slot (
    slot_id VARCHAR(100),
    slot_date DATE,
    slot_time TIME,
    isAuthorized BOOL DEFAULT 0,
    isDeclined BOOL DEFAULT 0,
    e_id VARCHAR(30),
    vc_name VARCHAR(15),
    v_name VARCHAR(15),
    p_id VARCHAR(30),
    PRIMARY KEY (slot_id),
    FOREIGN KEY (e_id)
        REFERENCES Vaccinator (e_id)
        on delete set null,
    FOREIGN KEY (vc_name)
        REFERENCES VaccinationCenter (vc_name)
        on delete cascade,
    FOREIGN KEY (v_name)
        REFERENCES Vaccine (v_name)
        on delete cascade,
	FOREIGN KEY (p_id)
		REFERENCES Person (p_id)
        on delete cascade
);


INSERT INTO Sponsor VALUES ("Target", "15$ gift card");
INSERT INTO Sponsor VALUES ("Starbucks", "10$ coupon code");


INSERT INTO Manufacturer VALUES ("Pfizer-BioNTech");
INSERT INTO Manufacturer VALUES ("Moderna");
INSERT INTO Manufacturer VALUES ("Janssen");



INSERT INTO Vaccine VALUES ("Pfizer", 2, 28, "Pfizer-BioNTech");
INSERT INTO Vaccine VALUES ("Moderna", 2, 28, "Moderna");
INSERT INTO Vaccine VALUES ("J&J", 2, NULL, "Janssen");


INSERT INTO VaccinationCenter VALUES ("San Jose", "CA, 95113", "1111111111");
INSERT INTO VaccinationCenter VALUES ("Sunnyvale", "CA, 95112", "2222222222");
INSERT INTO VaccinationCenter VALUES ("Santa Clara", "CA, 95500", "3333333333");


INSERT INTO Contains VALUES ("Pfizer", "San Jose", 100);
INSERT INTO Contains VALUES ("Moderna", "San Jose", 75);
INSERT INTO Contains VALUES ("J&J", "San Jose", 0);
INSERT INTO Contains VALUES ("Pfizer", "Sunnyvale", 80);
INSERT INTO Contains VALUES ("Moderna", "Sunnyvale", 10);
INSERT INTO Contains VALUES ("Pfizer", "Santa Clara", 120);


INSERT INTO Supplies VALUES ("San Jose", "Pfizer-BioNTech", 200);
INSERT INTO Supplies VALUES ("San Jose", "Moderna", 150);
INSERT INTO Supplies VALUES ("San Jose", "Janssen", 120);
INSERT INTO Supplies VALUES ("Santa Clara", "Moderna", 150);
INSERT INTO Supplies VALUES ("Santa Clara", "Janssen", 80);
INSERT INTO Supplies VALUES ("Sunnyvale", "Janssen", 120);



