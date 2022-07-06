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
    Password TEXT,
    Type VARCHAR(255) CHECK (Type = 'Admin' OR Type = 'Cashier'),
    Status BIT
)

CREATE TABLE Item
(
    ItemID INTEGER IDENTITY PRIMARY KEY,
    ItemName VARCHAR(255),
    Unit VARCHAR(255)
)

CREATE TABLE Stock
(
    StockID INTEGER IDENTITY PRIMARY KEY,
    ItemID INTEGER,
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

ALTER TABLE Users ALTER COLUMN Password TEXT;

ALTER TABLE Item DROP COLUMN Address;


--- Selection
SELECT *
FROM Users;
SELECT *
FROM Item;
SELECT *
FROM Stock;
SELECT *
FROM Supplier;
SELECT *
FROM GRN;
SELECT *
FROM Cart;
SELECT *
FROM Sale;
SELECT *
FROM ReturnItem;

--- Stored Procidures
---- User SPs
CREATE PROCEDURE sp_GetAllUsers
AS
BEGIN
    SELECT UserID, Name, NIC, Address, UserName, Type, Status
    FROM Users
END;

EXEC sp_GetAllUsers;

CREATE PROCEDURE sp_GetByOne(
    @UserID As INTEGER)
AS
BEGIN
    SELECT UserID, Name, NIC, Address, Type
    FROM Users
    WHERE UserID = @UserID
END;

EXEC sp_GetByOne @UserID = 1;

CREATE PROCEDURE sp_CreateUser(
    @Name AS VARCHAR(255),
    @NIC AS VARCHAR(255),
    @Address AS VARCHAR(255),
    @UserName AS VARCHAR(255),
    @Password AS TEXT,
    @Type AS VARCHAR(255))
AS
BEGIN
    INSERT INTO Users
        (Name, NIC, Address, UserName, Password, Type, Status)
    VALUES(@Name, @NIC, @Address, @UserName, @Password, @Type, 'True')
END;

EXEC sp_CreateUser @Name = 'Tharindu', @NIC = '982603056V', @Address = 'Ambalantota', @UserName = 'TharinduD', @Password = '123', @Type = 'Admin';

CREATE PROCEDURE sp_EditUser(
    @UserID As INTEGER,
    @Name AS VARCHAR(255),
    @NIC AS VARCHAR(255),
    @Address AS VARCHAR(255),
    @Type AS VARCHAR(255))
AS
BEGIN
    UPDATE Users
    SET Name = @Name, NIC = @NIC, Address = @Address, Type = @Type
    WHERE UserID = @UserID
END;

EXEC sp_EditUser @UserID = 1, @Name = 'Tharindu Theekshana', @NIC = '982603056V', @Address = 'Ambalantota', @Type = 'Admin';


CREATE PROCEDURE sp_ActiveDeactiveUser(
    @UserID AS INTEGER)
AS
BEGIN
    DECLARE @AvailableStatus BIT;
    SET @AvailableStatus = (SELECT Status FROM Users WHERE UserID = @UserID);

    IF @AvailableStatus != 'True'
    BEGIN
        UPDATE Users SET Status = 'True' WHERE UserID = @UserID
    END
    ELSE
    BEGIN
        UPDATE Users SET Status = 'False' WHERE UserID = @UserID
    END
END;

EXEC sp_ActiveDeactiveUser @UserID = 1;

CREATE PROCEDURE sp_CheckPassword(
    @UserName AS VARCHAR(255),
    @Password AS VARCHAR(255))
AS
BEGIN
    SELECT * FROM Users WHERE UserName LIKE @UserName AND Password LIKE @Password
END;

EXEC sp_CheckPassword @UserName = 'TharinduD', @Password = '125';

CREATE PROCEDURE sp_ChangePassword(
    @UserID AS INTEGER,
    @Password AS VARCHAR(255))
AS
BEGIN
    UPDATE Users SET Password = @Password WHERE UserID = @UserID
END;

EXEC sp_ChangePassword @UserID = 1, @Password = '125';

CREATE PROCEDURE sp_Login(
    @UserName AS VARCHAR(255),
    @Password AS VARCHAR(255))
AS
BEGIN
    SELECT UserID, UserName, Type
    FROM Users
    WHERE UserName LIKE @UserName AND Password LIKE @Password
END;

EXEC sp_Login @UserName = 'TharinduD', @Password = '125';

CREATE PROCEDURE sp_ResetPassword(
    @UserID AS INTEGER,
    @Password AS VARCHAR(255))
AS
BEGIN
    UPDATE Users SET Password = @Password WHERE UserID = @UserID
END;

EXEC sp_ResetPassword @UserID = 1, @Password = '125';

CREATE PROCEDURE sp_GetSearchUsers(
    @Search AS VARCHAR(255))
AS
BEGIN
    SELECT UserID, Name, NIC, Address, UserName, Type, Status
    FROM Users
    WHERE Name LIKE @Search OR NIC LIKE @Search OR Address LIKE @Search OR Type LIKE @Search
END;

EXEC sp_GetSearchUsers @Search = '%Ma%';

---- Items SPs

CREATE PROCEDURE sp_GetAllItems
AS
BEGIN
    SELECT ItemID, ItemName, Unit
    FROM Item
END;

EXEC sp_GetAllItems;

CREATE PROCEDURE sp_GetItemOnce(
    @ItemID AS INTEGER
)
AS
BEGIN
    SELECT ItemID, ItemName, Unit
    FROM Item
    WHERE ItemID = @ItemID
END;

EXEC sp_GetItemOnce @ItemID = 1;

CREATE PROCEDURE sp_GetSearchItems(
    @Search AS VARCHAR(255))
AS
BEGIN
    SELECT ItemID, ItemName, Unit
    FROM Item
    WHERE ItemName LIKE @Search
END;

EXEC sp_GetSearchItems @Search = '%Ro%';

CREATE PROCEDURE sp_CreateItem(
    @ItemName AS VARCHAR(255),
    @Unit AS VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Item(ItemName, Unit)
    VALUES(@ItemName, @Unit)
END;

EXEC sp_CreateItem @ItemName = 'Rocell Water Closet - URBAN D', @Unit = "NOS";

CREATE PROCEDURE sp_UpdateItems(
    @ItemID AS INTEGER,
    @ItemName AS VARCHAR(255),
    @Unit AS VARCHAR(255))
AS
BEGIN
    UPDATE Item SET ItemName = @ItemName, Unit = @Unit  WHERE ItemID = @ItemID
END;

EXEC sp_UpdateItems @ItemID = 1, @ItemName = 'Rocell Water Closet - Urban D', @Unit = 'NOS';

---- Stocks SPs

CREATE PROCEDURE sp_GetAllStocks
AS
BEGIN
    SELECT s.StockID, s.ItemID, i.ItemName, i.Unit, s.Qty, s.Price
    FROM Stock s, Item i
    WHERE s.ItemID = i.ItemID
END;

EXEC sp_GetAllStocks;

CREATE PROCEDURE sp_GetStockOnce(
    @StockID AS INTEGER
)
AS
BEGIN
    SELECT s.StockID, s.ItemID, i.ItemName, i.Unit, s.Qty, s.Price
    FROM Stock s, Item i
    WHERE s.ItemID = i.ItemID AND s.StockID = @StockID
END;

EXEC sp_GetStockOnce @StockID = 1;

CREATE PROCEDURE sp_GetSearchStocks(
    @Search AS VARCHAR(255))
AS
BEGIN
    SELECT s.StockID, s.ItemID, i.ItemName, i.Unit, s.Qty, s.Price
    FROM Stock s, Item i
    WHERE i.ItemID = s.ItemID AND (i.ItemName LIKE @Search OR i.Unit LIKE @Search OR s.Qty LIKE @Search OR s.Price LIKE @Search)
END;

EXEC sp_GetSearchStocks @Search = '%Ro%';

CREATE PROCEDURE sp_CreateStock(
    @ItemID AS VARCHAR(255),
    @Qty AS DECIMAL(8,2),
    @Price AS DECIMAL(8,2)
)
AS
BEGIN
    INSERT INTO Stock(ItemID, Qty, Price)
    VALUES(@ItemID, @Qty, @Price)
END;

EXEC sp_CreateStock @ItemID = 1, @Qty = 1, @Price = 54000.00;

CREATE PROCEDURE sp_UpdateStocks(
    @StockID AS INTEGER,
    @ItemID AS VARCHAR(255),
    @Qty AS DECIMAL(8,2),
    @Price AS DECIMAL(8,2))
AS
BEGIN
    UPDATE Stock 
    SET ItemID = @ItemID, Qty = @Qty, Price = @Price
    WHERE StockID = @StockID
END;

EXEC sp_UpdateStocks @StockID = 1, @ItemID = 1, @Qty = 2, @Price = 54000.00;