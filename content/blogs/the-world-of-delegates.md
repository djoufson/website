---
title: "The World of Delegates in C#"
date: "2023-10-22"
excerpt: "If you are not aware of delegates, I bet you use them without even knowing. Delegates are a must-know topic in our industry, and play a critical role in our everyday .NET applications. In this article, we will dive really deep into this topic, from the very basics to an acceptable level."
author: "Djoufson Che"
tags: ["C#", ".NET"]
banner: "/assets/the-world-of-delegates.webp"
---

# The World of Delegates in C\#

If you are not aware of delegates, I bet you use them without even knowing. Delegates are a must-know topic in our industry, and play a critical role in our everyday .NET applications. In this article, we will dive really deep into this topic, from the very basics to an acceptable level.

Let's get started.

## What are delegates

### Definition

First of all, we must at least know what we are talking about. Since the early days of programming, there were variables already, defined as a way to store values in our program, either `int`, `float`, `double` etc. We easily understand that variables help us to use a value we previously stored, avoiding us to remember it by ourselves.

In addition, we can pass them to methods arguments, or return them from methods as well. This is the way we build robust reusable pieces of software. What if I tell you that, we can not just store values inside variables, but also **METHODS** 🙀!! Isn't it awesome? That is basically what delegates are.

According to the Microsoft official documentation available [here](https://learn.microsoft.com/en-us/dotnet/cs/programming-guide/delegates/),

> A delegate is a type that represents references to methods with a particular parameter list and return type.

### What are they for?

As mentioned above, delegates are a way to reference a method or a group of methods, to subsequently call them without having to remember which reference the delegate exactly holds, or pass them to other methods arguments that will call the attached methods, or even return them from another methods.

This allows us to apply an Inversion Of Control, enabling lower defined methods invoke higher defined methods. You may think: "🤔 What the heck is he talking about? I never met a need of such a thing"… Well you are wrong 😄. Take a look at the sample below:

```cs
using System.Linq;
var adults = persons.Where(p => p.Age > 18);
```

Aren't you familiar with this kind of syntax? Let me tell you that you could write it this way as well

```cs
using System.Linq;
var adults = persons.Where(CheckAgeRequirement);

bool CheckAgeRequirement(Person p)
{
    return p.Age > 18;
}
```

And it will work fine. Let's see in details how it works

## How it works?

To understand how to use delegates, we must understand how to write them first. In C#

### Declare a delegate

Since a delegate holds a reference to a method, it can not reference every method, we must properly define which signature is allowed. The syntax is as follows

```cs
public delegate void DoDelegate(string something);
```

Notice that a delegate can be declared at namespace scope, class scope and method scope. They are marked with the `delegate` keyword, followed by the return type of the method it is supposed to reference. After the name of the delegate, we add some parenthesis with the listed arguments, same as it would have been done for a regular method.

For our specific example, to this `DoDelegate` we will only be able to assign methods with the following signature:

```cs
void MethodName(string s);
```

### Use a delegate

We will now use the delegate we just created above, by creating a Do method with the appropriate parameters.

```cs
private static void Do(string something)
{
    Console.WriteLine($"Doing {something}");
}
```

Inside the Main method, we write the code below to assign the Do method to an instance of our DoDelegate.

```cs
namespace Demo;

public delegate void DoDelegate(string something);

public class Program
{
    private static void Main()
    {
        var doDel = new DoDelegate(Do);
    }

    private static void Do(string something)
    {
        Console.WriteLine($"Doing {something}");
    }
}
```

The delegate instance is now associated to the method, but how to call the referenced method then? Well, there are two ways, the oldest one being to call the `Invoke()` method on the delegate instance and passing in the appropriate arguments, and the second one being just with parenthesis, and it is what we will do:

```cs
doDel("homeworks"); // because this delegate accepts a single string to be passed as argument
```

**Output:** `Doing homeworks`

There is something cool about delegates, is that you can concatenate them… Literally 😅. Let's see if we take the previous example, we can turn it to something like this

```cs
namespace Demo;

public delegate void DoDelegate(string something);

internal class Program
{
    private static void Main()
    {
        var doDel = new DoDelegate(Do);
        var cookDel = new DoDelegate(Cook);
        DoDelegate del = doDel + cookDel;
        del("homeworks");
    }

    private static void Do(string something)
    {
        Console.WriteLine($"Doing {something}");
    }

    private static void Cook(string something)
    {
        Console.WriteLine($"Cooking {something}");
    }
}
```

**Output:**

```txt
Doing homeworks
Cooking homeworks
```

And it works !! But unfortunately it doesn't make sense anymore to "cook homeworks" 😂.

Anyway, I don't know for you, but I think we are still far from the nice Linq syntax of the Where method 🙁. Actually, this delegate syntax is the first one Microsoft released, and it is non-convenient enough for the modern developers we are, even though they are a lot still using this syntax.

Microsoft then thought of an easier way to perform the same behaviour, and that is `Action<T>`, `Func<T,TResult>` and `Predicate<T>`. All of them are an easier way to declare delegates, and they are pretty simple to memorize.

### Action\<T>

This is the easiest one, and it just represents a delegate that takes a `T` type parameter and returns nothing. An `Action<string> Del` could then be translated to a `delegate void Del(string s)`.

How to deal then with multiple parameters? Well, there are 17 Action delegate: `Action<T>`, `Action<T1,T2>`, `Action<T1,T2,T3>` etc. Microsoft and I think you won't have a method of more than 17 parameters 😅.

### Func<T,TResult>

This one is the same as the previous, except by the fact that the last `TResult` generic type argument is meant to match the return type of the method we will assign to the delegate.

For example the `Func<string,bool> Del` is the same as `delegate bool Del(string s)`.

Same as the previous example, there are 17 Func delegates as well

### Predicate\<T>

There comes the easiest one, the `Predicate`. This one is used to reference methods that have lot of parameters and returns a bool.

The following terms are equal:

- `Predicate<string> Del`
- `Func<string,bool> Del`
- `delegate bool Del(string s)`

Isn't it awesome 🤩?

## A `Where` method clone

Consider we want to build a filtering api over `IEnumerable<T>` type, that enables the user to filter the collection based on a certain criteria.

First we need to create an extension method that will be applied on every `IEnumerable<T>` implementation. To achieve that, we will create a `ListExtensions` static class in a separate file, and we fill it with the following content:

```cs
namespace Demo;

public static class ListExtensions
{
    public static IEnumerable<T> Filter<T>(
        this IEnumerable<T> collection,
        Predicate<T> predicate)
    {
        foreach (var element in collection)
            if(predicate(element))
                yield return element;
    }
}
```

It is an extension method, that takes as arguments a `Predicate<T>`, do you remember? A reference to a method that takes a `T` argument and returns bool.

We are sure then that if we invoke this predicate on each element in our collection, it will return a bool, according to if the specified element satisfied a certain condition or not.

Simple, right? 😄

Let's try it in our `Main` method.

```cs
namespace Demo;

internal class Program
{
    private static void Main(string[] args)
    {
        var persons = new[]
        {
            new Person{ Name = "John", Age = 20 },
            new Person{ Name = "Doe", Age = 17 },
            new Person{ Name = "Andrew", Age = 23 },
            new Person{ Name = "Jane", Age = 31 },
            new Person{ Name = "Smith", Age = 15 },
        };

        var adults = persons.Filter(p => p.Age > 18);

        foreach (var adult in adults)
            Console.WriteLine($"{adult.Name}: {adult.Age}");
    }
}

internal class Person
{
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }
}
```

And as expected, the output is

```txt
John: 20
Andrew: 23
Jane: 31
```

Since they are the three ones with age greater than 18 ✅

That is the world of delegates ‼️

## About Me

I am Djoufson CHE, a passionate Cameroonian .NET developer and Open Source enthusiast. I recently joined the [.NET Foundation](https://dotnetfoundation.org) community, and as a member, it is a privilege for me to act for the growth of this one, and to share my little but non-less expertise in those topics.

Follow me on:

- **GitHub:** [Djoufson](https://github.com/Djoufson)
- **Twitter:** [@djouf_legran](https://twitter.com/djouf_legran)
- **LinkedIn:** [djoufson](https://linkedin.com/in/djoufson)
