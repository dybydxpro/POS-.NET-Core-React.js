--- Create and Use Database

CREATE DATABASE POSSystem

USE POSSystem

DROP DATABASE POSSystem


--- Create Tables

CREATE TABLE Users
(
    UserID INTEGER IDENTITY PRIMARY KEY,
    Name VARCHAR(225),
    NIC VARCHAR(225) UNIQUE,
    Address VARCHAR(255),
    UserName VARCHAR(255) UNIQUE,
    Password VARCHAR(255),
    Type VARCHAR(255) CHECK (Type = 'Admin' OR Type = 'Cashier'),
    Status BIT
)

CREATE TABLE Item
(
    ItemID INTEGER IDENTITY PRIMARY KEY,
    ItemName VARCHAR(255),
    Unit VARCHAR(255),
    Address VARCHAR(255)
)

CREATE TABLE Stock
(
    StockID INTEGER IDENTITY PRIMARY KEY,
    ItemID integer,
    Qty DECIMAL(8,2),
    Price DECIMAL(8,2),
    FOREIGN KEY(ItemID) REFERENCES Item(ItemID)
)

CREATE TABLE Supplier
(
    SupplierID INTEGER IDENTITY PRIMARY KEY,
    SupplierName VARCHAR(255),
    Address VARCHAR(255),
    ConatctNumber VARCHAR(255)
)

CREATE TABLE GRN
(
    GRNID INTEGER IDENTITY PRIMARY KEY,
    GRNDate DATETIME,
    InvoiceNo VARCHAR(255),
    InvoiceDate DATETIME,
    SupplierID INTEGER,
    ItemID INTEGER,
    StockID INTEGER,
    GRNQty INTEGER,
    PayType VARCHAR(255),
    BulckPrice DECIMAL(8,2),
    ActualBulkPrice DECIMAL(8,2),
    GRNRecorderID INTEGER,
    DueDate DATETIME,
    Remarks TEXT,
    FOREIGN KEY(SupplierID) REFERENCES Supplier(SupplierID),
    FOREIGN KEY(ItemID) REFERENCES Item(ItemID),
    FOREIGN KEY(StockID) REFERENCES Stock(StockID)
)

CREATE TABLE Cart
(
    CartID INTEGER IDENTITY PRIMARY KEY,
    ItemID INTEGER,
    StockID INTEGER,
    CartQty DECIMAL(8,2),
    Price DECIMAL(8,2),
    SellerID INTEGER,
    FOREIGN KEY(ItemID) REFERENCES Item(ItemID),
    FOREIGN KEY(StockID) REFERENCES Stock(StockID)
)

CREATE TABLE Sale
(
    SaleID INTEGER IDENTITY PRIMARY KEY,
    ItemID INTEGER,
    StockID INTEGER,
    SoldQty DECIMAL(8,2),
    SoldPrice DECIMAL(8,2),
    SellerID INTEGER,
    Timescape DATETIME,
    FOREIGN KEY(ItemID) REFERENCES Item(ItemID),
    FOREIGN KEY(StockID) REFERENCES Stock(StockID)
)

CREATE TABLE ReturnItem
(
    ReturnID INTEGER IDENTITY PRIMARY KEY,
    ItemID INTEGER,
    StockID INTEGER,
    Qty DECIMAL(8,2),
    Price DECIMAL(8,2),
    SellerID INTEGER,
    FOREIGN KEY(ItemID) REFERENCES Item(ItemID),
    FOREIGN KEY(StockID) REFERENCES Stock(StockID)
)

--- Drop Table

DROP TABLE Users
DROP TABLE Item
DROP TABLE Stock
DROP TABLE Supplier
DROP TABLE GRN
DROP TABLE Cart
DROP TABLE Sale
DROP TABLE ReturnItem


--- Update Tables

ALTER TABLE Users ADD CONSTRAINTS UQ_NIC UNIQUE(NIC);


--- Selection
SELECT *
FROM Users
SELECT *
FROM Item
SELECT *
FROM Stock
SELECT *
FROM Supplier
SELECT *
FROM GRN
SELECT *
FROM Cart
SELECT *
FROM Sale
SELECT *
FROM ReturnItem

--- Stored Procidures

CREATE PROCEDURE sp_GetAllUsers
AS
BEGIN
    SELECT UserID, Name, NIC, Address, UserName, Type, Status
    FROM Users
END;

EXEC sp_GetAllUsers;

CREATE PROCEDURE sp_CreateUser(@Name AS VARCHAR(255), @NIC AS VARCHAR(255), @Address AS VARCHAR(255), @UserName AS VARCHAR(255), @Password AS VARCHAR(255), @Type AS VARCHAR(255))
AS
BEGIN
    INSERT INTO Users(Name, NIC, Address, UserName, Password, Type, Status) VALUES(@Name, @NIC, @Address, @UserName, @Password, @Type, 'True') 
END;

EXEC sp_CreateUser @Name = 'Tharindu', @NIC = '982603056V', @Address = 'Ambalantota', @UserName = 'TharinduD', @Password = '123', @Type = 'Admin';