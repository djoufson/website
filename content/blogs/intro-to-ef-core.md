---
title: "Intro to Entity Framework Core in .NET 6"
date: "2023-07-18"
excerpt: "Entity framework is a .NET tool to interact with various kind of databases, providing the same api for each of these database providers. In this blog post, you will see how to set un Entity Framework and build your first CRUD operation over a Sqlite database"
author: "Djoufson Che"
tags: ["C#", ".NET", "Ef core"]
banner: "/assets/intro-to-ef-core.webp"
---

# Intro to Entity Framework Core in .NET 6

Entity framework is a .NET tool to interact with various kind of databases, providing the same api for each of these database providers. In this blog post, you will see how to set un Entity Framework and build your first CRUD operation over a Sqlite database

## Requirements

For this tutorial I’ll be using Vs Code as my code editor, and all the stuff will be made through CLI. You can use your favorite Code editor, and your favorite CLI tool (Powershell, CMD, cmdr …)

### Install .NET

Since this is a demo of efcore using .NET 6, you first need to download and install the .NET 6 SDK. Make sure you install the one compatible with your processor architecture.

### Install efcore cli tool

To install the CLI tool of Entity framework, you need to run the following commands

```bash
dotnet tool install --global dotnet-ef
dotnet tool update --global dotnet-ef
```

After those two commands, you can run the next one to confirm that everything was installed successfully:

```bash
dotnet ef
```

![Test if the dotnet ef tool is successfully installed](/assets/test-ef-core-installation.webp)

## Project setup

Once the required tools are installed, we can go ahead and create our C# project.

To follow along with me, you should run the exact commands shown below. I will obviously explain why I run a specific command, and what is it for.

### Create a Console project

```bash
dotnet new console -o "Ef-Intro"
cd Ef-Intro
```

Those two commands are to create a blank .NET Console application. Open the `Ef-Intro` created folder in your code editor.

To run the project, type:

```bash
dotnet run
```

`Output`

```txt
Hello, World!
```

### Install Entity Framework Packages

Type the following commands in the root directory of your project:

```bash
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 7.0.5
dotnet add package Microsoft.EntityFrameworkCore.Design --version 7.0.5
dotnet add package Microsoft.EntityFrameworkCore --version 7.0.5
dotnet add package Microsoft.EntityFrameworkCore.Sqlite.Core --version 7.0.5
```

After that, your Ef-Intro.csproj file should look like:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
    <RootNamespace>Ef_Intro</RootNamespace>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="7.0.5" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="7.0.5">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
    <PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="7.0.5" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="7.0.5">
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
      <PrivateAssets>all</PrivateAssets>
    </PackageReference>
  </ItemGroup>

</Project>
```

Those are the required packages you have to install in order to properly work with Ef Core

## Create the entities

The application we are going to build is a simple stock application, that manage to stores the products list and prices in a database.To do so, we will need a single Product entity.

The entity will be the model used to materialize the results coming from our database

In the root project directory, create a folder called Entities and place there the Product.cs class as follows:

```md
Entities/
|  |__ Product.cs
|
| Program.cs
```

The content of this class should look like:

```cs
namespace Ef_Intro.Entities;
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}
```

## Connect to the database

### Create the DbContext

The DbContext is a class that allows us to have database access over the existing tables, and this class is in charge of tracking modifications on the database and sync those ones.

I a folder called Data, create a ew file AppDbContext.cs.

```md
Data/
|  |__ AppDbContext.cs
|
Entities/
|  |__ Product.cs
|
| Program.cs
```

and fill it with the following content

```cs
using Ef_Intro.Entities;
using Microsoft.EntityFrameworkCore;

namespace Ef_Intro.Data;

public class AppDbContext : DbContext
{
    public DbSet<Product> Products { get; set; } = null!;
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=app.db");
    }
}
```

Here we initialize our DbContext to have a single DbSet mapped to the `Product` class, and the resulting Sqlite database will be stored in the `app.db` file.

### Create and Run the migrations

A migration is a way to design the database scheme, and keep track of the updates we made over our database scheme and design. It has indications about how the database should look like, which tables has which columns.

**To create a migration, we run the command**

```bash
dotnet ef migrations add "Initial Create"
```

Where "Initial Create" is just the given name of our migration.

**To run our migration, we run the command**

```bash
dotnet ef database update
```

Once those two commands completed, you should be able to see the app.db file created in your root project directory, and if you open this file in your favorite Sqlite db explorer, you should see:

![Database schema](/assets/database-schema.webp)

This means that our Database has been updated successfully, according to the Migration specifications.

We can finally test it.

## Test over the database

Now that we have a running database, we can go in our Program.cs file, and write some code to create and read our Products. I've prepared a simple code to add some products to the database and read them next.

The `Program.cs` file should look like:

```cs
using Ef_Intro.Data;
using Ef_Intro.Entities;

// We instantiate our db context
using var dbContext = new AppDbContext();

// We add some products if the database is empty
bool isEmpty = dbContext.Products.Any();
if (!isEmpty)
{
    dbContext.Products.AddRange(
        new Product { Name = "Laptop", Price = 1000 },
        new Product { Name = "Mouse", Price = 50 },
        new Product { Name = "Keyboard", Price = 100 }
    );

    dbContext.SaveChanges();
}

// We check the content of our database
var products = dbContext.Products.ToArray();

Array.ForEach(products, p =>
{
    Console.WriteLine("Id: " + p.Id);
    Console.WriteLine("Name: " + p.Name);
    Console.WriteLine("Pice: " + p.Price);
    Console.WriteLine("===============================");
});
```

And by running the command

```bash
dotnet run
```

The output should be

![dotnet run output](/assets/dotnet-run-output.webp)

## Next steps

- Dependency Injection
- Model builder configurations
